const articlesRouter = require('express').Router();
const { sendArticleByArticleId } = require('../controllers/articles');

articlesRouter.route('/:article_id').get(sendArticleByArticleId);

module.exports = articlesRouter;
