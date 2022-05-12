require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getUserByName } = require('../services/users');

const SECRET = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' }).trim();

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const { data } = jwt.verify(token, SECRET);
    const user = await getUserByName(data.name);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};
