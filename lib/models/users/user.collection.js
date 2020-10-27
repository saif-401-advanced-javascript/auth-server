'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'secret';

class UsersCollection {
  constructor(schema) {
    this.schema = schema;
  }
  async create(user) {
    const isThere = await this.findUser(user.username);
    if (isThere.length > 0) {
      return isThere[0];
    } else {
      user.password = await this.hashPassword(user.password);
      const newUser = new this.schema(user);
      return newUser.save();
    }
  }

  async findUser(user) {
    return await this.schema.find({ username: user });
  }

  async authenticate(user, password) {
    try {
      const userDB = await this.findUser(user);
      return await bcrypt.compareSync(password, userDB[0].password);
    } catch (error) {
      return 'password/user Name is incorrect';
    }
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 5);
  }

  async generateToken(user) {
    const token = await jwt.sign({ username: user }, SECRET);
    return token;
  }

  async getAllUsers() {
    return await this.schema.find({});
  }

  async authenticateToken(token) {
    // token object is the username that stored in database
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      const userDb = await this.findUser(tokenObject.username);
      if (userDb.length > 0) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}

module.exports = UsersCollection;
