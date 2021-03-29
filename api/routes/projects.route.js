const express = require('express');

const router = express.Router();

const { projectsController } = require('../controllers');
const { projectsValidator } = require('../validators');

router.get('/myProjects', projectsController.getProjects);
router.post('/project', projectsValidator.validateProjectParams(), projectsController.addProject);
router.post('/project/:id/task',
    projectsValidator.validateProjectIdParam(),
    projectsValidator.validateTaskParams(),
    projectsController.addProjectTask);

router.put('/project/:id',
    projectsValidator.validateProjectParams(),
    projectsValidator.validateProjectIdParam(),
    projectsController.updateProject);

router.put('/project/:id/task/:taskId',
    projectsValidator.validateProjectIdParam(),
    projectsValidator.validateTaskIdParam(),
    projectsValidator.validateTaskParams(),
    projectsController.updateProjectTask);

router.delete('/project/:id', projectsValidator.validateProjectIdParam(), projectsController.deleteProject);

router.delete('/project/:id/task/:taskId',
    projectsValidator.validateProjectIdParam(),
    projectsValidator.validateTaskIdParam(),
    projectsController.deleteProjectTask);

module.exports = router;
