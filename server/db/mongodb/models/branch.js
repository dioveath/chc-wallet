const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var BranchSchema = new Schema({
  branchId: String,
  name: String,
  admin: String,
  borderColor: String,
  roomRent: Number,
  internetBill: Number,
  waterBill: Number
}, { timestamps: true });


BranchSchema.plugin(uniqueValidator);
var Branch = mongoose.model('Branch', BranchSchema);

module.exports = Branch;
