const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthController {
  // Login con código
  static async login(req, res) {
    try {
      const { codigo } = req.body;

      if (!codigo) {
        return res.status(400).json({ 
          success: false, 
          message: 'El código es requerido' 
        });
      }

      // Buscar usuario por código
      const user = await UserModel.findByCode(codigo);

      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Código inválido' 
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: user.id_user, 
          codigo: user.codigo_user,
          descripcion: user.descripcion_user
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
          user: {
            id: user.id_user,
            codigo: user.codigo_user,
            descripcion: user.descripcion_user
          },
          token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error en el servidor', 
        error: error.message 
      });
    }
  }

  // Verificar token
  static async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          success: false, 
          message: 'Token no proporcionado' 
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Verificar que el usuario siga existiendo
      const user = await UserModel.findByCode(decoded.codigo);
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario no encontrado' 
        });
      }

      res.status(200).json({
        success: true,
        message: 'Token válido',
        data: {
          user: {
            id: user.id_user,
            codigo: user.codigo_user,
            descripcion: user.descripcion_user
          }
        }
      });
    } catch (error) {
      console.error('Error al verificar token:', error);
      res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
    }
  }
}

module.exports = AuthController;


// Ejemplo de cómo debería ser tu controlador
exports.login = async (req, res) => {
  // Implementación del login
};

exports.verifyToken = async (req, res) => {
  // Implementación de la verificación del token
};