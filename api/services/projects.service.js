const ProjectModel = require('../models/projects.model');

const getProjectElementsFiltered = (project) => ({
    _id: project._id,
    name: project.name,
    refTasks: project.refTasks
});

const addProject = async (userId, details) => {
    const { name } = details;

    const createdProject = await ProjectModel.addProject(userId, { name });

    return getProjectElementsFiltered(createdProject);
};

const getProjects = async (userId) => {
    const projectsList = await ProjectModel.getUserProjects(userId);

    return projectsList.map((project) => getProjectElementsFiltered(project));
};

module.exports = {
    addProject,
    getProjects
};
