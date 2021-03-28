const { expressResponsesKit, ERROR_CODES_CONSTANTS } = require('../../framework');

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

const updateProject = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    try {
        const isProjectUpdated = await projectsService.updateProject(userId, projectId, req.body);

        if (!isProjectUpdated) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccessWithoutContent(res);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

const deleteProject = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    try {
        const isProjectDeleted = await projectsService.deleteProject(userId, projectId);

        if (!isProjectDeleted) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccessWithoutContent(res);
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
    getProjects,
    updateProject,
    deleteProject
};
