'use strict';

const userModel = require('../lib/models/users/user.model');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid User');
  } else {
    const token = req.headers.authorization.split(' ').pop();
    userModel
      .authenticateToken(token)
      .then((validUser) => {
        req.user = validUser;
        next();
      })
      .catch(() => {
        next('Invalid User');
      });
  }
};
