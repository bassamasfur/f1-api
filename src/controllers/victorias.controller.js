const VictoriasModel = require('../models/victorias.model');

class VictoriasController {
  // Obtener todos los pilotos con victorias
  async getAllVictorias(req, res, next) {
    try {
      const victorias = await VictoriasModel.getAll();
      res.status(200).json({
        success: true,
        count: victorias.length,
        data: victorias
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VictoriasController();
