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
 * @route   GET /api/champions
 * @desc    Get all champions
 * @access  Public
 */
router.get('/', championsController.getAllChampions);

module.exports = router;
