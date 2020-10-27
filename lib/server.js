'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const middle404 = require('../middleware/404');
const middle500 = require('../middleware/500');
const apiRouter = require('../routes/routes');
const extraRouter = require('../routes/extra-routes');
app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', apiRouter);
app.use('/', extraRouter);
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
