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

  // Obtener todas las victorias consecutivas
  async getAllVictoriasConsecutivas(req, res, next) {
    try {
      const victoriasConsecutivas = await VictoriasModel.getAll('victorias_consecutivas');
      res.status(200).json({
        success: true,
        count: victoriasConsecutivas.length,
        data: victoriasConsecutivas
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VictoriasController();
