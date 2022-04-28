const Router = require('express').Router;
const router = Router();

const branchesApi = require('./branches');
const walletApi = require('./wallet');
const transactionApi = require('./transaction.js');
const gameSessionApi = require('./game-session.js');
const userApi = require('./user.js');

const isAuthenticated = require('../../../middlewares/is-authenticated.js');

router.use('/branch', branchesApi);
router.use('/walletData', isAuthenticated(), walletApi);
router.use('/transactions', isAuthenticated(), transactionApi);
router.use('/game-session', isAuthenticated(), gameSessionApi);
router.use('/user', userApi);


module.exports = router;
