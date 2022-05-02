var buildMakeTransaction = function(transactionValidator){
  return async ({
    branchCode,
    year,
    data,
    totalAmount
  } = {}) => {

    var error = transactionValidator({
      branchCode,
      year,
      data,
      totalAmount
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getBranchCode: () => branchCode,
      getYear: () => year,
      getData: () => data,
      getTotalAmount: () => totalAmount
    });

  };

};


module.exports = buildMakeTransaction;
