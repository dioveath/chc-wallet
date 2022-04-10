const branchAccess = require('../../data-access/branch-db/index');
const makeGetBranch = require('./get-branch');
const makeCreateBranch = require('./create-branch');
const makeDeleteBranch = require('./delete-branch');
const makeListBranchs = require('./list-branchs');
const makeUpdateBranch = require('./update-branch');

const getBranch = makeGetBranch(branchAccess);
const createBranch = makeCreateBranch(branchAccess);
const deleteBranch = makeDeleteBranch(branchAccess);
const listBranchs = makeListBranchs(branchAccess);
const updateBranch = makeUpdateBranch(branchAccess);

const branchController = {
  getBranch,
  createBranch,
  updateBranch, 
  deleteBranch,
  listBranchs,
};

module.exports = branchController;
