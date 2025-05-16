const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta de login
router.post('/login', AuthController.login);

// Ruta para verificar token (protegida)
router.get('/verify', authMiddleware, AuthController.verifyToken);

module.exports = router;