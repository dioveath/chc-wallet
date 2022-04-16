var buildMakeTransaction = function(transactionValidator){
  return async ({
    branchId,
    year,
    month,
    data,
    totalAmount
  } = {}) => {

    var error = transactionValidator({
      branchId,
      year,
      month,
      data,
      totalAmount
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getBranchId: () => branchId,
      getYear: () => year,
      getMonth: () => month,
      getData: () => data,
      getTotalAmount: () => totalAmount
    });

  };

};


module.exports = buildMakeTransaction;
