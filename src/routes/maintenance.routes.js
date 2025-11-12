const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller');

/**
 * @route   POST /api/maintenance/cargar-campeones
 * @desc    Cargar archivo JSON completo de campeones a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-campeones', maintenanceController.cargarCampeones);

/**
 * @route   POST /api/maintenance/cargar-campeon
 * @desc    Cargar un solo campeón a Firebase
 * @access  Admin
 */
router.post('/cargar-campeon', maintenanceController.cargarCampeon);

/**
 * @route   POST /api/maintenance/cargar-campeones-por-edad
 * @desc    Cargar archivo JSON de campeones por edad a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-campeones-por-edad', maintenanceController.cargarCampeonesPorEdad);

module.exports = router;
