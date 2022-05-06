// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const GameSession = require('../../../db/mongodb/models/game-session');
const serialize = require('./serializer');
const makeGameSession = require('../../../models/game-session/index').makeGameSession;
const makeUpdateGameSession = require('../../../models/game-session/index').makeUpdateGameSession;
const errorFormatter = require('./errorFormatter');
const walletAccess = require('../../wallet-db/index.js');
const { getNumberOfDays } = require('../../../utils/dateutils.js');


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

  const validUpdateGameSessionData = await makeUpdateGameSession(updateGameSessionInfo);

  // if error is not thrown, then we can update with updateGameSessionInfo in database
  return GameSession.findByIdAndUpdate(id, updateGameSessionInfo, { new: true }).then(async (data) => {
    const sessionData = serialize(data);

    // console.log(sessionData.updatedAt.toISOString());
    let splittedDate = sessionData.updatedAt.toISOString().split('-');
    let year = splittedDate[0];
    let month = splittedDate[1];
    let foundWallet = await walletAccess.findWalletBy({
      branchCode: 'chcGam',
      year: year
    });

    if(foundWallet.length !== 0) {
      await addGameSessionToWallet(sessionData, foundWallet[0], month, splittedDate[2]);
    } else {
      console.log("wallet not found!, creating new year wallet!");
      let newWallet = await walletAccess.addWallet({
        branchCode: 'chcGam',
        year: year,
        data: Array.from({length: getNumberOfDays(year, 12)}, (_, __) => 0),
        totalAmount: 0
      });

      await addGameSessionToWallet(sessionData, newWallet, month, splittedDate[2]);
    }

    return sessionData;
  }).catch(errorFormatter);
}

async function addGameSessionToWallet(session, wallet, month, day){
  let startIndex = getNumberOfDays(wallet.year, month-1) + parseInt(day) - 1;

  for(let i = startIndex; i < getNumberOfDays(wallet.year, new Date().getMonth() + 1); i++){
    if(session.paid)
      wallet.data[i] += parseInt(session.cost);
    else
      wallet.data[i] -= parseInt(session.cost);          
  }

  if(session.paid) {
    wallet.totalAmount += parseInt(session.cost);
  } else {
    wallet.totalAmount -= parseInt(session.cost);    
  }

  let updatedWallet = await walletAccess.updateWallet(wallet.id, wallet);
  console.log("wallet updated, with " + session.cost + " " + "Income from Gaming Session");    
}


async function deleteGameSession(id){
  let session = await findGameSessionById(id);

  if(session.paid) {
    let splittedDate = session.updatedAt.toISOString().split('-');
    let year = splittedDate[0];
    let month = splittedDate[1];
    let foundWallet = await walletAccess.findWalletBy({
      branchCode: 'chcGam',
      year: year
    });

    // reverse the paid for wallet balance
    session.paid = !session.paid;

    if(foundWallet.length !== 0) {
      await addGameSessionToWallet(session, foundWallet[0], month, splittedDate[2]);
    } else {
      console.log("wallet not found!, creating new year wallet!");
      let newWallet = await walletAccess.addWallet({
        branchCode: 'chcGam',
        year: year,
        data: Array.from({length: getNumberOfDays(year, 12)}, (_, __) => 0),
        totalAmount: 0
      });

      await addGameSessionToWallet(session, newWallet, month, splittedDate[2]);
    }
  }

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
