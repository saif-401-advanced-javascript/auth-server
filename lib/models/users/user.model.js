'use strict';

const userSchema = require('./user.schema');
const UsersCollection = require('./user.collection');

class Users extends UsersCollection {
  constructor() {
    super(userSchema);
  }
}

module.exports = new Users();
