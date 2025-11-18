const Joi = require('joi');

const victoriasEnUnAnioSchema = Joi.object({
  ID: Joi.number().integer().min(1).required(),
  piloto: Joi.string().min(2).max(100).required(),
  temporada: Joi.number().integer().min(1900).max(2100).required(),
  victorias: Joi.number().integer().min(0).required(),
  caracter: Joi.string().max(5).required(),
  carreras_totales: Joi.number().integer().min(1).required(),
  porcentaje: Joi.number().min(0).max(100).required()
});

const validateVictoriasEnUnAnio = (data) => {
  return victoriasEnUnAnioSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateVictoriasEnUnAnio
};
