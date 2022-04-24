module.exports = function makeCreateTransaction(transactionAccess){

    return async function createTransaction(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          console.log("reqBody: " + httpRequest.body);
          const newTransaction = await transactionAccess.addTransaction(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newTransaction
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

};
