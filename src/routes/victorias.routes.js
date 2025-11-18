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

/**
 * @route   GET /api/victorias/numeros-anios
 * @desc    Obtener todos los pilotos con números de años
 * @access  Public
 */
router.get('/numeros-anios', victoriasController.getAllNumerosAnios);

/**
 * @route   GET /api/victorias/annee-consecutive
 * @desc    Obtener todos los pilotos con años consecutivos
 * @access  Public
 */
router.get('/annee-consecutive', victoriasController.getAllAnneeConsecutive);

module.exports = router;
