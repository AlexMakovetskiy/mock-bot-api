const express = require('express');

const BotController = require('../controller/botController');

const router = express.Router();

router.get('/wakeup', BotController.wakeupAction);
router.options('/*', BotController.handleOptions);

module.exports = router;