module.exports = function makeListGameSessions(gameSessionAccess){
  
  return async function listGameSessions(httpRequest){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const { pagination, gameSessions } = await gameSessionAccess.listGameSessions(httpRequest.query);
      return {
        headers,
        statusCode: 200,
        body: {
          status: 'success',
          pagination,
          gameSessions
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

}
