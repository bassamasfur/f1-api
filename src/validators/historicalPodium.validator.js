const Joi = require('joi');

const historicalPodiumSchema = Joi.object({
  año: Joi.number().integer().min(1950).max(2100).required(),
  campeon: Joi.string().required().min(2).max(100),
  escuderia_campeon: Joi.string().required().min(2).max(100),
  subcampeon: Joi.string().required().min(2).max(100),
  escuderia_subcampeon: Joi.string().required().min(2).max(100),
  tercer_lugar: Joi.string().required().min(2).max(100),
  escuderia_tercer_lugar: Joi.string().required().min(2).max(100)
});

const validateHistoricalPodium = (data) => {
  return historicalPodiumSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateHistoricalPodium
};
