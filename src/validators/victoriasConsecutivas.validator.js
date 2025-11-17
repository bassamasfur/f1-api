const Joi = require('joi');

const victoriasConsecutivasSchema = Joi.object({
  ID: Joi.number().integer().min(1).required(),
  Piloto: Joi.string().min(2).max(100).required(),
  victorias_consecutivas: Joi.number().integer().min(1).required(),
  inicio: Joi.string().min(2).max(50).required(),
  to: Joi.string().min(2).max(10).required(),
  fin: Joi.string().min(2).max(50).required()
});

const validateVictoriasConsecutivas = (data) => {
  return victoriasConsecutivasSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateVictoriasConsecutivas
};
