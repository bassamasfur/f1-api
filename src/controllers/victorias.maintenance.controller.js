const VictoriasModel = require('../models/victorias.model');
const { validateVictorias } = require('../validators/victorias.validator');
const { validateVictoriasEnUnAnio } = require('../validators/victoriasEnUnAnio.validator');
const { validateNumerosAnios } = require('../validators/numerosAnios.validator');
const { validateAnneeConsecutive } = require('../validators/anneeConsecutive.validator');
const paths = require('../config/paths.config');
const fs = require('fs');


const { validateVictoriasConsecutivas } = require('../validators/victoriasConsecutivas.validator');

class VictoriasMaintenanceController {
  // Cargar archivo JSON de GP antes de victoria
  async cargarGpAntesVictoria(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.gpAntesVictoria.jsonFile, 'utf8');
      const gpAntesVictoriaData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      gpAntesVictoriaData.forEach((record, index) => {
        if (typeof record.ID !== 'number' || typeof record.nombre !== 'string' || typeof record.carreras !== 'number') {
          errors.push({
            index: index,
            nombre: record.nombre,
            errors: ['Estructura inválida']
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
      const deleteResult = await VictoriasModel.deleteAll('gp_antes_victoria');

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(gpAntesVictoriaData, 'gp_antes_victoria');

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con GP antes de victoria cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          gp_antes_victoria: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
  // Cargar archivo JSON de años consecutivos
  async cargarAnneeConsecutive(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.anneeConsecutive.jsonFile, 'utf8');
      const anneeConsecutiveData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      anneeConsecutiveData.forEach((record, index) => {
        const { error } = validateAnneeConsecutive(record);
        if (error) {
          errors.push({
            index: index,
            nombre: record.nombre,
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
      const deleteResult = await VictoriasModel.deleteAll('annee_consecutive');

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(anneeConsecutiveData, 'annee_consecutive');

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con años consecutivos cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          annee_consecutive: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
  // Cargar archivo JSON de números de años
  async cargarNumerosAnios(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.numerosAnios.jsonFile, 'utf8');
      const numerosAniosData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      numerosAniosData.forEach((record, index) => {
        const { error } = validateNumerosAnios(record);
        if (error) {
          errors.push({
            index: index,
            nombre: record.nombre,
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
      const deleteResult = await VictoriasModel.deleteAll('numeros_anios');

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(numerosAniosData, 'numeros_anios');

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con números de años cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          numeros_anios: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
  // Cargar archivo JSON de victorias en un año
  async cargarVictoriasEnUnAnio(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.victoriasEnUnAnio.jsonFile, 'utf8');
      const victoriasEnUnAnioData = JSON.parse(jsonData);

      // Validar cada registro
      const errors = [];
      victoriasEnUnAnioData.forEach((record, index) => {
        const { error } = validateVictoriasEnUnAnio(record);
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
      const deleteResult = await VictoriasModel.deleteAll('victorias_en_un_anio');

      // Insertar todos los registros
      const results = await VictoriasModel.createMany(victoriasEnUnAnioData, 'victorias_en_un_anio');

      res.status(201).json({
        success: true,
        message: `Colección limpiada y ${results.length} pilotos con victorias en un año cargados exitosamente`,
        data: {
          deleted: deleteResult.deleted,
          loaded: results.length,
          victorias_en_un_anio: results
        }
      });
    } catch (error) {
      next(error);
    }
  }
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
