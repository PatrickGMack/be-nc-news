const commentsRouter = require('express').Router();
const {
  sendPatchedCommentByCommentId,
  deleteCommentsByCommentId
} = require('../controllers/comments');
const { handle405s } = require('../errors/index');
commentsRouter
  .route('/:comment_id')
  .patch(sendPatchedCommentByCommentId)
  .delete(deleteCommentsByCommentId)
  .all(handle405s);

module.exports = commentsRouter;
