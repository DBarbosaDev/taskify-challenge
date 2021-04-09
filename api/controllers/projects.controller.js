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

const getProjectTasks = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    try {
        const project = await projectsService.getProjectTasks(userId, projectId, req.body);

        if (!project) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccess(res, project.refTasks || []);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

const addProjectTask = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    try {
        const task = await projectsService.addProjectTask(userId, projectId, req.body);

        if (!task) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccess(res, task);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

const deleteProjectTask = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;
    const taskId = req.params.taskId;

    try {
        const isProjectDeleted = await projectsService.deleteProjectTask(userId, projectId, taskId);

        if (!isProjectDeleted) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccessWithoutContent(res);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        if (ERROR_CODES_CONSTANTS[error.message]) {
            return expressResponsesKit.sendError(res, { code: error.message });
        }

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
};

const updateProjectTask = async (req, res) => {
    const userId = res.locals.userId;
    const projectId = req.params.id;
    const taskId = req.params.taskId;

    try {
        const isProjectDeleted = await projectsService.updateProjectTask(userId, projectId, taskId, req.body);

        if (!isProjectDeleted) {
            return expressResponsesKit.sendError(res, { code: ERROR_CODES_CONSTANTS.PROJECT_NOT_FOUND });
        }

        return expressResponsesKit.sendSuccessWithoutContent(res);
    }
    catch (error) {
        const stackTrace = {};
        Error.captureStackTrace(stackTrace);

        if (ERROR_CODES_CONSTANTS[error.message]) {
            return expressResponsesKit.sendError(res, { code: error.message });
        }

        return expressResponsesKit.sendInternalServerError(
            res, { stack: String(stackTrace.stack), message: error.message }
        );
    }
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
