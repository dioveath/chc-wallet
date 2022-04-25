const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var BranchSchema = new Schema({
  codeName: { type: String, unique: true },
  name: String,
  admin: { type: Schema.Types.ObjectId },
  borderColor: String,
  backgroundColor: String,
  roomRent: Number,
  internetBill: Number,
  waterBill: Number
}, { timestamps: true });


BranchSchema.plugin(uniqueValidator);
var Branch = mongoose.model('Branch', BranchSchema);

module.exports = Branch;
