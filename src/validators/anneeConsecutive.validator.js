const Joi = require('joi');

const anneeConsecutiveSchema = Joi.object({
  ID: Joi.number().integer().min(1).required(),
  nombre: Joi.string().min(2).max(100).required(),
  anios_consecutivos: Joi.number().integer().min(1).required(),
  inicio: Joi.number().integer().min(1900).max(2100).required(),
  to: Joi.string().max(10).required(),
  fin: Joi.number().integer().min(1900).max(2100).required()
});

const validateAnneeConsecutive = (data) => {
  return anneeConsecutiveSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateAnneeConsecutive
};
