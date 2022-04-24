module.exports = function makeUpdateUsser(branchAccess){
  
  return async function updateBranch(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedBranch = await branchAccess.updateBranch(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedBranch
        }
      };

    } catch(error){
      // TODO: Error logging
      // console.log(error);

      return {
        headers,
        statusCode: 400,
        body: {
          status: 'fail',
          errorList: error.message.split(',')
        }
      };
    }

  };

}
