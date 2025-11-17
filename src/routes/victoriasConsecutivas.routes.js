const express = require('express');
const router = express.Router();
const victoriasController = require('../controllers/victorias.controller');

/**
 * @route   GET /api/victorias-consecutivas
 * @desc    Obtener todas las victorias consecutivas
 * @access  Public
 */
router.get('/', victoriasController.getAllVictoriasConsecutivas);

module.exports = router;
