'use strict';

const mongoose = require('mongoose');

const users = mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model('users', users);
