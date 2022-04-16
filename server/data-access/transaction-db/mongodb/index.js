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
    category: transaction.getCategory(),
    transactionType: transaction.getTransactionType(),
    date: transaction.getDate(),
    doneBy: transaction.getDoneBy(),
    branchId: transaction.getBranchId(),
  };

  let splittedDate = newTransaction.date.split('-');
  let year = splittedDate[0];
  let month = splittedDate[1];
  let foundWallet = await walletAccess.findWalletBy({
    branchId: newTransaction.branchId,
    year: year,
    month: month
  });

  if(foundWallet !== null) {
    addTransactionToWallet(newTransaction, foundWallet, splittedDate[2]);
  } else {
    console.log("wallet not found!, creating new wallet!");
    let previousMonthWallet = await walletAccess.findWalletBy({
      branchId: newTransaction.branchId,
      year: month == 1 ? year - 1 : year,
      month: month == 1 ? 12 : month
    });

    // previousMonthWallet.data[previousMonthWallet.data.length - 1]
    let previousMonthTotal = previousMonthWallet !== null ? previousMonthWallet.totalAmount : 0;

    let newWallet = await walletAccess.addWallet({
      branchId: newTransaction.branchId,
      year: year,
      month: month,
      data: [previousMonthTotal],
      totalAmount: previousMonthTotal
    });
    
    addTransactionToWallet(newTransaction, newWallet, splittedDate[2]);
  }

  return Transaction.create(newTransaction).then(serialize).catch(errorFormatter);
}

async function addTransactionToWallet(transaction, wallet, day){
  let isGreater = (day) > wallet.data.length;
  let len = isGreater ? (day) : wallet.data.length;
  let startIndex = !isGreater ? (day - 1) : wallet.data.length;

  for(let i = startIndex; i < len; i++){
    if(isGreater) {
      if(i == parseInt(day - 1)) {
        if(transaction.transactionType == "Income") {
          console.log("fsad");
          wallet.data.push((wallet.data[startIndex] ?? 0) + parseInt(transaction.amount));
        }
        else
          wallet.data.push((wallet.data[startIndex] ?? 0) - parseInt(transaction.amount));            
      }
      else
        wallet.data.push(wallet.data[startIndex] ?? 0);
    }
    else {
      if(transaction.transactionType == "Income")
        wallet.data[i] += parseInt(transaction.amount);
      else
        wallet.data[i] -= parseInt(transaction.amount);          
    }
  }

  if(transaction.transactionType == "Income") {
    transaction.totalAmount += parseInt(transaction.amount);
  } else {
    transaction.totalAmount -= parseInt(transaction.amount);    
  }

  console.log(wallet);
  let updatedWallet = await walletAccess.updateWallet(wallet.id, wallet);
  console.log("wallet updated!");  
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
