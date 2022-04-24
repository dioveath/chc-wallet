const Joi = require('joi-oid');

const transactionUpdateSchema = Joi.object().keys({
  source: Joi.string().min(3).max(30),
  destination: Joi.string().min(3).max(30),
  remarks: Joi.string().min(3).max(120),
  amount: Joi.number(),
  category: Joi.string().max(32),
  transactionType: Joi.string().alphanum().max(20),
  date: Joi.date().min('1-1-2021').max('1-1-2030'), // MM-DD-YYYY
  doneBy: Joi.objectId(),
  branchCode: Joi.string().alphanum().min(3).max(30)
}).min(1);

const transactionSchema = transactionUpdateSchema.options({ presence: 'required'});

module.exports = {
  transactionSchema,
  transactionUpdateSchema
};
