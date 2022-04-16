const mongoose = require('../connection');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
  source: String,
  destination: String,
  remarks: String,
  amount: Number,
  category: String,
  transactionType: String,
  date: Date,
  doneBy: { type: Schema.Types.ObjectId },
  branchId: String
}, { timestamps: true });


TransactionSchema.plugin(uniqueValidator);
var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
