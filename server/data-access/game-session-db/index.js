const { listGameSessions,
        findGameSessionBy,
        findGameSessionById,
        addGameSession,
        updateGameSession,
        deleteGameSession,
        dropGameSessions
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listGameSessions,
  findGameSessionBy,
  findGameSessionById, 
  addGameSession,
  updateGameSession,
  deleteGameSession, 
  dropGameSessions,
};
