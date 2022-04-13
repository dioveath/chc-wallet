const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  fullName: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true }, 
  phoneNumber: { type: String, unique: true },
  branchId: { type: String },
  emailVerified: { type: Boolean }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);
var User = mongoose.model('User', UserSchema);

module.exports = User;
