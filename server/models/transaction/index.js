// Dependency Injections 
// - Schema 
// - validation library

const buildMakeTransaction = require('./transaction');
const transactionSchema = require('./transaction-schema').transactionSchema;
const transactionUpdateSchema = require('./transaction-schema').transactionUpdateSchema;
const transactionValidator = require('../validator/')(transactionSchema);
const transactionUpdateValidator = require('../validator/')(transactionUpdateSchema);

const makeTransaction = buildMakeTransaction(transactionValidator);
const makeUpdateTransaction = buildMakeTransaction(transactionUpdateValidator);

module.exports =  {
  makeTransaction,
  makeUpdateTransaction
};
