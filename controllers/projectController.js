const Project = require('../models/Project');

// Obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    
    return res.status(200).json({
      success: true,
      data: {
        projects: projects
      }
    });
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos'
    });
  }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.getById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        project: project
      }
    });
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener proyecto'
    });
  }
};

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    
    // Validar datos requeridos
    if (!projectData.name || !projectData.location || !projectData.startDate || !projectData.endDate || 
        projectData.latitude === undefined || projectData.longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos para crear el proyecto'
      });
    }
    
    const newProject = await Project.create(projectData);
    
    return res.status(201).json({
      success: true,
      data: {
        project: newProject
      }
    });
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear proyecto'
    });
  }
};

// Actualizar un proyecto existente
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    
    // Verificar si el proyecto existe
    const existingProject = await Project.getById(id);
    
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    // Validar datos requeridos
    if (!projectData.name || !projectData.location || !projectData.startDate || !projectData.endDate || 
        projectData.latitude === undefined || projectData.longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos para actualizar el proyecto'
      });
    }
    
    const updatedProject = await Project.update(id, projectData);
    
    return res.status(200).json({
      success: true,
      data: {
        project: updatedProject
      }
    });
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar proyecto'
    });
  }
};

// Eliminar un proyecto
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si el proyecto existe
    const existingProject = await Project.getById(id);
    
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    
    await Project.delete(id);
    
    return res.status(200).json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar proyecto'
    });
  }
};