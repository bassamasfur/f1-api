const path = require('path');

/**
 * Configuración centralizada de rutas del proyecto
 */
module.exports = {
  // Rutas de recursos
  champions: {
    jsonFile: path.join(__dirname, '../../recursos/campeones_f1.json')
  },
  championsByAge: {
    jsonFile: path.join(__dirname, '../../recursos/campeones_por_edad.json')
  },
  
  // Carpetas principales
  recursos: path.join(__dirname, '../../recursos'),
  root: path.join(__dirname, '../..')
};
