const topicsRouter = require('express').Router();
const { sendAllTopics } = require('../controllers/topics');
const { handle405s } = require('../errors/index');

topicsRouter
  .route('/')
  .get(sendAllTopics)
  .all(handle405s);

module.exports = topicsRouter;
