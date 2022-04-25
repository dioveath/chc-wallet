const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var WalletSchema = new Schema({
  branchCode: String,
  year: Number,
  month: Number,
  data: Array,
  totalAmount: Number
}, { timestamps: true });


WalletSchema.plugin(uniqueValidator);
var Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
