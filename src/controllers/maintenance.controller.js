const ChampionModel = require('../models/champion.model');
const ChampionByAgeModel = require('../models/championByAge.model');
const HistoricalPodiumModel = require('../models/historicalPodium.model');
const { validateChampion } = require('../validators/champion.validator');
const { validateChampionByAge } = require('../validators/championByAge.validator');
const { validateHistoricalPodium } = require('../validators/historicalPodium.validator');
const paths = require('../config/paths.config');
const fs = require('fs');

class MaintenanceController {
  // Cargar archivo JSON completo de campeones
  async cargarCampeones(req, res, next) {
    try {
      // Leer el archivo JSON
      const jsonData = fs.readFileSync(paths.champions.jsonFile, 'utf8');
      const championsData = JSON.parse(jsonData);

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

  // Cargar un solo campeón
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

  // Cargar campeones por edad desde JSON
  async cargarCampeonesPorEdad(req, res, next) {
    try {
      // Leer el archivo JSON
      const jsonData = fs.readFileSync(paths.championsByAge.jsonFile, 'utf8');
      const championsData = JSON.parse(jsonData);

      // Validar cada campeón
      const errors = [];
      championsData.forEach((champion, index) => {
        const { error } = validateChampionByAge(champion);
        if (error) {
          errors.push({
            index: index,
            nombre: champion.nombre,
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
      console.log('🗑️  Eliminando todos los registros existentes de champions_by_age...');
      const deleteResult = await ChampionByAgeModel.deleteAll();
      console.log(`✅ ${deleteResult.deleted} registros eliminados`);

      // Insertar todos los campeones por edad
      console.log('📝 Cargando nuevos campeones por edad...');
      const results = await ChampionByAgeModel.createMany(championsData);

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} campeones por edad cargados exitosamente`,
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

  // Cargar podio histórico desde JSON
  async cargarPodioHistorico(req, res, next) {
    try {
      // Leer el archivo JSON
      const jsonData = fs.readFileSync(paths.historicalPodium.jsonFile, 'utf8');
      const podiumsData = JSON.parse(jsonData);

      // Validar cada podio
      const errors = [];
      podiumsData.forEach((podium, index) => {
        const { error } = validateHistoricalPodium(podium);
        if (error) {
          errors.push({
            index: index,
            año: podium.año,
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
      console.log('🗑️  Eliminando todos los registros existentes de historical_podium...');
      const deleteResult = await HistoricalPodiumModel.deleteAll();
      console.log(`✅ ${deleteResult.deleted} registros eliminados`);

      // Insertar todos los podios históricos
      console.log('📝 Cargando podio histórico...');
      const results = await HistoricalPodiumModel.createMany(podiumsData);

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} podios históricos cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          podiums: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MaintenanceController();
