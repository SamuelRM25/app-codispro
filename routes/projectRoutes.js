const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (si las necesitas)
// router.get('/public', projectController.getPublicProjects);

// Rutas protegidas
router.get('/', authMiddleware.authenticate, projectController.getAllProjects);
router.get('/:id', authMiddleware.authenticate, projectController.getProjectById);
router.post('/', authMiddleware.authenticate, projectController.createProject);
router.put('/:id', authMiddleware.authenticate, projectController.updateProject);
router.delete('/:id', authMiddleware.authenticate, projectController.deleteProject);

module.exports = router;