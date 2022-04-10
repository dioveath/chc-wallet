const Router = require('express').Router;

const router = Router();

const walletController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(walletController.listWallets));
router.get('/:id', makeExpressCallback(walletController.getWallet));
router.post('/', makeExpressCallback(walletController.createWallet));
router.post('/:id', makeExpressCallback(walletController.updateWallet));
router.delete('/:id', makeExpressCallback(walletController.deteteWallet));

module.exports = router;
