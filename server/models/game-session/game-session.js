
var buildMakeGameSession = function(gameSessionValidator){
  return async ({
    player,
    platform,
    inCharge,
    startTime,
    endTime,
    duration,
    cost,
    paid
  } = {}) => {

    var error = gameSessionValidator({
      player,
      platform,
      inCharge,
      startTime,
      endTime,
      duration,
      cost,
      paid
    });

    if(error instanceof Object) throw new Error(error.errorList);

    return Object.freeze({
      getPlayer: () => player,
      getPlatform: () => platform,
      getInCharge: () => inCharge,
      getStartTime: () => startTime,
      getEndTime: () => endTime,
      getDuration: () => duration,
      getCost: () => cost,
      getPaid: () => paid
    });

  };

};


module.exports = buildMakeGameSession;
