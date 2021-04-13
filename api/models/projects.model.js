const mongoose = require('mongoose');
const helpers = require('../helpers');

const TasksModelSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    finishDate: Date
}, { collection: 'tasks' });

const ProjectModelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    refUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    refTasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'TasksModel' }
    ],
    updateDate: Date,
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { collection: 'projects' });

const ProjectModel = mongoose.model('ProjectModel', ProjectModelSchema);
const TasksModel = mongoose.model('TasksModel', TasksModelSchema);

const getUserProject = (userId, projectId) => {
    return ProjectModel
        .findOne({ _id: mongoose.Types.ObjectId(projectId), refUser: mongoose.Types.ObjectId(userId) })
        .populate('refTasks')
        .exec();
};

const getUserProjects = (userId) => {
    return ProjectModel.find({ refUser: mongoose.Types.ObjectId(userId) })
        .populate('refTasks')
        .exec();
};

const addProject = (userId, dataObject) => ProjectModel.create({ ...dataObject, refUser: mongoose.Types.ObjectId(userId) });

const updateProject = (userId, projectId, dataObject = {}, taskIdToIncrement) => {
    const incrementationQuery = taskIdToIncrement ? {
        $addToSet: {
            refTasks: mongoose.Types.ObjectId(taskIdToIncrement)
        }
    } : {};

    return ProjectModel.findOneAndUpdate(
        {
            _id: mongoose.Types.ObjectId(projectId),
            refUser: mongoose.Types.ObjectId(userId)
        },
        {
            ...dataObject,
            ...incrementationQuery,
            updateDate: Date.now()
        }
    ).exec();
};

const deleteProject = (userId, projectId) => {
    return ProjectModel.findOneAndDelete(
        { _id: mongoose.Types.ObjectId(projectId), refUser: mongoose.Types.ObjectId(userId) }
    ).exec();
};

const addProjectTask = async (userId, projectId, dataObject = {}) => {
    const session = await TasksModel.startSession();
    session.startTransaction();

    const createdTask = await TasksModel.create([dataObject], { session });

    if (await updateProject(userId, projectId, undefined, createdTask[0]._id)) {
        await session.commitTransaction();

        return createdTask[0];
    }

    await session.abortTransaction();
    await session.endSession();

    return null;
};

const deleteProjectTask = (userId, projectId, taskId) => {
    return ProjectModel.findOneAndUpdate(
        {
            _id: mongoose.Types.ObjectId(projectId),
            refUser: mongoose.Types.ObjectId(userId)
        },
        {
            $pull: {
                refTasks: mongoose.Types.ObjectId(taskId)
            }
        }
    ).exec();
};

const deleteTask = (taskId) => {
    return TasksModel.findByIdAndRemove(mongoose.Types.ObjectId(taskId)).exec();
};

const updateTask = (taskId, dataObject) => {
    const data = {
        ...dataObject,
        finishDate: dataObject.isFinished ? Date.now() : null
    };

    helpers.removeUndefinedFields(data);

    return TasksModel.findByIdAndUpdate(taskId, data).exec();
};

module.exports = {
    getUserProject,
    getUserProjects,
    addProject,
    updateProject,
    deleteProject,

    addProjectTask,
    deleteProjectTask,
    deleteTask,
    updateTask
};
