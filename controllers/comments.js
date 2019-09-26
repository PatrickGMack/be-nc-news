const {
  postCommentByArticleId,
  fetchCommentsByArticleId
} = require('../models/comments');

exports.sendPostedCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  comment.article_id = +req.params.article_id;
  postCommentByArticleId(comment)
    .then(([addedComment]) => {
      res.status(201).send({ addedComment });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  console.log(req.query);
  fetchCommentsByArticleId(articleId)
    .then(commentsArr => {
      res.status(200).send(commentsArr);
    })
    .catch(next);
};
