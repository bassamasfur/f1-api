const VictoriaVueltaFastModel = require('../models/victoriaVueltaFast.model');

class VictoriaVueltaFastController {
  async getAll(req, res, next) {
    try {
      const data = await VictoriaVueltaFastModel.getAll();
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

module.exports = new VictoriaVueltaFastController();
