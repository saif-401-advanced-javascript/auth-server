'use strict';

const express = require('express');
const bearerAuth = require('../middleware/bearer-auth');

const router = express.Router();

router.get('/secret', bearerAuth, (req, res) => {
  res.status(200);
  res.json({
    user: req.user,
    cookies: req.cookies,
  });
});

module.exports = router;
