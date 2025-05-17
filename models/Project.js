const { pool } = require('../config/database');

class Project {
  static async getAll() {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM proyectos ORDER BY creado DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM proyectos WHERE id_proyecto = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(projectData) {
    try {
      const { name, location, startDate, endDate, latitude, longitude } = projectData;
      
      const [result] = await pool.query(
        'INSERT INTO proyectos (name_proyecto, location_proyecto, fechaInicio_proyecto, fechaFin_proyecto, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
        [name, location, startDate, endDate, latitude, longitude]
      );
      
      return {
        id_proyecto: result.insertId,
        name_proyecto: name,
        location_proyecto: location,
        fechaInicio_proyecto: startDate,
        fechaFin_proyecto: endDate,
        latitude: latitude,
        longitude: longitude
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, projectData) {
    try {
      const { name, location, startDate, endDate, latitude, longitude } = projectData;
      
      await pool.query(
        'UPDATE proyectos SET name_proyecto = ?, location_proyecto = ?, fechaInicio_proyecto = ?, fechaFin_proyecto = ?, latitude = ?, longitude = ? WHERE id_proyecto = ?',
        [name, location, startDate, endDate, latitude, longitude, id]
      );
      
      return {
        id_proyecto: parseInt(id),
        name_proyecto: name,
        location_proyecto: location,
        fechaInicio_proyecto: startDate,
        fechaFin_proyecto: endDate,
        latitude: latitude,
        longitude: longitude
      };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query(
        'DELETE FROM proyectos WHERE id_proyecto = ?',
        [id]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Project;