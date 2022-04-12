module.exports = function makeCreateBranch(branchAccess){

    return async function createBranch(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          console.log("reqBody: " + httpRequest.body);
          const newBranch = await branchAccess.addBranch(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newBranch
            }
          };
        } catch(error){
          // TODO: Error Logging
          console.log(error);

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
