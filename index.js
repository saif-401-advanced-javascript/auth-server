'use strict';

require('dotenv').config();
const server = require('./lib/server');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => server.start(PORT))
  .catch((error) => console.error(error.message));
