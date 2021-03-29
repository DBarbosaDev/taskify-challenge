const mongoose = require('mongoose');

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
    const createdTask = (await TasksModel.create(dataObject)) || {};

    return updateProject(userId, projectId, undefined, createdTask._id);
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
    return TasksModel.findByIdAndUpdate(
        taskId,
        {
            description: dataObject.description,
            finishDate: dataObject.isFinished ? Date.now() : undefined
        }
    ).exec();
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
