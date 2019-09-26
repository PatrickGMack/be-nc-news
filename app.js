const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {
  handle404s,
  handle500s,
  handleCustomErr,
  handlePsql404s,
  handlePsql400s
} = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handle404s);
app.use(handleCustomErr);
app.use(handlePsql400s);
app.use(handlePsql404s);
app.use(handle500s);

module.exports = app;
