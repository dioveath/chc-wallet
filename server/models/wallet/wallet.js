var buildMakeTransaction = function(transactionValidator){
  return async ({
    branchId,
    year,
    month,
    data
  } = {}) => {

    var error = transactionValidator({
      branchId,
      year,
      month,
      data     
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getBranchId: () => branchId,
      getYear: () => year,
      getMonth: () => month,
      getData: () => data
    });

  };

};


module.exports = buildMakeTransaction;
