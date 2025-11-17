const VictoriasModel = require('../models/victorias.model');
const { validateVictorias } = require('../validators/victorias.validator');
const paths = require('../config/paths.config');
const fs = require('fs');


const { validateVictoriasConsecutivas } = require('../validators/victoriasConsecutivas.validator');

class VictoriasMaintenanceController {
  // Cargar archivo JSON completo de pilotos con victorias
  async cargarVictorias(req, res, next) {
    try {
      // Leer el archivo JSON
      const jsonData = fs.readFileSync(paths.victorias.jsonFile, 'utf8');
      const victoriasData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      victoriasData.forEach((record, index) => {
        const { error } = validateVictorias(record);
        if (error) {
          errors.push({
            index: index,
            piloto: record.piloto,
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

      // Limpiar la colección antes de cargar
      const deleteResult = await VictoriasModel.deleteAll();

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(victoriasData);

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con victorias cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          victorias: results
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Cargar archivo JSON de victorias consecutivas
  async cargarVictoriasConsecutivas(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.victoriasConsecutivas.jsonFile, 'utf8');
      const victoriasConsecutivasData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      victoriasConsecutivasData.forEach((record, index) => {
        const { error } = validateVictoriasConsecutivas(record);
        if (error) {
          errors.push({
            index: index,
            piloto: record.Piloto,
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

      // Limpiar la colección antes de cargar
      const deleteResult = await VictoriasModel.deleteAll('victorias_consecutivas');

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(victoriasConsecutivasData, 'victorias_consecutivas');

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con victorias consecutivas cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          victorias_consecutivas: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VictoriasMaintenanceController();
