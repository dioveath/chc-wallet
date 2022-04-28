module.exports = function makeUpdateUsser(gameSessionAccess){
  
  return async function updateGameSession(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const updatedGameSession = await gameSessionAccess.updateGameSession(httpRequest.params.id, httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          updatedGameSession
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
