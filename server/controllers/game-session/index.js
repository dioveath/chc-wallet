const gameSessionAccess = require('../../data-access/game-session-db/index');
const makeGetGameSession = require('./get-gameSession');
const makeCreateGameSession = require('./create-gameSession');
const makeDeleteGameSession = require('./delete-gameSession');
const makeListGameSessions = require('./list-gameSessions');
const makeUpdateGameSession = require('./update-gameSession');

const getGameSession = makeGetGameSession(gameSessionAccess);
const createGameSession = makeCreateGameSession(gameSessionAccess);
const deleteGameSession = makeDeleteGameSession(gameSessionAccess);
const listGameSessions = makeListGameSessions(gameSessionAccess);
const updateGameSession = makeUpdateGameSession(gameSessionAccess);

const gameSessionController = {
  getGameSession,
  createGameSession,
  updateGameSession, 
  deleteGameSession,
  listGameSessions,
};

module.exports = gameSessionController;
