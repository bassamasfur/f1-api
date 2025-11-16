const Joi = require('joi');

const championSeasonsBeforeSchema = Joi.object({
  posición: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'La posición debe ser un número',
      'number.integer': 'La posición debe ser un número entero',
      'number.min': 'La posición debe ser mayor o igual a 1',
      'any.required': 'La posición es requerida'
    }),
  piloto: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre del piloto debe ser texto',
      'string.min': 'El nombre del piloto debe tener al menos 3 caracteres',
      'string.max': 'El nombre del piloto no puede exceder 100 caracteres',
      'any.required': 'El nombre del piloto es requerido'
    }),
  temporadas_antes_campeón: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Las temporadas antes del campeonato deben ser un número',
      'number.integer': 'Las temporadas antes del campeonato deben ser un número entero',
      'number.min': 'Las temporadas antes del campeonato deben ser mayor o igual a 1',
      'any.required': 'Las temporadas antes del campeonato son requeridas'
    })
});

const validateChampionSeasonsBefore = (data) => {
  return championSeasonsBeforeSchema.validate(data, { abortEarly: false });
};

module.exports = {
  championSeasonsBeforeSchema,
  validateChampionSeasonsBefore
};
