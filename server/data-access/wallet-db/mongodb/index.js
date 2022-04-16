// uses mongoose implementation of findUser, listUsers, dropAll, etc.
// Gateway  -- Implementation
// Data-Access and Use-Cases as well

const Wallet = require('../../../db/mongodb/models/wallet');
const serialize = require('./serializer');
const makeWallet = require('../../../models/wallet/index').makeWallet;
const makeUpdateWallet = require('../../../models/wallet/index').makeUpdateWallet;
const errorFormatter = require('./errorFormatter');

function listWallets(){
  return Wallet.find({}).then(serialize).catch(errorFormatter);
}

function findWalletBy(props){
  console.log(props);
  // if(prop === 'id') prop = '_id';
  return Wallet.find(props).then(res => serialize(res[0])).catch(errorFormatter);
}

function findWalletById(id){
  return Wallet.findById(id).then(serialize).catch(errorFormatter);
}

async function addWallet(walletInfo){
  // defaults
  console.log(walletInfo);
  var wallet = await makeWallet(walletInfo);

  var newWallet = {
    branchId: wallet.getBranchId(),
    year: wallet.getYear(),
    month: wallet.getMonth(),
    data: wallet.getData(),
    totalAmount: wallet.getTotalAmount()
  };

  return Wallet.create(newWallet).then(serialize).catch(errorFormatter);
}


async function updateWallet(id, updateWalletInfo){
  if(!id) 
    throw new Error("You must supply id!");

  // var walletData = await Wallet.findById(id);  
  // if(walletData === null) throw new Error("No Wallet with id: " + id);

  const validUpdateWalletData = await makeUpdateWallet(updateWalletInfo);

  // if error is not thrown, then we can update with updateWalletInfo in database
  return Wallet.findByIdAndUpdate(id, updateWalletInfo, { new: true }).then(serialize).catch(errorFormatter);
}


function deleteWallet(id){
  return Wallet.findByIdAndDelete(id)
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


function dropWallets(){
  return Wallet.deleteMany().catch(errorFormatter);
}


module.exports = {
  listWallets,
  findWalletBy,
  findWalletById, 
  addWallet,
  updateWallet, 
  deleteWallet, 
  dropWallets
};
