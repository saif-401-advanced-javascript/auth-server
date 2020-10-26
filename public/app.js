'use strict';
const URI = 'https://github.com/login/oauth/authorize';

const options = {
  client_id: 'e9ff9313ef0e36b8c1e8',
  scope: 'read:user',
  state: '401 app consent',
};

const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURI(options[key])}`;
  })
  .join('&');

console.log('query', queryString);

const oathURL = `${URI}?${queryString}`;
const linkTag = document.getElementById('oauth');
linkTag.setAttribute('href', oathURL);
