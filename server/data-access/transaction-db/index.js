const { listTransactions,
        findTransactionBy,
        findTransactionById,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        dropTransactions
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listTransactions,
  findTransactionBy,
  findTransactionById, 
  addTransaction,
  updateTransaction,
  deleteTransaction, 
  dropTransactions,
};
