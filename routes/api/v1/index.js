const Router = require('express').Router;
const router = Router();

const branchesApi = require('./branches');
const walletApi = require('./wallet');
const transactionApi = require('./transaction.js');
const userApi = require('./user.js');

const isAuthenticated = require('../../../middlewares/is-authenticated.js');

router.use('/branch', branchesApi);
router.use('/walletData', isAuthenticated(), walletApi);
router.use('/transactions', isAuthenticated(), transactionApi);
router.use('/user', userApi);


module.exports = router;
