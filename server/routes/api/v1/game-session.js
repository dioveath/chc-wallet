const Router = require('express').Router;

const router = Router();

const gameSessionController = require('../../../controllers/game-session');
const makeExpressCallback = require('./helpers/express-callback');

router.get('/', makeExpressCallback(gameSessionController.listGameSessions));
router.get('/:id', makeExpressCallback(gameSessionController.getGameSession));
router.post('/', makeExpressCallback(gameSessionController.createGameSession));
router.post('/:id', makeExpressCallback(gameSessionController.updateGameSession));
router.delete('/:id', makeExpressCallback(gameSessionController.deleteGameSession));

module.exports = router;
