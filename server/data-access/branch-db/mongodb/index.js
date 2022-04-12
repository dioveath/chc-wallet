// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Branch = require('../../../db/mongodb/models/branch');
const serialize = require('./serializer');
const makeBranch = require('../../../models/branch/index').makeBranch;
const makeUpdateBranch = require('../../../models/branch/index').makeUpdateBranch;
const errorFormatter = require('./errorFormatter');


function listBranches(){
  return Branch.find({}).then(serialize).catch(errorFormatter);
}

function findBranchBy(prop, val){
  if(prop === 'id') prop = '_id';
  return Branch.find({[prop]: val}).then(res => serialize(res[0])).catch(errorFormatter);
}

function findBranchById(id){
  return Branch.findById(id).then(serialize).catch(errorFormatter);
}

async function addBranch(branchInfo){
  var branch = await makeBranch(branchInfo);

  var newBranch = {
    branchId: branch.getBranchId(),
    name: branch.getName(),
    admin: branch.getAdmin(),
    borderColor: branch.getBorderColor(),    
    backgroundColor: branch.getBackgroundColor(),
    roomRent: branch.getRoomRent(),
    internetBill: branch.getInternetBill(),
    waterBill: branch.getWaterBill()
  };

  return Branch.create(newBranch).then(serialize).catch(errorFormatter);
}


async function updateBranch(id, updateBranchInfo){
  if(!id) 
    throw new Error("You must supply id!");

  // var branchData = await Branch.findById(id);  
  // if(branchData === null) throw new Error("No Branch with id: " + id);

  const validUpdateBranchData = await makeUpdateBranch(updateBranchInfo);

  // if error is not thrown, then we can update with updateBranchInfo in database
  return Branch.findByIdAndUpdate(id, updateBranchInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteBranch(id){
  return Branch.findByIdAndDelete(id)
    .then(res => {
      if(!res)
        throw {
          name: 'Error',
          code: 11011, // custom error code
          _id: id, 
        };
      return {
        id: res._id.toString(),
      };
    }).catch(errorFormatter);
}


function dropBranches(){
  return Branch.deleteMany().catch(errorFormatter);
}


module.exports = {
  listBranches,
  findBranchBy,
  findBranchById, 
  addBranch,
  updateBranch, 
  deleteBranch, 
  dropBranches
};

