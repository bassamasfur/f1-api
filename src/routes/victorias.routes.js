const express = require('express');
const router = express.Router();
const victoriasController = require('../controllers/victorias.controller');

/**
 * @route   GET /api/victorias
 * @desc    Obtener todos los pilotos con victorias
 * @access  Public
 */
router.get('/', victoriasController.getAllVictorias);

/**
 * @route   GET /api/victorias-en-un-anio
 * @desc    Obtener todas las victorias en un año
 * @access  Public
 */
router.get('/en-un-anio', victoriasController.getAllVictoriasEnUnAnio);

module.exports = router;
