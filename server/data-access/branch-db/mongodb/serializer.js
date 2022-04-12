
// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (branch) => {
  return {
    "id": branch._id,
    "branchId": branch.branchId,
    "name": branch.name,
    "admin": branch.admin,
    "borderColor": branch.borderColor,
    "backgroundColor": branch.backgroundColor,
    "roomRent": branch.roomRent,
    "internetBill": branch.internetBill,
    "waterBill": branch.waterBill,
    "createdAt": branch.createdAt,
    "updatedAt": branch.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
