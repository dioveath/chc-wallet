const transactionAccess = require('../../data-access/transaction-db/index');
const makeGetTransaction = require('./get-transaction');
const makeCreateTransaction = require('./create-transaction');
const makeDeleteTransaction = require('./delete-transaction');
const makeListTransactions = require('./list-transactions');
const makeUpdateTransaction = require('./update-transaction');

const getTransaction = makeGetTransaction(transactionAccess);
const createTransaction = makeCreateTransaction(transactionAccess);
const deleteTransaction = makeDeleteTransaction(transactionAccess);
const listTransactions = makeListTransactions(transactionAccess);
const updateTransaction = makeUpdateTransaction(transactionAccess);

const transactionController = {
  getTransaction,
  createTransaction,
  updateTransaction, 
  deleteTransaction,
  listTransactions,
};

module.exports = transactionController;
