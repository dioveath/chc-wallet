var buildMakeBranch = function(branchValidator){
  return async ({
    branchId,
    name,
    admin,
    borderColor,
    backgroundColor,
    roomRent,
    internetBill,
    waterBill
  } = {}) => {

    var error = branchValidator({
      branchId,
      name,
      admin,
      borderColor,
      backgroundColor,
      roomRent,
      internetBill,
      waterBill
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getBranchId: () => branchId,
      getName: () => name,
      getAdmin: () => admin,
      getBorderColor: () => borderColor,
      getBackgroundColor: () => backgroundColor,
      getRoomRent: () => roomRent,
      getInternetBill: () => internetBill,
      getWaterBill: () => waterBill
    });

  };

};

module.exports = buildMakeBranch;
