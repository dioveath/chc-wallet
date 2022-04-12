module.exports = function makeListBranches(branchAccess){
  
  return async function listBranches(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const branchs = await branchAccess.listBranches();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          branchs
        }
      };
    } catch (error){
      // Error logging
      console.log(error);
      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };

    };

  };

};
