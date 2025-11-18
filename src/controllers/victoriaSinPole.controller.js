const VictoriaSinPoleModel = require('../models/victoriaSinPole.model');

class VictoriaSinPoleController {
  async getAll(req, res, next) {
    try {
      const data = await VictoriaSinPoleModel.getAll();
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

module.exports = new VictoriaSinPoleController();
