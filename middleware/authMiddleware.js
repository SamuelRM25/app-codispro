const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    // Obtener el token del encabezado
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Acceso no autorizado. Token no proporcionado'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Agregar el usuario al objeto de solicitud
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado. Token inválido'
    });
  }
};