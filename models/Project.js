const db = require('../config/database');

class Project {
  static async getAll(userId) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM projectos WHERE user_id = ? ORDER BY creado DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM projectos WHERE id_proyecto = ? AND user_id = ?',
        [id, userId]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(projectData, userId) {
    try {
      const { name, location, startDate, endDate, latitude, longitude } = projectData;
      
      const [result] = await db.execute(
        'INSERT INTO projectos (name_proyecto, location_proyecto, fechaInicio_proyecto, fechaFin_proyecto, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, location, startDate, endDate, latitude, longitude, userId]
      );
      
      return {
        id_proyecto: result.insertId,
        name_proyecto: name,
        location_proyecto: location,
        fechaInicio_proyecto: startDate,
        fechaFin_proyecto: endDate,
        latitude: latitude,
        longitude: longitude,
        user_id: userId
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, projectData, userId) {
    try {
      const { name, location, startDate, endDate, latitude, longitude } = projectData;
      
      await db.execute(
        'UPDATE projectos SET name_proyecto = ?, location_proyecto = ?, fechaInicio_proyecto = ?, fechaFin_proyecto = ?, latitude = ?, longitude = ? WHERE id_proyecto = ? AND user_id = ?',
        [name, location, startDate, endDate, latitude, longitude, id, userId]
      );
      
      return {
        id_proyecto: parseInt(id),
        name_proyecto: name,
        location_proyecto: location,
        fechaInicio_proyecto: startDate,
        fechaFin_proyecto: endDate,
        latitude: latitude,
        longitude: longitude,
        user_id: userId
      };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      await db.execute(
        'DELETE FROM projectos WHERE id_proyecto = ? AND user_id = ?',
        [id, userId]
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Project;