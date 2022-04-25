const Router = require('express').Router;

const router = Router();

const transactionController = require('../../../controllers/transaction');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(transactionController.listTransactions));
router.get('/:id', makeExpressCallback(transactionController.getTransaction));
router.post('/', makeExpressCallback(transactionController.createTransaction));
router.post('/:id', makeExpressCallback(transactionController.updateTransaction));
router.delete('/:id', makeExpressCallback(transactionController.deleteTransaction));

module.exports = router;
