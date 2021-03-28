const { expressResponsesKit } = require('../../framework');

const { projectsService } = require('../services');

const addProject = async (req, res) => {
    const userId = res.locals.userId;

    try {
        const project = await projectsService.addProject(userId, req.body);

        return expressResponsesKit.sendSuccess(res, project);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

const getProjects = async (req, res) => {
    const userId = res.locals.userId;

    try {
        const projects = await projectsService.getProjects(userId);

        return expressResponsesKit.sendSuccess(res, projects);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

module.exports = {
    addProject,
    getProjects
};
