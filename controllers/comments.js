const { postCommentByArticleId } = require('../models/comments');

exports.sendPostedCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  comment.article_id = +req.params.article_id;
  postCommentByArticleId(comment)
    .then(([addedComment]) => {
      res.status(201).send({ addedComment });
    })
    .catch(next);
};
