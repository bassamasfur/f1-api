const ChampionModel = require('../models/champion.model');
const ChampionByAgeModel = require('../models/championByAge.model');
const { getFirestore, admin } = require('../config/firebase.config');

class ChampionsController {
  // Verificar conexión a Firebase
  async verificarConexion(req, res, next) {
    try {
      const db = getFirestore();
      
      // Intenta hacer una operación simple para verificar la conexión
      const testCollection = await db.collection('_connection_test').limit(1).get();
      
      res.status(200).json({
        success: true,
        message: 'Conexión a Firebase exitosa',
        firebase: {
          connected: true,
          projectId: admin.app().options.projectId,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al conectar con Firebase',
        error: error.message
      });
    }
  }

  // Obtener todos los campeones
  async getAllChampions(req, res, next) {
    try {
      const champions = await ChampionModel.getAll();
      res.status(200).json({
        success: true,
        count: champions.length,
        data: champions
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener campeones por edad
  async getChampionsByAge(req, res, next) {
    try {
      const champions = await ChampionByAgeModel.getAll();
      res.status(200).json({
        success: true,
        count: champions.length,
        data: champions
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChampionsController();
