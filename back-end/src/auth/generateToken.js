require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  return data;
}).trim();

const jwtConfiguration = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, SECRET, jwtConfiguration);

module.exports = generateToken;