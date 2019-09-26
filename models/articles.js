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
