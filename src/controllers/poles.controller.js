const PoleNumeroModel = require('../models/poleNumero.model');
const PolesConsecutiveModel = require('../models/polesConsecutive.model');

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

  async getAllPolesConsecutive(req, res, next) {
    try {
      const data = await PolesConsecutiveModel.getAll();
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
