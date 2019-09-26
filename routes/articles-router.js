const articlesRouter = require('express').Router();
const {
  sendArticleByArticleId,
  sendPatchedArticleByArticleId
} = require('../controllers/articles');

articlesRouter.route('/:article_id').get(sendArticleByArticleId);
articlesRouter.route('/:article_id').patch(sendPatchedArticleByArticleId);

module.exports = articlesRouter;
