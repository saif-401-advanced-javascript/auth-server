'use strict';
const base64 = require('base-64');
const userModel = require('../lib/models/users/user.model');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const basicAuth = req.headers.authorization.split(' ').pop();
    const [username, password] = await base64.decode(basicAuth).split(':');
    const record = await userModel.authenticate(username, password);
    if (typeof record != 'string') {
      const token = await userModel.generateToken(username);
      const userDb = await userModel.findUser(username);
      req.user = userDb[0];
      req.token = token;
      next();
    } else {
      next('Invalid User Name or password');
    }
  }
};
