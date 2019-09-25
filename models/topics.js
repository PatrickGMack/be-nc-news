const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  console.log('Fetching topics...');
  return connection.select('*').from('topics');
};
