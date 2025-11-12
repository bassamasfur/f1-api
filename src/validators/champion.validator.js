const Joi = require('joi');

const championSchema = Joi.object({
  year: Joi.number().integer().min(1950).max(2100).required(),
  nombre: Joi.string().required().min(2).max(100),
  apellido: Joi.string().required().min(2).max(100),
  pais: Joi.string().required().min(2).max(100),
  equipo: Joi.string().required().min(2).max(100),
  victorias: Joi.number().integer().min(0).required(),
  puntos: Joi.number().min(0).required()
});

const validateChampion = (data) => {
  return championSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateChampion
};
