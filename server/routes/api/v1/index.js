const Router = require('express').Router;
const router = Router();

// const branchesApi = require('./branches');
const walletApi = require('./wallet');
const transactionApi = require('./transaction.js');

// router.use('/branches', branchesApi);
router.use('/walletData', walletApi);
router.use('/transactions', transactionApi);


module.exports = router;
