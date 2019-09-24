const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      const topicInsertion = connection
        .insert(topicData)
        .into('topics')
        .returning('*');
      const userInsertion = connection
        .insert(userData)
        .into('users')
        .returning('*');
      return Promise.all([topicInsertion, userInsertion]);
    })
    .then(() => {
      const formatArticleData = formatDates(articleData);
      return connection
        .insert(formatArticleData)
        .into('articles')
        .returning('*');
    });
};
