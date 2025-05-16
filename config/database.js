const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};