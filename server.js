const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/image', (req, res) => {
  console.log(req.query);
  proxy.web(req, res, { target: req.query.url }, function (err) {
    console.log(err);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});