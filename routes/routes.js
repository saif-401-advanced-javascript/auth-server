'use strict';
const express = require('express');
const userModel = require('../lib/models/users/user.model');
const basicAuthMiddleware = require('../middleware/basicAuth.middleware');
const oauth = require('../middleware/oauth');

const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.render('../index.html');
});
router.post('/signup', createNewUser);
router.post('/signin', basicAuthMiddleware, signInUser);
router.get('/users', getAllUsersInDb);
router.get('/oauth', oauth, oauthUser);

// Functions
async function createNewUser(req, res, next) {
  try {
    const newUser = await userModel.create(req.body);
    if (typeof newUser === 'string') {
      res.json({ newUser });
    } else {
      res.status(201);
      res.json({
        message: 'you added this user',
        data: {
          userName: newUser.username,
          hashedPass: newUser.password,
        },
      });
    }
  } catch (error) {
    next(error.message);
  }
}

async function signInUser(req, res, next) {
  res.status(200);
  res.json({
    token: req.token,
    user: req.user,
  });
}

async function getAllUsersInDb(req, res, next) {
  try {
    const allUsers = await userModel.getAllUsers();
    res.status(200);
    res.json({
      count: allUsers.length,
      results: allUsers,
    });
  } catch (error) {
    next(error);
  }
}

async function oauthUser(req, res, next) {
  res.status(201);
  res.json({
    result: req.user.username,
    token: req.token,
  });
}
module.exports = router;
