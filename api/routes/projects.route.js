const express = require('express');

const router = express.Router();

const { projectsController } = require('../controllers');
const { projectsValidator } = require('../validators');

router.get('/myProjects', projectsController.getProjects);
router.post('/project', projectsValidator.validateProjectParams(), projectsController.addProject);

router.put('/project/:id',
    projectsValidator.validateProjectParams(),
    projectsValidator.validateProjectIdParam(),
    projectsController.updateProject);

router.delete('/project/:id', projectsValidator.validateProjectIdParam(), projectsController.deleteProject);

module.exports = router;
