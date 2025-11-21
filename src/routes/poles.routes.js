const express = require('express');
const router = express.Router();
const polesController = require('../controllers/poles.controller');

/**
 * @route   GET /api/poles/pole-numero
 * @desc    Obtener todos los pilotos con pole-numero
 * @access  Public
 */
router.get('/pole-numero', polesController.getAllPoleNumero);

/**
 * @route   GET /api/poles/poles-consecutive
 * @desc    Obtener todos los pilotos con poles consecutivas
 * @access  Public
 */
router.get('/poles-consecutive', polesController.getAllPolesConsecutive);

module.exports = router;
