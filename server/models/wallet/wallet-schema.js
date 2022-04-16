const Joi = require('joi-oid');

const walletUpdateSchema = Joi.object().keys({
  branchId: Joi.string().alphanum().min(3).max(30),
  year: Joi.number(),
  month: Joi.number(),  
  data: Joi.array(),
  totalAmount: Joi.number()
}).min(1);

const walletSchema = walletUpdateSchema.options({ presence: 'required'});

module.exports = {
  walletSchema,
  walletUpdateSchema
};
