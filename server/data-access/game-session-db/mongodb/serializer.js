
// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (gameSession) => {
  return {
    "id": gameSession._id,
    "player": gameSession.player,
    "platform": gameSession.platform,
    "game": gameSession.game,
    "inCharge": gameSession.inCharge,
    "startTime": gameSession.startTime,
    "duration": gameSession.duration,
    "cost": gameSession.cost,
    "paid": gameSession.paid,
    "createdAt": gameSession.createdAt,
    "updatedAt": gameSession.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
