const ChampionModel = require('../models/champion.model');
const { validateChampion } = require('../validators/champion.validator');
const { getFirestore, admin } = require('../config/firebase.config');
const paths = require('../config/paths.config');
const fs = require('fs');

class ChampionsController {
  // 1) Verificar conexión a Firebase
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

  // 2) Cargar archivo JSON completo de campeones
  async cargarCampeones(req, res, next) {
    try {
      // Leer el archivo JSON usando la configuración centralizada
      const filePath = paths.champions.jsonFile;
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: 'Archivo campeones_f1.json no encontrado',
          path: filePath
        });
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const championsData = JSON.parse(fileContent);

      // Convertir el objeto en un array de campeones
      const championsArray = Object.keys(championsData).map(year => ({
        year: parseInt(year),
        nombre: championsData[year].nombre,
        apellido: championsData[year].apellido,
        pais: championsData[year].pais,
        equipo: championsData[year].equipo,
        victorias: championsData[year].victorias,
        puntos: championsData[year].puntos
      }));

      // Validar cada campeón
      const errors = [];
      championsArray.forEach((champion, index) => {
        const { error } = validateChampion(champion);
        if (error) {
          errors.push({
            year: champion.year,
            errors: error.details.map(detail => detail.message)
          });
        }
      });

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación en los datos',
          errors: errors
        });
      }

      // SIEMPRE limpiar la colección antes de cargar
      console.log('🗑️  Eliminando todos los registros existentes...');
      const deleteResult = await ChampionModel.deleteAll();
      console.log(`✅ ${deleteResult.deleted} registros eliminados`);

      // Insertar todos los campeones
      console.log('📝 Cargando nuevos campeones...');
      const results = await ChampionModel.createMany(championsArray);

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} campeones cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          champions: results
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // 3) Cargar un solo campeón
  async cargarCampeon(req, res, next) {
    try {
      const { error, value } = validateChampion(req.body);
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => detail.message)
        });
      }

      // Verificar si ya existe un campeón para ese año
      const existingChampion = await ChampionModel.getByYear(value.year);
      if (existingChampion) {
        return res.status(409).json({
          success: false,
          message: `Ya existe un campeón para el año ${value.year}`,
          data: existingChampion
        });
      }

      const champion = await ChampionModel.create(value);
      
      res.status(201).json({
        success: true,
        message: 'Campeón creado exitosamente',
        data: champion
      });
    } catch (error) {
      next(error);
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
}

module.exports = new ChampionsController();
