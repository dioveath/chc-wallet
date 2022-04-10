module.exports = function makeGetTransaction(transactionAccess) {
  return async function getTransaction(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const transaction = await transactionAccess.findTransactionById(httpRequest.params.id);

      if(transaction == null) {
        throw new Error("No Transaction with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          transaction
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
