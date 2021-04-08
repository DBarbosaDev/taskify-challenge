const { ERROR_CODES_CONSTANTS } = require('../../framework');
const ProjectModel = require('../models/projects.model');

const getProjectElementsFiltered = (project) => ({
    _id: project._id,
    name: project.name,
    refTasks: project.refTasks
});

const addProject = async (userId, dataObject) => {
    const { name } = dataObject;

    const createdProject = await ProjectModel.addProject(userId, { name });

    return getProjectElementsFiltered(createdProject);
};

const getProjects = async (userId) => {
    const projectsList = await ProjectModel.getUserProjects(userId);

    return projectsList.map((project) => getProjectElementsFiltered(project));
};

const updateProject = async (userId, projectId, dataObject) => {
    const { name } = dataObject;

    const createdProject = await ProjectModel.updateProject(userId, projectId, { name });

    return !!createdProject;
};

const deleteProject = async (userId, projectId) => {
    const deletedProject = await ProjectModel.deleteProject(userId, projectId);

    return !!deletedProject;
};

const getProjectTasks = async (userId, projectId) => {
    const project = await ProjectModel.getUserProject(userId, projectId);

    return project;
};

const addProjectTask = async (userId, projectId, dataObject) => {
    const { description } = dataObject;

    const createdProject = await ProjectModel.addProjectTask(userId, projectId, { description });

    return !!createdProject;
};

const deleteProjectTask = async (userId, projectId, taskId) => {
    const project = await ProjectModel.deleteProjectTask(userId, projectId, taskId);

    if (!project) {
        return false;
    }

    const deletedTask = await ProjectModel.deleteTask(taskId);

    if (!deletedTask) {
        throw new Error(ERROR_CODES_CONSTANTS.TASK_NOT_FOUND);
    }

    return true;
};

const updateProjectTask = async (userId, projectId, taskId, dataObject) => {
    const { description, isFinished } = dataObject;
    const project = await ProjectModel.getUserProject(userId, projectId);

    if (!project) {
        return false;
    }

    const updatedTask = await ProjectModel.updateTask(taskId, { description, isFinished: !!isFinished });

    if (!updatedTask) {
        throw new Error(ERROR_CODES_CONSTANTS.TASK_NOT_FOUND);
    }

    return true;
};

module.exports = {
    addProject,
    getProjects,
    updateProject,
    deleteProject,

    getProjectTasks,
    addProjectTask,
    deleteProjectTask,
    updateProjectTask
};
