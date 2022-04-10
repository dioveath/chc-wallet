// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (transaction) => {
  return {
    "id": transaction._id,
    "source": transaction.source,
    "destination": transaction.destination,
    "remarks": transaction.remarks,
    "amount": transaction.amount,
    "transactionType": transaction.transactionType,
    "date": transaction.date,
    "branchId": transaction.branchId,
    "createdAt": transaction.createdAt,
    "updatedAt": transaction.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
