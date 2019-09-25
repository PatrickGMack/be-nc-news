const app = require('./app');

app.listen(3000, err => {
  if (err) throw err;
  console.log('Listening on port 3000...');
});
