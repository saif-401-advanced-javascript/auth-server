'use strict';
const express = require('express');
const { getAllUsers } = require('../lib/models/users/user.model');
const userModel = require('../lib/models/users/user.model');
const basicAuthMiddleware = require('../middleware/basicAuth.middleware');

const router = express.Router();

// Routes
router.post('/signup', createNewUser);
router.post('/signin', basicAuthMiddleware, signInUser);
router.get('/users', getAllUsersInDb);

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
    console.log(allUsers);
    res.status(200);
    res.json({
      count: allUsers.length,
      results: allUsers,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = router;
