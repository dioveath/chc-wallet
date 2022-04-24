// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (user) => {
  return {
    "id": user._id,
    "fullName": user.fullName,
    "password": user.password,
    "email": user.email,
    "phoneNumber": user.phoneNumber,
    "emailVerified": user.emailVerified,
    "branchId": user.branchId,
    "createdAt": user.createdAt,
    "updatedAt": user.updatedAt
  };
};


function serializer(data){
  if(!data) return null;
  if(Array.isArray(data))
    return data.map(_serializeSingle);
  return _serializeSingle(data);
}

module.exports = serializer;
