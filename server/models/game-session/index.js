// Dependency Injections 
// - Schema 
// - validation library

const buildMakeGameSession = require('./game-session');
const gameSessionSchema = require('./game-session-schema').gameSessionSchema;
const gameSessionUpdateSchema = require('./game-session-schema').gameSessionUpdateSchema;
const gameSessionValidator = require('../validator/')(gameSessionSchema);
const gameSessionUpdateValidator = require('../validator/')(gameSessionUpdateSchema);



const makeGameSession = buildMakeGameSession(gameSessionValidator);
const makeUpdateGameSession = buildMakeGameSession(gameSessionUpdateValidator);

module.exports =  {
  makeGameSession,
  makeUpdateGameSession
};
