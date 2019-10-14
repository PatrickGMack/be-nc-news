const { fetchUsersByUsername } = require('../models/users');

exports.sendUsersByUsername = (req, res, next) => {
  const username = req.params.username;
  if (!/[A-Z]{2,}\d*/i.test(username)) {
    return next({
      errorCode: 400,
      msg: 'ERROR: Invalid username!'
    });
  } else {
    fetchUsersByUsername(username)
      .then(([user]) => {
        res.status(200).send({ user });
      })
      .catch(next);
  }
};
