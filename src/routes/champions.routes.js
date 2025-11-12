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

module.exports = router;
