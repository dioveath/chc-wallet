

// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Transaction = require('../../../db/mongodb/models/transaction');
const serialize = require('./serializer');
const makeTransaction = require('../../../models/transaction/index').makeTransaction;
const makeUpdateTransaction = require('../../../models/transaction/index').makeUpdateTransaction;
const errorFormatter = require('./errorFormatter');
const walletAccess = require('../../wallet-db/index.js');
const { getNumberOfDays } = require('../../../utils/dateutils.js');


function listTransactions(httpQuery){
  const { query, ...paginateQuery } = httpQuery;

  let paginationParams = [
    JSON.parse(query ?? "{}"),
    paginateQuery ?? {}
  ];

  return Transaction.paginate(...paginationParams).then((result) => {
    const { docs, ...pagination } = result;
    return {
      pagination,
      transactions: serialize(docs)
    };
  }).catch(errorFormatter);
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

  var newTransaction = {
    source: transaction.getSource(),
    destination: transaction.getDestination(),
    remarks: transaction.getRemarks(),
    amount: transaction.getAmount(),
    category: transaction.getCategory(),
    transactionType: transaction.getTransactionType(),
    date: transaction.getDate(),
    doneBy: transaction.getDoneBy(),
    branchCode: transaction.getBranchCode(),
  };

  let splittedDate = newTransaction.date.split('-');
  let year = splittedDate[0];
  let month = splittedDate[1];
  let foundWallet = await walletAccess.findWalletBy({
    branchCode: newTransaction.branchCode,
    year: year
  });


  if(foundWallet.length !== 0) {
    await addTransactionToWallet(newTransaction, foundWallet[0], month, splittedDate[2]);
  } else {
    console.log("wallet not found!, creating new year wallet!");
    let newWallet = await walletAccess.addWallet({
      branchCode: newTransaction.branchCode,
      year: year,
      data: Array.from({length: getNumberOfDays(year, 12)}, (_, __) => 0),
      totalAmount: 0
    });

    await addTransactionToWallet(newTransaction, newWallet, month, splittedDate[2]);
  }

  return Transaction.create(newTransaction).then(serialize).catch(errorFormatter);
}

async function addTransactionToWallet(transaction, wallet, month, day){
  let startIndex = getNumberOfDays(wallet.year, month-1) + parseInt(day) - 1;

  for(let i = startIndex; i < getNumberOfDays(wallet.year, new Date().getMonth() + 1); i++){
      if(transaction.transactionType == "Income")
        wallet.data[i] += parseInt(transaction.amount);
      else
        wallet.data[i] -= parseInt(transaction.amount);          
  }

  if(transaction.transactionType == "Income") {
    wallet.totalAmount += parseInt(transaction.amount);
  } else {
    wallet.totalAmount -= parseInt(transaction.amount);    
  }

  let updatedWallet = await walletAccess.updateWallet(wallet.id, wallet);
  console.log("wallet updated, with " + transaction.amount + " " + transaction.transactionType);  
}


async function updateTransaction(id, updateTransactionInfo){
  if(!id) 
    throw new Error("You must supply id!");

  const validUpdateTransactionData = await makeUpdateTransaction(updateTransactionInfo);

  // TODO: if transaction update is of type Income/Expense
  // we need to update wallet accordingly

  return Transaction.findByIdAndUpdate(id, updateTransactionInfo, { new: true }).then(serialize).catch(errorFormatter);
}


async function deleteTransaction(id){
  let transaction = await findTransactionById(id);
  if(transaction == null) throw ["Transaction not found with id" + id];
  let splittedDate = transaction.date.toISOString().substring(10, 0).split('-');
  let year = splittedDate[0];
  let month = splittedDate[1];  
  let foundWallet = await walletAccess.findWalletBy({
    branchCode: transaction.branchCode,
    year: year
  });

  console.log(foundWallet);
  if(foundWallet !== null || foundWallet.length !== 0){
    if(transaction.transactionType == 'Income')
      transaction.transactionType = 'Expense';
    else
      transaction.transactionType = 'Income';

    addTransactionToWallet(transaction, foundWallet[0], month, splittedDate[2]);
  }

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
