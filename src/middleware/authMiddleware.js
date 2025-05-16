const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Verificar si existe el token en los headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Acceso no autorizado. Token no proporcionado' 
      });
    }

    // Extraer el token
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar la información del usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso no autorizado. Token inválido o expirado' 
    });
  }
};

module.exports = authMiddleware;