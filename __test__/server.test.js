'use strict';
const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');
require('dotenv').config();
const mockRequest = supergoose(server);
const byc = require('bcrypt');

describe('Server Test', () => {
  it('should save to the db if the it is a new user with encrypted password', async () => {
    const userObj = {
      username: 'saif',
      password: '12345',
    };
    mockRequest
      .post('/signup')
      .send(userObj)
      .then((data) => {
        let pass = data.body.data.hashedPass;
        expect(data.statusCode).toBe(201);
        expect(byc.compareSync(userObj.password, pass)).toBeTruthy();
      });
  });

  it('should response to 500 if the user who try to signin not in the DB', () => {
    const userObj = {
      username: 'saif',
      password: '12345',
    };
    mockRequest
      .post('/signin')
      .auth(userObj)
      .then((result) => {
        expect(result.statusCode).toBe(500);
        expect(result.text).toEqual('Invalid User Name or password');
      });
  });
});
