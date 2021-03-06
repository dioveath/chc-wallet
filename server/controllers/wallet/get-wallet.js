module.exports = function makeGetWallet(walletAccess) {
  return async function getWallet(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const wallet = await walletAccess.findWalletById(httpRequest.params.id);

      if(wallet == null) {
        throw new Error("No Wallet with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          wallet
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
