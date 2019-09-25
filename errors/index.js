exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'ERROR: Page not found!' });
};

exports.handleCustomErr = (err, req, res, next) => {
  const errorCode = err.errorCode;
  const errorMessage = err.msg;
  res.status(errorCode).send({ msg: errorMessage });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'ERROR: Internal server error!' });
};
