const connection = require('../db/connection');

exports.fetchArticleByArticleId = article_id => {
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
  if (!votes || !/\d/.test(votes)) {
    return Promise.reject({
      errorCode: 400,
      msg: 'ERROR: Invalid request!'
    });
  } else {
    return connection('articles')
      .count({ comment_count: 'comment_id' })
      .increment('votes', votes)
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .where('articles.article_id', '=', article_id)
      .returning('*');
  }
};

exports.fetchAllArticles = (
  order = 'desc',
  sort_by = 'created_at',
  author,
  topic
) => {
  if (order != 'asc' && order != 'desc') {
    return Promise.reject({
      errorCode: 400,
      msg: 'ERROR: Invalid order by!'
    });
  } else {
    return connection
      .select(
        'articles.author',
        'articles.title',
        'articles.article_id',
        'articles.topic',
        'articles.created_at',
        'articles.votes'
      )
      .count({ comment_count: 'comment_id' })
      .from('articles')
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .orderBy(sort_by, order)
      .modify(query => {
        if (author) {
          query.where('articles.author', '=', author);
        }
      })
      .then(articles => {
        if (author) {
          return connection
            .select('*')
            .from('users')
            .where('username', '=', author)
            .then(([author]) => {
              if (!author) {
                return Promise.reject({
                  errorCode: 400,
                  msg: 'ERROR: No such author!'
                });
              } else {
                return articles;
              }
            });
        }
        return articles;
      })
      .then(articles => {
        if (topic) {
          return connection
            .select('*')
            .from('topics')
            .where('slug', '=', topic)
            .then(([topic]) => {
              if (!topic) {
                return Promise.reject({
                  errorCode: 400,
                  msg: 'ERROR: No such topic!'
                });
              } else {
                return articles;
              }
            });
        }
        return articles;
      })
      .then(articles => {
        return articles.map(articles => {
          articles.comment_count = +articles.comment_count;
          return articles;
        });
      });
  }
};
