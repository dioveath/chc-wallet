module.exports = function makeGetGameSession(gameSessionAccess) {
  return async function getGameSession(httpRequest){ // Custom Httprequest (Made from express default requests)
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const gameSession = await gameSessionAccess.findGameSessionById(httpRequest.params.id);

      if(gameSession == null) {
        throw new Error("No GameSession with id: " + httpRequest.params.id);
      }

      return { // this is response model
        headers,
        statusCode: 200,
        body: {
          status: 'success', 
          gameSession
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
