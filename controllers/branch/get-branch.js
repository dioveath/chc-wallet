module.exports = function makeGetBranch(branchAccess) {
  return async function getBranch(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const branch = await branchAccess.findBranchById(httpRequest.params.id);

      if(branch == null) {
        throw new Error("No Branch with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          branch
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
};
