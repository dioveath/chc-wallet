const { listWallets,
        findWalletBy,
        findWalletById,
        addWallet,
        updateWallet,
        deleteWallet,
        dropWallets
      } = require('./mongodb'); // Gateway to actual database, mongodb here

module.exports = {
  listWallets,
  findWalletBy,
  findWalletById, 
  addWallet,
  updateWallet,
  deleteWallet, 
  dropWallets,
};
