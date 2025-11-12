const express = require('express');
const router = express.Router();
const championsController = require('../controllers/champions.controller');

/**
 * @route   GET /api/champions/verificar-conexion
 * @desc    Verificar conexión a Firebase
 * @access  Public
 */
router.get('/verificar-conexion', championsController.verificarConexion);

/**
 * @route   POST /api/champions/cargar-campeones
 * @desc    Cargar archivo JSON completo de campeones a Firebase (SIEMPRE borra todo antes)
 * @access  Public
 */
router.post('/cargar-campeones', championsController.cargarCampeones);

/**
 * @route   POST /api/champions/cargar-campeon
 * @desc    Cargar un solo campeón a Firebase
 * @access  Public
 */
router.post('/cargar-campeon', championsController.cargarCampeon);

/**
 * @route   GET /api/champions
 * @desc    Get all champions
 * @access  Public
 */
router.get('/', championsController.getAllChampions);

/**
 * @route   GET /api/champions/:id
 * @desc    Get champion by ID
 * @access  Public
 */
router.get('/:id', championsController.getChampionById);

/**
 * @route   GET /api/champions/year/:year
 * @desc    Get champion by year
 * @access  Public
 */
router.get('/year/:year', championsController.getChampionByYear);

/**
 * @route   PUT /api/champions/:id
 * @desc    Update champion
 * @access  Public
 */
router.put('/:id', championsController.updateChampion);

/**
 * @route   DELETE /api/champions/:id
 * @desc    Delete champion
 * @access  Public
 */
router.delete('/:id', championsController.deleteChampion);

module.exports = router;
