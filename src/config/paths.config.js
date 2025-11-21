  // ...existing code...
const path = require('path');

/**
 * Configuración centralizada de rutas del proyecto
 */
module.exports = {
  polesConsecutive: {
    jsonFile: path.join(__dirname, '../../recursos/poles-consecutive.json')
  },
  poleNumero: {
    jsonFile: path.join(__dirname, '../../recursos/pole-numero.json')
  },
  poleNumero: {
    jsonFile: path.join(__dirname, '../../recursos/pole-numero.json')
  },
  // Rutas de recursos
  champions: {
    jsonFile: path.join(__dirname, '../../recursos/campeones_f1.json')
  },
  championsByAge: {
    jsonFile: path.join(__dirname, '../../recursos/campeones_por_edad.json')
  },
  historicalPodium: {
    jsonFile: path.join(__dirname, '../../recursos/podio_historico_f1.json')
  },
  championSeasonsBefore: {
    jsonFile: path.join(__dirname, '../../recursos/campeones_temporadas_antes.json')
  },
  victorias: {
    jsonFile: path.join(__dirname, '../../recursos/pilotos_victorias_f1.json')
  },
  victoriasConsecutivas: {
    jsonFile: path.join(__dirname, '../../recursos/consecutive_victorias.json')
  },
  victoriasEnUnAnio: {
    jsonFile: path.join(__dirname, '../../recursos/victorias_en_un_anio.json')
  },
  numerosAnios: {
    jsonFile: path.join(__dirname, '../../recursos/numeros_anios.json')
  },
  anneeConsecutive: {
    jsonFile: path.join(__dirname, '../../recursos/annee-consecutive.json')
  },
  gpAntesVictoria: {
    jsonFile: path.join(__dirname, '../../recursos/gp-antes_victoria.json')
  },

    victoriaSinPole: {
      jsonFile: path.join(__dirname, '../../recursos/victoria-sin-pole.json')
    },

      victoriaVueltaFast: {
        jsonFile: path.join(__dirname, '../../recursos/victoria-vuelta-fast.json')
      },
  
  // Carpetas principales
  recursos: path.join(__dirname, '../../recursos'),
  root: path.join(__dirname, '../..')
};
