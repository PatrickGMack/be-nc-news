const { fetchArticleByArticleId } = require('../models/articles');

exports.sendArticleByArticleId = (req, res, next) => {
  const artId = req.params.article_id;
  if (!/\d/g.test(artId)) {
    return next({
      errorCode: 400,
      msg: 'ERROR: Invalid article ID!'
    });
  } else {
    fetchArticleByArticleId(artId)
      .then(([article]) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
};
