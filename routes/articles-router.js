const articlesRouter = require('express').Router();
const {
  sendArticleByArticleId,
  sendPatchedArticleByArticleId
} = require('../controllers/articles');
const { sendPostedCommentByArticleId } = require('../controllers/comments');
const { handle405s } = require('../errors/index');

articlesRouter
  .route('/:article_id')
  .get(sendArticleByArticleId)
  .patch(sendPatchedArticleByArticleId)
  .all(handle405s);

articlesRouter
  .route('/:article_id/comments')
  .post(sendPostedCommentByArticleId)
  .all(handle405s);

module.exports = articlesRouter;
