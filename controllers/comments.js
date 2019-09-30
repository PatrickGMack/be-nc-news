const {
  postCommentByArticleId,
  fetchCommentsByArticleId,
  patchCommentByCommentId,
  removeCommentByCommentId
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

exports.sendPatchedCommentByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;
  const votes = req.body.inc_votes;
  if (Object.keys(req.body).length > 1) {
    return next({
      errorCode: 400,
      msg: 'ERROR: Other properties not allowed!'
    });
  } else {
    patchCommentByCommentId(commentId, votes)
      .then(([comment]) => {
        res.status(200).send({ comment });
      })
      .catch(next);
  }
};

exports.deleteCommentsByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;
  removeCommentByCommentId(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
