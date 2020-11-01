'use strict';

const superagent = require('superagent');
const userModel = require('../lib/models/users/user.model');
require('dotenv').config();

const TOKEN_SERVER = process.env.TOKEN_SERVER;
const REMOTE_API = process.env.REMOTE_API;
const CLIENT_ID = process.env.ClIENT_ID;
const CLIENT_SECRET = process.env.ClIENT_SECRETE;
const API_SERVER = process.env.API_SERVER;

module.exports = async (req, res, next) => {
  try {
    const code = req.query.code;
    const accessToken = await generateToken(code);
    const remoteUser = await getUserInfo(accessToken);
    const [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(`Something Wrong Happened`);
  }

  async function generateToken(code) {
    const tokenResponse = await superagent.post(TOKEN_SERVER).send({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code',
    });
    return tokenResponse.body.access_token;
  }

  async function getUserInfo(token) {
    const userResponse = await superagent
      .get(REMOTE_API)
      .set('Authorization', `token ${token}`)
      .set('user-agent', 'express-app');

    return userResponse.body;
  }

  async function getUser(remoteUser) {
    const record = {
      username: remoteUser.login,
      password: 'oauthpassword', // this can be anything
    };
    const user = await userModel.create(record);
    const token = await userModel.generateToken(user);

    return [user, token];
  }
};
