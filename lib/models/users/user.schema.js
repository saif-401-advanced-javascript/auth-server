'use strict';

const mongoose = require('mongoose');

const users = mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  role: {
    type: String,
    require: true,
    enum: ['user', 'writer', 'editor', 'admin'],
  },
});

module.exports = mongoose.model('users', users);
