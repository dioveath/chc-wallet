
// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (transaction) => {
  return {
    "id": transaction._id,
    "source": transaction.source,
    "destination": transaction.destination,
    "remarks": transaction.remarks,
    "amount": transaction.amount,
    "category": transaction.category,
    "transactionType": transaction.transactionType,
    "date": transaction.date,
    "doneBy": transaction.doneBy,
    "branchCode": transaction.branchCode,
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
