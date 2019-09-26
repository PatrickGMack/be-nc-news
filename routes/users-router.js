const usersRouter = require('express').Router();
const { sendUsersByUsername } = require('../controllers/users');
const { handle405s } = require('../errors/index');

usersRouter
  .route('/:username')
  .get(sendUsersByUsername)
  .all(handle405s);

module.exports = usersRouter;
