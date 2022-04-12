const { listBranches,
        findBranchBy,
        findBranchById,
        addBranch,
        updateBranch,
        deleteBranch,
        dropBranches
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listBranches,
  findBranchBy,
  findBranchById, 
  addBranch,
  updateBranch,
  deleteBranch, 
  dropBranches,
};
