'use strict';

const express = require('express');
const userModel = require('../lib/models/users/user.model');
const bearerAuth = require('../middleware/bearer-auth');

const router = express.Router();

router.get('/secret', bearerAuth, (req, res) => {
  res.status(200);
  res.json({
    user: req.user,
  });
});

module.exports = router;
