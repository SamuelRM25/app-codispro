const express = require('express');
const router = express.Router();
const { pool } = require('../db/db_config');

// Ruta para login con código
router.post('/login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ 
      success: false, 
      message: 'Código no proporcionado.' 
    });
  }

  try {
    const connection = await pool.getConnection();
    
    // Query para validar el código
    const query = `
      SELECT id, code_value, is_active 
      FROM access_codes 
      WHERE code_value = ? AND is_active = TRUE
    `;
    
    const [rows] = await connection.execute(query, [code]);
    connection.release();

    if (rows.length > 0) {
      // Código válido y activo
      res.json({ 
        success: true, 
        message: 'Login exitoso.', 
        userId: rows[0].id 
      });
    } else {
      // Código no encontrado o inactivo
      res.status(401).json({ 
        success: false, 
        message: 'Código inválido o inactivo.' 
      });
    }
  } catch (error) {
    console.error('Error al validar código:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor.' 
    });
  }
});

module.exports = router;