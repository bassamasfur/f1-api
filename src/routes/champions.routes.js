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
 * @route   GET /api/champions/por-edad
 * @desc    Get champions by age
 * @access  Public
 */
router.get('/por-edad', championsController.getChampionsByAge);

/**
 * @route   GET /api/champions/podio-historico
 * @desc    Get historical podium (1950-2024)
 * @access  Public
 */
router.get('/podio-historico', championsController.getHistoricalPodium);

/**
 * @route   GET /api/champions
 * @desc    Get all champions
 * @access  Public
 */
router.get('/', championsController.getAllChampions);

module.exports = router;
