var buildMakeTransaction = function(transactionValidator){
  return async ({
    branchCode,
    year,
    month,
    data,
    totalAmount
  } = {}) => {

    var error = transactionValidator({
      branchCode,
      year,
      month,
      data,
      totalAmount
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getBranchCode: () => branchCode,
      getYear: () => year,
      getMonth: () => month,
      getData: () => data,
      getTotalAmount: () => totalAmount
    });

  };

};


module.exports = buildMakeTransaction;
