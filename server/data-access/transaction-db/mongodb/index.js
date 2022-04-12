// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Transaction = require('../../../db/mongodb/models/transaction');
const serialize = require('./serializer');
const makeTransaction = require('../../../models/transaction/index').makeTransaction;
const makeUpdateTransaction = require('../../../models/transaction/index').makeUpdateTransaction;
const errorFormatter = require('./errorFormatter');
const walletAccess = require('../../wallet-db/index.js');


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
  var transaction = await makeTransaction(transactionInfo);

  console.log(transactionInfo.date);  
  var newTransaction = {
    source: transaction.getSource(),
    destination: transaction.getDestination(),
    remarks: transaction.getRemarks(),
    amount: transaction.getAmount(),    
    transactionType: transaction.getTransactionType(),
    date: transaction.getDate(),
    branchId: transaction.getBranchId(),
  };

  console.log(newTransaction.transactionType);

  console.log(newTransaction.date.split('-')[0], newTransaction.date.split('-')[1]);
  let splittedDate = newTransaction.date.split('-');
  let foundWallet = await walletAccess.findWalletBy({
    year: splittedDate[0],
    month: splittedDate[1]
  });

  if(foundWallet !== null) {
    let isGreater = (splittedDate[2]) > foundWallet.data.length;
    let len = isGreater ? (splittedDate[2]) : foundWallet.data.length;
    let startIndex = !isGreater ? (splittedDate[2] - 1) : foundWallet.data.length - 1;

    for(let i = startIndex; i < len; i++){
      if(isGreater) {
        if(i == parseInt(splittedDate[2] - 1)) {
          if(newTransaction.transactionType == "Income")
            foundWallet.data.push(foundWallet.data[startIndex] + parseInt(newTransaction.amount));
          else
            foundWallet.data.push(foundWallet.data[startIndex] - parseInt(newTransaction.amount));            
        }
        else
          foundWallet.data.push(foundWallet.data[startIndex]);
      }
      else {
        if(newTransaction.transactionType == "Income")
          foundWallet.data[i] += parseInt(newTransaction.amount);
        else
          foundWallet.data[i] -= parseInt(newTransaction.amount);          
      }
    }
  }

  let updatedWallet = await walletAccess.updateWallet(foundWallet.id, foundWallet);

  console.log(foundWallet.data);
  console.log("wallet updated!");
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
