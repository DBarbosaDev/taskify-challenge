const mongoose = require('mongoose');

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
        { type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }
    ],
    updateDate: Date,
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, { collection: 'projects' });

const ProjectModel = mongoose.model('ProjectModel', ProjectModelSchema);

const getUserProjects = (userId) => {
    // TODO Populate refTasks only on tasks definition.
    /* return ProjectModel.find({ refUser: mongoose.Types.ObjectId(userId) })
        .populate('refTasks')
        .exec(); */

    return ProjectModel.find({ refUser: mongoose.Types.ObjectId(userId) }).exec();
};

const addProject = (userId, dataObject) => ProjectModel.create({ ...dataObject, refUser: mongoose.Types.ObjectId(userId) });

const updateProject = (userId, projectId, dataObject) => {
    return ProjectModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(projectId), refUser: mongoose.Types.ObjectId(userId) },
        { ...dataObject, updateDate: Date.now() }
    ).exec();
};

const deleteProject = (userId, projectId) => {
    return ProjectModel.findOneAndDelete(
        { _id: mongoose.Types.ObjectId(projectId), refUser: mongoose.Types.ObjectId(userId) }
    ).exec();
};

module.exports = {
    getUserProjects,
    addProject,
    updateProject,
    deleteProject
};
