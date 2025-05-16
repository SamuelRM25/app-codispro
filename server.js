const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./db/db_config');
const authRoutes = require('./routes/auth_routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar la base de datos
initDatabase();

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Construct+ funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});