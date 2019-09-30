const connection = require('../db/connection');

exports.fetchUsersByUsername = username => {
  return connection
    .select('*')
    .where({ username })
    .from('users')
    .then(userArr => {
      if (!userArr[0]) {
        return Promise.reject({
          errorCode: 404,
          msg: 'ERROR: User not found!'
        });
      } else {
        return userArr;
      }
    });
};
