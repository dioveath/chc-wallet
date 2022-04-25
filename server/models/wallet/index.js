// Dependency Injections 
// - Schema 
// - validation library

const buildMakeWallet = require('./wallet');
const walletSchema = require('./wallet-schema').walletSchema;
const walletUpdateSchema = require('./wallet-schema').walletUpdateSchema;
const walletValidator = require('../validator/')(walletSchema);
const walletUpdateValidator = require('../validator/')(walletUpdateSchema);

const makeWallet = buildMakeWallet(walletValidator);
const makeUpdateWallet = buildMakeWallet(walletUpdateValidator);

module.exports =  {
  makeWallet,
  makeUpdateWallet
};
