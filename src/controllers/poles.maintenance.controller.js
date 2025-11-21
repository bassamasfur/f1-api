const fs = require('fs');
const paths = require('../config/paths.config');
const poleNumeroSchema = require('../validators/poleNumero.validator');
const PoleNumeroModel = require('../models/poleNumero.model');

class PolesMaintenanceController {
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
}

module.exports = new PolesMaintenanceController();
