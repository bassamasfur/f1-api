const Joi = require('joi');

const victoriasSchema = Joi.object({
  piloto: Joi.string().min(2).max(100).required(),
  nacionalidad: Joi.string().min(2).max(50).required(),
  victorias: Joi.number().integer().min(0).required(),
  equipo: Joi.string().min(2).max(100).required(),
  año_primera_victoria: Joi.number().integer().min(1950).max(2100).required(),
  año_ultima_victoria: Joi.number().integer().min(1950).max(2100).required()
});

const validateVictorias = (data) => {
  return victoriasSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateVictorias
};
