const gpPolesAntesSchema = require('../validators/gpPolesAntes.validator');
const GpPolesAntesModel = require('../models/gpPolesAntes.model');
const fs = require('fs');
const paths = require('../config/paths.config');
const poleNumeroSchema = require('../validators/poleNumero.validator');
const polesAnneeConsecutiveSchema = require('../validators/polesAnneeConsecutive.validator');
const PolesAnneeConsecutiveModel = require('../models/polesAnneeConsecutive.model');
const PoleNumeroModel = require('../models/poleNumero.model');
const polesConsecutiveSchema = require('../validators/polesConsecutive.validator');
const PolesConsecutiveModel = require('../models/polesConsecutive.model');
const polesConsecutiveDebutSchema = require('../validators/polesConsecutiveDebut.validator');
const PolesConsecutiveDebutModel = require('../models/polesConsecutiveDebut.model');
const polesEnUnAnioSchema = require('../validators/polesEnUnAnio.validator');
const PolesEnUnAnioModel = require('../models/polesEnUnAnio.model');
const numAnneeSchema = require('../validators/numAnnee.validator');
const NumAnneeModel = require('../models/numAnnee.model');

class PolesMaintenanceController {
  // POST /maintenance/cargar-gp-poles-antes
  async cargarGpPolesAntes(req, res, next) {
    try {
      const data = require('../../recursos/gp-poles-antes.json');
      for (const item of data) {
        const { error } = gpPolesAntesSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }
      await GpPolesAntesModel.clearCollection();
      const loaded = await GpPolesAntesModel.addMany(data);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de gp-poles-antes cargados exitosamente`, data: { loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }
  // POST /maintenance/cargar-num-annee
  async cargarNumAnnee(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.numAnnee.jsonFile, 'utf8');
      const numAnneeData = JSON.parse(jsonData);

      // Validar cada registro
      for (const item of numAnneeData) {
        const { error } = numAnneeSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }

      // Limpiar colección
      const deleted = await NumAnneeModel.clearCollection();
      // Cargar datos
      const loaded = await NumAnneeModel.addMany(numAnneeData);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de num-annee cargados exitosamente`, data: { deleted, loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }
  // POST /maintenance/cargar-poles-en-un-anio
  async cargarPolesEnUnAnio(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.polesEnUnAnio.jsonFile, 'utf8');
      const polesEnUnAnioData = JSON.parse(jsonData);

      // Validar cada registro
      for (const item of polesEnUnAnioData) {
        const { error } = polesEnUnAnioSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }

      // Limpiar colección
      const deleted = await PolesEnUnAnioModel.clearCollection();
      // Cargar datos
      const loaded = await PolesEnUnAnioModel.addMany(polesEnUnAnioData);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de poles-en-un-anio cargados exitosamente`, data: { deleted, loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }
  // POST /maintenance/cargar-pole-numero
  async cargarPoleNumero(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.poleNumero.jsonFile, 'utf8');
      const poleNumeroData = JSON.parse(jsonData);

      // Validar cada registro
      for (const item of poleNumeroData) {
        const { error } = poleNumeroSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }

      // Limpiar colección
      const deleted = await PoleNumeroModel.clearCollection();
      // Cargar datos
      const loaded = await PoleNumeroModel.addMany(poleNumeroData);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de pole-numero cargados exitosamente`, data: { deleted, loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }

  // POST /maintenance/cargar-poles-consecutive
  async cargarPolesConsecutive(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.polesConsecutive.jsonFile, 'utf8');
      const polesConsecutiveData = JSON.parse(jsonData);

      // Validar cada registro
      for (const item of polesConsecutiveData) {
        const { error } = polesConsecutiveSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }

      // Limpiar colección
      const deleted = await PolesConsecutiveModel.clearCollection();
      // Cargar datos
      const loaded = await PolesConsecutiveModel.addMany(polesConsecutiveData);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de poles-consecutive cargados exitosamente`, data: { deleted, loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }

  // POST /maintenance/cargar-poles-annee-consecutive
  async cargarPolesAnneeConsecutive(req, res, next) {
    try {
      const data = require('../../recursos/poles-annee-consecutive.json');
      for (const item of data) {
        const { error } = polesAnneeConsecutiveSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }
      await PolesAnneeConsecutiveModel.clearCollection();
      const loaded = await PolesAnneeConsecutiveModel.addMany(data);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de poles-annee-consecutive cargados exitosamente`, data: { loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }

  // POST /maintenance/cargar-poles-consecutive-debut
  async cargarPolesConsecutiveDebut(req, res, next) {
    try {
      const jsonData = fs.readFileSync(paths.polesConsecutiveDebut.jsonFile, 'utf8');
      const polesConsecutiveDebutData = JSON.parse(jsonData);

      // Validar cada registro
      for (const item of polesConsecutiveDebutData) {
        const { error } = polesConsecutiveDebutSchema.validate(item);
        if (error) {
          return res.status(400).json({ success: false, message: 'Error de validación', details: error.details });
        }
      }

      // Limpiar colección
      const deleted = await PolesConsecutiveDebutModel.clearCollection();
      // Cargar datos
      const loaded = await PolesConsecutiveDebutModel.addMany(polesConsecutiveDebutData);
      res.json({ success: true, message: `Colección limpiada y ${loaded} registros de poles-consecutive-debut cargados exitosamente`, data: { deleted, loaded } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error al cargar datos', error: err.message });
    }
  }
}

module.exports = new PolesMaintenanceController();
