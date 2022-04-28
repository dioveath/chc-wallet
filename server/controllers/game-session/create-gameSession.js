module.exports = function makeCreateGameSession(gameSessionAccess){

    return async function createGameSession(httpRequest){
        const headers = { 
            'Content-Type': 'application/json'
        };
        try { 
          console.log("reqBody: " + httpRequest.body);
          const newGameSession = await gameSessionAccess.addGameSession(httpRequest.body);
          return {
            headers,
            statusCode: 200,
            body: {
              status: 'success',
              newGameSession
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
