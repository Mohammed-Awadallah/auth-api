'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRouter = require('./routes/auth');
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  try {
    res.status(200).send('Home Route');
  } catch (e) {
    console.error;
  }
});
app.use(authRouter);
app.use('/api/v1', v1);
app.use('/api/v2', v2);
app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};

