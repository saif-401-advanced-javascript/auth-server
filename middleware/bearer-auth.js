'use strict';

const userModel = require('../lib/models/users/user.model');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid User');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    userModel
      .authenticateToken(token)
      .then(async (validUser) => {
        let newToken = await userModel.generateToken(validUser);
        req.cookies = newToken;
        req.user = validUser;
        next();
      })
      .catch(() => {
        next('Invalid User');
      });
  }
};
