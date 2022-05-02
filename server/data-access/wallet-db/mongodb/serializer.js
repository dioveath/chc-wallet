
// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (wallet) => {
  return {
    "id": wallet._id,    
    "branchCode": wallet.branchCode,
    "year": wallet.year,
    "data": wallet.data,
    "totalAmount": wallet.totalAmount,
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
