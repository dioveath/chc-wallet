const Joi = require('joi-oid');

const gameSessionUpdateSchema = Joi.object().keys({
  player: Joi.string().min(3).max(30),
  platform: Joi.string().min(1).max(120),
  game: Joi.string().min(1).max(120),
  inCharge: Joi.objectId(),
  startTime: Joi.string(),
  duration: Joi.number(),
  cost: Joi.number(),
  paid: Joi.boolean()
}).min(1);

const gameSessionSchema = gameSessionUpdateSchema.options({ presence: 'required'});


module.exports = {
  gameSessionSchema,
  gameSessionUpdateSchema
};
