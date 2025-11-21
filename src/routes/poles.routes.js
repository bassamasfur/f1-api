const express = require('express');
const router = express.Router();
const polesController = require('../controllers/poles.controller');

/**
 * @route   GET /api/poles/pole-numero
 * @desc    Obtener todos los pilotos con pole-numero
 * @access  Public
 */
router.get('/pole-numero', polesController.getAllPoleNumero);

module.exports = router;
