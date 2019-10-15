const {
  fetchArticleByArticleId,
  patchArticleByArticleId,
  fetchAllArticles
} = require('../models/articles');

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

exports.sendPatchedArticleByArticleId = (req, res, next) => {
  const artId = req.params.article_id;
  const votes = req.body.inc_votes;
  if (Object.keys(req.body).length > 1) {
    return next({
      errorCode: 400,
      msg: 'ERROR: Other properties not allowed!'
    });
  } else {
    patchArticleByArticleId(artId, votes)
      .then(([article]) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
};

exports.sendAllArticles = (req, res, next) => {
  const orderBy = req.query.order;
  const sort_by = req.query.sort_by;
  const author = req.query.author;
  const topic = req.query.topic;
  fetchAllArticles(orderBy, sort_by, author, topic)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
