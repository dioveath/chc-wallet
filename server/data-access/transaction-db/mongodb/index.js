// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Transaction = require('../../../db/mongodb/models/transaction');
const serialize = require('./serializer');
const makeTransaction = require('../../../models/transaction/index').makeTransaction;
const makeUpdateTransaction = require('../../../models/transaction/index').makeUpdateTransaction;
const errorFormatter = require('./errorFormatter');


function listTransactions(){
  return Transaction.find({}).then(serialize).catch(errorFormatter);
}

function findTransactionBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Transaction.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findTransactionById(id){
  return Transaction.findById(id).then(serialize).catch(errorFormatter);
}

async function addTransaction(transactionInfo){
  // defaults
  var transaction = await makeTransaction(transactionInfo);

  var newTransaction = {
    source: transaction.getSource(),
    destination: transaction.getDestination(),
    remarks: transaction.getRemarks(),
    amount: transaction.getAmount(),    
    transactionType: transaction.getTransactionType(),
    date: transaction.getDate(),
    branchId: transaction.getBranchId(),
  };

  return Transaction.create(newTransaction).then(serialize).catch(errorFormatter);
}


async function updateTransaction(id, updateTransactionInfo){
  if(!id) 
    throw new Error("You must supply id!");

  // var transactionData = await Transaction.findById(id);  
  // if(transactionData === null) throw new Error("No Transaction with id: " + id);

  const validUpdateTransactionData = await makeUpdateTransaction(updateTransactionInfo);

  // if error is not thrown, then we can update with updateTransactionInfo in database
  return Transaction.findByIdAndUpdate(id, updateTransactionInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteTransaction(id){
  return Transaction.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropTransactions(){
  return Transaction.deleteMany().catch(errorFormatter);
}


module.exports = {
  listTransactions,
  findTransactionBy,
  findTransactionById, 
  addTransaction,
  updateTransaction, 
  deleteTransaction, 
  dropTransactions
};
