exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'ERROR: Page not found!' });
};

exports.handlePsql400s = (err, req, res, next) => {
  const errCodes = ['42703'];
  if (errCodes.includes(err.code)) {
    res.status(400).send({ msg: 'ERROR: Bad request!' });
  } else next(err);
};

exports.handlePsql404s = (err, req, res, next) => {
  const errCodes = ['23503'];
  if (errCodes.includes(err.code)) {
    res.status(404).send({ msg: 'ERROR: Page not found!' });
  } else next(err);
};

exports.handleCustomErr = (err, req, res, next) => {
  if (err.errorCode) {
    const errorCode = err.errorCode;
    const errorMessage = err.msg;
    res.status(errorCode).send({ msg: errorMessage });
  } else next(err);
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'ERROR: Method not allowed!' });
};
exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'ERROR: Internal server error!' });
};
