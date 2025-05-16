const express = require('express');
const router = express.Router();
const { pool } = require('../db/db_config');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Verificar si la tabla existe, si no, crearla
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        progress FLOAT DEFAULT 0,
        imageUrl VARCHAR(255)
      )
    `);
    
    // Insertar datos de ejemplo si la tabla está vacía
    const [checkRows] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    if (checkRows[0].count === 0) {
      await connection.execute(`
        INSERT INTO projects (id, name, location, startDate, endDate, progress, imageUrl) VALUES
        (UUID(), 'Edificio Residencial Torres del Valle', 'Ciudad de México', '2023-01-15', '2024-06-30', 0.35, 'https://example.com/img1.jpg'),
        (UUID(), 'Centro Comercial Plaza Norte', 'Monterrey', '2023-03-10', '2024-12-15', 0.20, 'https://example.com/img2.jpg'),
        (UUID(), 'Hospital Regional', 'Guadalajara', '2023-02-01', '2025-01-20', 0.15, 'https://example.com/img3.jpg')
      `);
    }
    
    // Obtener todos los proyectos
    const [rows] = await connection.execute('SELECT * FROM projects');
    connection.release();
    
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al obtener proyectos.' 
    });
  }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM projects WHERE id = ?', 
      [id]
    );
    
    connection.release();
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor.' 
    });
  }
});

// Actualizar el progreso de un proyecto
router.patch('/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    
    if (progress === undefined || progress < 0 || progress > 1) {
      return res.status(400).json({
        success: false,
        message: 'El progreso debe ser un valor entre 0 y 1'
      });
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'UPDATE projects SET progress = ? WHERE id = ?',
      [progress, id]
    );
    
    connection.release();
    
    if (result.affectedRows > 0) {
      res.json({
        success: true,
        message: 'Progreso actualizado correctamente'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al actualizar el progreso:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor.' 
    });
  }
});

module.exports = router;