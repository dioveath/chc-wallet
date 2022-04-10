var buildMakeTransaction = function(transactionValidator){
  return async ({
    source,
    destination,
    remarks,
    amount,
    transactionType,
    date,
    branchId
  } = {}) => {

    var error = transactionValidator({
      source,
      destination,
      remarks,
      amount,
      transactionType,
      date,
      branchId
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getSource: () => source,
      getDestination: () => destination,
      getRemarks: () => remarks,
      getAmount: () => amount,
      getTransactionType: () => transactionType,
      getDate: () => date,
      getBranchId: () => branchId
    });

  };

};


module.exports = buildMakeTransaction;
