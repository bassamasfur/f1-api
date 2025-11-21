const PoleNumeroModel = require('../models/poleNumero.model');
const PolesConsecutiveModel = require('../models/polesConsecutive.model');
const PolesConsecutiveDebutModel = require('../models/polesConsecutiveDebut.model');
const PolesEnUnAnioModel = require('../models/polesEnUnAnio.model');

class PolesController {
  async getAllPolesEnUnAnio(req, res, next) {
    try {
      const data = await PolesEnUnAnioModel.getAll();
      res.status(200).json({
        success: true,
        count: data.length,
        data
      });
    } catch (error) {
      next(error);
    }
  }
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

  async getAllPolesConsecutiveDebut(req, res, next) {
    try {
      const data = await PolesConsecutiveDebutModel.getAll();
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
