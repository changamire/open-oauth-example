const express = require('express');
const sls_http = require('serverless-http');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/pi', (req, res) => {
  res.send(req.query.count ? pi(req.query.count) : pi(10000))
});

pi = (count) => {
  let inside = 0;

  for (let i = 0; i < count; i++) {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    if ((x * x + y * y) < 1) {
      inside++
    }
  }
  return (4.0 * inside / count).toString();
};

module.exports = app;
module.exports.handler = sls_http(app);