var buildMakeBranch = function(branchValidator){
  return async ({
    codeName,
    name,
    admin,
    borderColor,
    backgroundColor,
    roomRent,
    internetBill,
    waterBill
  } = {}) => {

    var error = branchValidator({
      codeName,
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
      getCodeName: () => codeName,
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
