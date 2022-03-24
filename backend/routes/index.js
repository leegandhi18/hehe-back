const express = require('express');
// const logger = require('../lib/logger');

const usersRouter = require('./users');
const ordersRouter = require('./orders');
const machinesRouter = require('./machines');
const itemsRouter = require('./items');
const emoHistoriesRouter = require('./emoHistories');
const machineHistoriesRouter = require('./machineHistories');
const managementsRouter = require('./managements');
const authsRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// logTest
/*
router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});
*/

router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/machines', machinesRouter);
router.use('/items', itemsRouter);
router.use('/emoHistories', emoHistoriesRouter);
router.use('/machineHistories', machineHistoriesRouter);
router.use('/managements', managementsRouter);
router.use('/auths', authsRouter);

module.exports = router;
