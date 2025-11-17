const Joi = require('joi');

const victoriasSchema = Joi.object({
  ID: Joi.number().integer().min(1).required(),
  nombre: Joi.string().min(2).max(100).required(),
  victorias: Joi.number().integer().min(0).required(),
  porcentaje: Joi.number().min(0).max(100).required()
});

const validateVictorias = (data) => {
  return victoriasSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateVictorias
};
