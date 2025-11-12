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

const championUpdateSchema = Joi.object({
  year: Joi.number().integer().min(1950).max(2100),
  nombre: Joi.string().min(2).max(100),
  apellido: Joi.string().min(2).max(100),
  pais: Joi.string().min(2).max(100),
  equipo: Joi.string().min(2).max(100),
  victorias: Joi.number().integer().min(0),
  puntos: Joi.number().min(0)
}).min(1); // At least one field must be present

const validateChampion = (data) => {
  return championSchema.validate(data, { abortEarly: false });
};

const validateChampionUpdate = (data) => {
  return championUpdateSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateChampion,
  validateChampionUpdate
};
