const connection = require('../db/connection');

exports.fetchArticleByArticleId = article_id => {
  console.log('Fetching articles by ID...');
  return connection
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', '=', article_id)
    .then(article => {
      if (!article[0]) {
        return Promise.reject({
          errorCode: 404,
          msg: 'ERROR: Article not found!'
        });
      } else {
        return article;
      }
    });
};

exports.patchArticleByArticleId = (article_id, votes) => {
  console.log('Patching article by article ID...');
  if (!votes || !/\d/.test(votes)) {
    return Promise.reject({
      errorCode: 400,
      msg: 'ERROR: Invalid request!'
    });
  } else {
    return connection
      .select('articles.*')
      .count({ comment_count: 'comment_id' })
      .from('articles')
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .where('articles.article_id', '=', article_id)
      .then(article => {
        article[0].votes += votes;
        return article;
      });
  }
};

exports.fetchAllArticles = () => {};
