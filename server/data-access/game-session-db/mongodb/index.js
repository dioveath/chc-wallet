// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const GameSession = require('../../../db/mongodb/models/game-session');
const serialize = require('./serializer');
const makeGameSession = require('../../../models/game-session/index').makeGameSession;
const makeUpdateGameSession = require('../../../models/game-session/index').makeUpdateGameSession;
const errorFormatter = require('./errorFormatter');

function listGameSessions(httpQuery){
  const { query, ...paginateQuery } = httpQuery;

  let paginationParams = [
    JSON.parse(query ?? "{}"),
    paginateQuery ?? {}
  ];

  return GameSession.paginate(...paginationParams).then((result) => {
    const { docs, ...pagination } = result;
    return {
      pagination,
      gameSessions: serialize(docs)
    };
  }).catch(errorFormatter);
}

function findGameSessionBy(prop, val){
  if(prop === 'id') prop = '_id';
  return GameSession.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findGameSessionById(id){
  return GameSession.findById(id).then(serialize).catch(errorFormatter);
}

async function addGameSession(gameSessionInfo){
  var gameSession = await makeGameSession(gameSessionInfo);

  var newGameSession = {
    player: gameSession.getPlayer(),
    platform: gameSession.getPlatform(),
    game: gameSession.getGame(),
    inCharge: gameSession.getInCharge(),
    startTime: gameSession.getStartTime(),
    duration: gameSession.getDuration(),
    cost: gameSession.getCost(),
    paid: gameSession.getPaid()
  };

  return GameSession.create(newGameSession).then(serialize).catch(errorFormatter);
}

async function updateGameSession(id, updateGameSessionInfo){
  if(!id) 
    throw new Error("You must supply id!");

  // var gameSessionData = await GameSession.findById(id);  
  // if(gameSessionData === null) throw new Error("No GameSession with id: " + id);

  const validUpdateGameSessionData = await makeUpdateGameSession(updateGameSessionInfo);

  // if error is not thrown, then we can update with updateGameSessionInfo in database
  return GameSession.findByIdAndUpdate(id, updateGameSessionInfo, { new: true }).then(serialize).catch(errorFormatter);
}


async function deleteGameSession(id){
  return GameSession.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropGameSessions(){
  return GameSession.deleteMany().catch(errorFormatter);
}


module.exports = {
  listGameSessions,
  findGameSessionBy,
  findGameSessionById, 
  addGameSession,
  updateGameSession, 
  deleteGameSession, 
  dropGameSessions
};
