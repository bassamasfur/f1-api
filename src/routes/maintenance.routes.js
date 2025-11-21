const polesMaintenanceController = require('../controllers/poles.maintenance.controller');
router.post('/cargar-gp-poles-antes', polesMaintenanceController.cargarGpPolesAntes);
const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenance.controller');
const victoriasMaintenanceController = require('../controllers/victorias.maintenance.controller');
const polesMaintenanceController = require('../controllers/poles.maintenance.controller');
router.post('/cargar-poles-annee-consecutive', polesMaintenanceController.cargarPolesAnneeConsecutive);

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

/**
 * @route   POST /api/maintenance/cargar-podio-historico
 * @desc    Cargar archivo JSON de podio histórico a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-podio-historico', maintenanceController.cargarPodioHistorico);

/**
 * @route   POST /api/maintenance/cargar-temporadas-antes
 * @desc    Cargar archivo JSON de temporadas antes de ser campeón a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-temporadas-antes', maintenanceController.cargarTemporadasAntes);

/**
 * @route   POST /api/maintenance/cargar-victorias
 * @desc    Cargar archivo JSON de pilotos con victorias a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-victorias', victoriasMaintenanceController.cargarVictorias);

/**
 * @route   POST /api/maintenance/cargar-victorias-consecutivas
 * @desc    Cargar archivo JSON de victorias consecutivas a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-victorias-consecutivas', victoriasMaintenanceController.cargarVictoriasConsecutivas);

/**
 * @route   POST /api/maintenance/cargar-victorias-en-un-anio
 * @desc    Cargar archivo JSON de victorias en un año a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-victorias-en-un-anio', victoriasMaintenanceController.cargarVictoriasEnUnAnio);

/**
 * @route   POST /api/maintenance/cargar-numeros-anios
 * @desc    Cargar archivo JSON de números de años a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-numeros-anios', victoriasMaintenanceController.cargarNumerosAnios);

/**
 * @route   POST /api/maintenance/cargar-victoria-vuelta-fast
 * @desc    Cargar archivo JSON de victoria vuelta fast a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-victoria-vuelta-fast', victoriasMaintenanceController.cargarVictoriaVueltaFast);
/**
 * @route   POST /api/maintenance/cargar-annee-consecutive
 * @desc    Cargar archivo JSON de años consecutivos a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-annee-consecutive', victoriasMaintenanceController.cargarAnneeConsecutive);

/**
 * @route   POST /api/maintenance/cargar-victoria-sin-pole
 * @desc    Cargar archivo JSON de victoria sin pole a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-victoria-sin-pole', victoriasMaintenanceController.cargarVictoriaSinPole);
/**
 * @route   POST /api/maintenance/cargar-gp-antes-victoria
 * @desc    Cargar archivo JSON de GP antes de victoria a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-gp-antes-victoria', victoriasMaintenanceController.cargarGpAntesVictoria);

/**
 * @route   POST /api/maintenance/cargar-pole-numero
 * @desc    Cargar archivo JSON de pole-numero a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-pole-numero', polesMaintenanceController.cargarPoleNumero);

/**
 * @route   POST /api/maintenance/cargar-poles-consecutive
 * @desc    Cargar archivo JSON de poles-consecutive a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-poles-consecutive', polesMaintenanceController.cargarPolesConsecutive);

/**
 * @route   POST /api/maintenance/cargar-poles-consecutive-debut
 * @desc    Cargar archivo JSON de poles-consecutive-debut a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-poles-consecutive-debut', polesMaintenanceController.cargarPolesConsecutiveDebut);

/**
 * @route   POST /api/maintenance/cargar-poles-en-un-anio
 * @desc    Cargar archivo JSON de poles-en-un-anio a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-poles-en-un-anio', polesMaintenanceController.cargarPolesEnUnAnio);

/**
 * @route   POST /api/maintenance/cargar-num-annee
 * @desc    Cargar archivo JSON de num-annee a Firebase (SIEMPRE borra todo antes)
 * @access  Admin
 */
router.post('/cargar-num-annee', polesMaintenanceController.cargarNumAnnee);

module.exports = router;
