const commentsRouter = require('express').Router();
const { sendPatchedCommentByCommentId } = require('../controllers/comments');

commentsRouter.route('/:comment_id').patch(sendPatchedCommentByCommentId);

module.exports = commentsRouter;
