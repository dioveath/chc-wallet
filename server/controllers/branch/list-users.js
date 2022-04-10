module.exports = function makeListBranchs(branchAccess){
  
  return async function listBranchs(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const branchs = await branchAccess.listBranchs();
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
