const commentsRouter = require('express').Router();
const { sendPatchedCommentByCommentId } = require('../controllers/comments');
const { handle405s } = require('../errors/index');
commentsRouter
  .route('/:comment_id')
  .patch(sendPatchedCommentByCommentId)
  .all(handle405s);

module.exports = commentsRouter;
