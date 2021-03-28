const express = require('express');

const router = express.Router();

const { projectsController } = require('../controllers');
const { projectsValidator } = require('../validators');

router.get('/myProjects', projectsController.getProjects);
router.post('/project', projectsValidator.validateProjectParams(), projectsController.addProject);
router.put('/project/:id');
router.delete('/project/:id');

module.exports = router;
