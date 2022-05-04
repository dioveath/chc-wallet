
var buildMakeGameSession = function(gameSessionValidator){
  return async ({
    player,
    platform,
    game,
    inCharge,
    startTime,
    duration,
    cost,
    paid
  } = {}) => {

    var error = gameSessionValidator({
      player,
      platform,
      game,
      inCharge,
      startTime,
      duration,
      cost,
      paid
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getPlayer: () => player,
      getPlatform: () => platform,
      getGame: () => game,
      getInCharge: () => inCharge,
      getStartTime: () => startTime,
      getDuration: () => duration,
      getCost: () => cost,
      getPaid: () => paid
    });

  };

};


module.exports = buildMakeGameSession;
