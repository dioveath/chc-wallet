const Joi = require('joi-oid');

const userUpdateSchema = Joi.object().keys({
  fullName: Joi.string().min(3).max(30),
  password: Joi.string().pattern(/^[A-z0-9~!@#$%^&*()_+-=]{3,30}$/),  
  email: Joi.string().email(), 
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
  branchId: Joi.string().min(3).max(30)
}).min(1);

const userSchema = userUpdateSchema.options({ presence: 'required'});

module.exports = {
  userSchema,
  userUpdateSchema
};
