const connection = require('../db/connection');

exports.postCommentByArticleId = commentObj => {
  console.log('Posting comment by article ID...');
  commentObj.author = commentObj.username;
  if (!commentObj.author || !commentObj.body) {
    return Promise.reject({
      errorCode: 400,
      msg: 'ERROR: Missing elements!'
    });
  } else if (/\d/g.test(commentObj.author)) {
    return Promise.reject({
      errorCode: 400,
      msg: 'ERROR: Invalid elements!'
    });
  } else {
    delete commentObj.username;
    return connection
      .insert(commentObj)
      .into('comments')
      .returning('*');
  }
};

exports.fetchCommentsByArticleId = article_id => {
  console.log('Fetching comments by article ID...');
  return connection
    .select('*')
    .from('comments')
    .where({ article_id });
};
