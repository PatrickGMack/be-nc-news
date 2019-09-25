const usersRouter = require('express').Router();
const { sendUsersByUsername } = require('../controllers/users');

usersRouter.route('/:username').get(sendUsersByUsername);

module.exports = usersRouter;
