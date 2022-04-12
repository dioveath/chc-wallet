const Joi = require('joi-oid');

const branchUpdateSchema = Joi.object().keys({
  branchId: Joi.string().alphanum().min(3).max(30),
  name: Joi.string().min(3).max(120),
  admin: Joi.string().min(3).max(120),
  borderColor: Joi.string().min(3).max(32),
  backgroundColor: Joi.string().max(32),
  roomRent: Joi.number(),
  internetBill: Joi.number(),
  waterBill: Joi.number()
}).min(1);

const branchSchema = branchUpdateSchema.options({ presence: 'required'});

module.exports = {
  branchSchema,
  branchUpdateSchema
};
