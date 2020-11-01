'use strict';

const express = require('express');
const acl = require('../middleware/acl');
const bearerAuth = require('../middleware/bearer-auth');

const router = express.Router();

router.get('/secret', bearerAuth, (req, res) => {
  res.status(200);
  res.json({
    user: req.user,
    cookies: req.cookies,
  });
});

router.get('/read', bearerAuth, acl('read'), (req, res) => {
  res.send('Route /read worked');
});
router.post('/add', bearerAuth, acl('create'), (req, res) => {
  res.send('Route /create worked');
});
router.put('/change', bearerAuth, acl('update'), (req, res) => {
  res.send('Route /update worked');
});

router.delete('/remove', bearerAuth, acl('delete'), (req, res) => {
  res.send('Route /delete worked');
});

module.exports = router;
