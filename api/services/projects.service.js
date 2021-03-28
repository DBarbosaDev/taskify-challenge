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

module.exports = {
    addProject,
    getProjects,
    updateProject,
    deleteProject
};
