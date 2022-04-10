module.exports = function makeListWallets(walletAccess){
  
  return async function listWallets(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const wallets = await walletAccess.listWallets();
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          wallets
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
