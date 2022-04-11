
// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (wallet) => {
  return {
    "branchId": wallet.branchId,
    "year": wallet.year,
    "month": wallet.month,
    "data": wallet.data,
    "createdAt": wallet.createdAt,
    "updatedAt": wallet.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
