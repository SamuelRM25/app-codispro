// Configuración de la base de datos MySQL
const mysql = require('mysql2/promise');

// Configuración de la conexión a MySQL usando tus credenciales
const pool = mysql.createPool({
  host: "b1vqvw2ovk0cvi7iqrzt-mysql.services.clever-cloud.com",
  user: "ufxigtxm8dtggce3",
  password: "Lr6bCY7y4q3E1GbOswsu",
  database: "b1vqvw2ovk0cvi7iqrzt",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para inicializar la base de datos
async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a la base de datos MySQL.');

    // Crear tabla de códigos de acceso si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS access_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_value VARCHAR(255) NOT NULL UNIQUE,
        description VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insertar un código de prueba si no existe
    await connection.execute(`
      INSERT IGNORE INTO access_codes (code_value, description) 
      VALUES ('ADMIN123', 'Código de administrador')
    `);

    connection.release();
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

module.exports = {
  pool,
  initDatabase
};