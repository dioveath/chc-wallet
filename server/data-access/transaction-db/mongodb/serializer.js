// serializes db model to business model
// for, e.g.- _id to id

const _serializeSingle = (transaction) => {
  return {
    "id": transaction._id,
    "first_name": transaction.first_name,
    "last_name": transaction.last_name,
    "password": transaction.password,
    "salt": transaction.salt,
    "gaming_name": transaction.gaming_name,
    "email": transaction.email,
    "phone_number": transaction.phone_number,
    "address": transaction.address,
    "dob": transaction.dob,
    "phone_verified": transaction.phone_verified,
    "email_verified": transaction.email_verified,
    "roles": transaction.roles,
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
