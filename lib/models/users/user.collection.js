'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

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
    const token = jwt.sign({ username: user }, SECRET);
    return token;
  }

  async getAllUsers() {
    return await this.schema.find({});
  }
}

module.exports = UsersCollection;
