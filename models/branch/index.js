// Dependency Injections 
// - Schema 
// - validation library

const buildMakeBranch = require('./branch');
const branchSchema = require('./branch-schema').branchSchema;
const branchUpdateSchema = require('./branch-schema').branchUpdateSchema;
const branchValidator = require('../validator/')(branchSchema);
const branchUpdateValidator = require('../validator/')(branchUpdateSchema);

const makeBranch = buildMakeBranch(branchValidator);
const makeUpdateBranch = buildMakeBranch(branchUpdateValidator);

module.exports =  {
  makeBranch,
  makeUpdateBranch
};
