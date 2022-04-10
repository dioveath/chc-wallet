const Router = require('express').Router;

const router = Router();

const branchController = require('../../../controllers/user');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(branchController.listBranches));
router.get('/:id', makeExpressCallback(branchController.getBranch));
router.post('/', makeExpressCallback(branchController.createBranch));
router.post('/:id', makeExpressCallback(branchController.updateBranch));
router.delete('/:id', makeExpressCallback(branchController.deteteBranch));

module.exports = router;
