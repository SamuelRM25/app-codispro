const { pool } = require('../config/database');

class UserModel {
  // Buscar usuario por código
  static async findByCode(codigo) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE codigo_user = ?',
        [codigo]
      );
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por código:', error);
      throw error;
    }
  }

  // Obtener todos los usuarios
  static async getAllUsers() {
    try {
      const [rows] = await pool.query('SELECT id_user, codigo_user, descripcion_user FROM usuarios');
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Crear un nuevo usuario
  static async createUser(codigo, descripcion) {
    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (codigo_user, descripcion_user) VALUES (?, ?)',
        [codigo, descripcion]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }
}

module.exports = UserModel;