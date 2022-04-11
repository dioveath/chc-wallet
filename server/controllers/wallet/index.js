const walletAccess = require('../../data-access/wallet-db/index');
const makeGetWallet = require('./get-wallet');
const makeListWallets = require('./list-wallet');

const getWallet = makeGetWallet(walletAccess);
const listWallets = makeListWallets(walletAccess);

const walletController = {
  getWallet,
  listWallets,
};

module.exports = walletController;
