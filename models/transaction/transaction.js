var buildMakeTransaction = function(transactionValidator){
  return async ({
    source,
    destination,
    remarks,
    amount,
    category,
    transactionType,
    date,
    doneBy,
    branchCode
  } = {}) => {

    var error = transactionValidator({
      source,
      destination,
      remarks,
      amount,
      category,
      transactionType,
      date,
      doneBy,
      branchCode
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getSource: () => source,
      getDestination: () => destination,
      getRemarks: () => remarks,
      getAmount: () => amount,
      getCategory: () => category,
      getTransactionType: () => transactionType,
      getDate: () => date,
      getDoneBy: () => doneBy,
      getBranchCode: () => branchCode
    });

  };

};


module.exports = buildMakeTransaction;
