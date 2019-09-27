const {
  postCommentByArticleId,
  fetchCommentsByArticleId,
  patchCommentByCommentId
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
  const orderBy = req.query.order;
  const sort_by = req.query.sort_by;
  const articleId = req.params.article_id;
  fetchCommentsByArticleId(articleId, sort_by, orderBy)
    .then(commentsArr => {
      res.status(200).send(commentsArr);
    })
    .catch(next);
};

exports.sendPatchedCommentByCommentId = () => {};
