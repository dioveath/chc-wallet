const Router = require('express').Router;
const router = Router();

const branchesApi = require('./branches');
const walletApi = require('./wallet');
const transactionApi = require('./transaction.js');
const userApi = require('./user.js');

router.use('/branch', branchesApi);
router.use('/walletData', walletApi);
router.use('/transactions', transactionApi);
router.use('/user', userApi);


module.exports = router;
