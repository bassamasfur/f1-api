const express = require('express');
const router = express.Router();
const victoriasController = require('../controllers/victorias.controller');

/**
 * @route   GET /api/victorias
 * @desc    Obtener todos los pilotos con victorias
 * @access  Public
 */
router.get('/', victoriasController.getAllVictorias);

module.exports = router;
