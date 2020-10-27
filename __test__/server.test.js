'use strict';
const { server } = require('../lib/server');
const supergoose = require('@code-fellows/supergoose');

require('dotenv').config();
const mockRequest = supergoose(server);

describe('Server Test', () => {
  const userObj = {
    username: 'saif',
    password: '12345',
  };
  let token;
  it('should save to the db if the it is a new user with encrypted password', async (done) => {
    await mockRequest
      .post('/signup')
      .send(userObj)
      .then((result) => {
        expect(result.statusCode).toBe(201);
        expect(result.body.data.userName).toEqual(userObj.username);
        done();
      });
  });

  it('should response with 200 if the user was in teh db ', (done) => {
    mockRequest
      .post('/signin')
      .auth('saif:12345')
      .then((result) => {
        token = result.body.token;
        expect(result.body.token).not.toBeUndefined();
        expect(result.statusCode).toBe(200);
        done();
      });
  });

  it('should return the user if the token was send correctly', (done) => {
    mockRequest
      .get('/secret')
      .set({
        Authorization: `token ${token}`,
      })
      .then((result) => {
        expect(result.statusCode).toBe(200);
        expect(result.body.user).not.toBeUndefined();
        done();
      });
  });

  it('should return the user if the token was send correctly', (done) => {
    mockRequest
      .get('/secret')
      .set({
        Authorization: `token ${token}0000`,
      })
      .then((result) => {
        expect(result.statusCode).toBe(500);
        expect(result.body.user).toBeUndefined();
        done();
      });
  });

  it('should response to 500 if the user who try to signin not in the DB', (done) => {
    mockRequest
      .post('/signin')
      .auth('saif11:12341525')
      .then((result) => {
        expect(result.body.token).toBeUndefined();
        expect(result.statusCode).toBe(500);
        expect(result.text).toEqual('Invalid User Name or password');
        done();
      });
  });

  it('should Return all the users in the data base of get users was called', (done) => {
    mockRequest.get('/users').then((result) => {
      expect(result.body.count).not.toEqual(0);
      expect(result.body.results.length).not.toEqual(0);
      done();
    });
  });
});
