'use strict';

const express = require('express');
const app = express();
const middle404 = require('../middleware/404');
const middle500 = require('../middleware/500');
const apiRouter = require('../routes/routes');

app.use(express.json());

app.use('/', apiRouter);
app.use('*', middle404);
app.use(middle500);
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log('working', port);
    });
  },
};
