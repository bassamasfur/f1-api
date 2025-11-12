const Joi = require('joi');

const championByAgeSchema = Joi.object({
  nombre: Joi.string().required().min(2).max(100),
  edad: Joi.string().required().min(2).max(50),
  año: Joi.number().integer().min(1950).max(2100).required()
});

const validateChampionByAge = (data) => {
  return championByAgeSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateChampionByAge
};
