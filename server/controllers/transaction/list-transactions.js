module.exports = function makeListTransactions(transactionAccess){
  
  return async function listTransactions(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const transactions = await transactionAccess.listTransactions(httpRequest.query);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          transactions
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
