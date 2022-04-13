const { listUsers,
        findUserBy,
        findUserById,
        addUser,
        updateUser,
        deleteUser,
        dropUsers
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listUsers,
  findUserBy,
  findUserById, 
  addUser,
  updateUser,
  deleteUser, 
  dropUsers,
};
