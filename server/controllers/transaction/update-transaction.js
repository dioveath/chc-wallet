module.exports = function makeUpdateUsser(transactionAccess){
  
  return async function updateTransaction(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedTransaction = await transactionAccess.updateTransaction(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedTransaction
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
