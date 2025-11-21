const PoleNumeroModel = require('../models/poleNumero.model');

class PolesController {
  async getAllPoleNumero(req, res, next) {
    try {
      const data = await PoleNumeroModel.getAll();
      res.status(200).json({
        success: true,
        count: data.length,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PolesController();
