const express = require('express');
const bodyParser = require('body-parser');
const { getProfileMiddleware } = require('./middleware');
const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(getProfileMiddleware);
app.use(router);

module.exports = app;
