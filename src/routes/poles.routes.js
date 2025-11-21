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

/**
 * @route   GET /api/poles/poles-consecutive-debut
 * @desc    Obtener todos los pilotos con poles consecutivas debut
 * @access  Public
 */
router.get('/poles-consecutive-debut', polesController.getAllPolesConsecutiveDebut);

/**
 * @route   GET /api/poles/poles-en-un-anio
 * @desc    Obtener todos los pilotos con poles en un año
 * @access  Public
 */
router.get('/poles-en-un-anio', polesController.getAllPolesEnUnAnio);

/**
 * @route   GET /api/poles/num-annee
 * @desc    Obtener todos los pilotos con num-annee
 * @access  Public
 */
router.get('/num-annee', polesController.getAllNumAnnee);

module.exports = router;
