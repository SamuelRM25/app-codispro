const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/login', authController.login);

// Rutas protegidas
router.get('/verify', authMiddleware.authenticate, authController.verifyToken);
// Asegúrate de que authController.verifyToken sea una función, no un objeto

module.exports = router;