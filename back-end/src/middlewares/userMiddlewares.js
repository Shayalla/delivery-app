const rescue = require('express-rescue');
const md5 = require('md5');
const { User } = require('../database/models');

const { getUserByEmail, getUserByName } = require('../services/users');

// Comments: Lista de erros
const errors = {
  passwordWrong: '"password" is wrong',
  passwordLength: '"password" must have at least 6 characters',
  nameLength: '"name" field must have at least 12 characters',
  emailFormat: '"email" must be a valid email',
};

const validatePassword = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (md5(password) !== user.password) {
    return res.status(400).json({ message: errors.passwordWrong });
  }

  next();
});

const validateUser = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;
  const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
  const minLength = 5;
  const maxLength = 11;
  const validName = name.length > maxLength;
  const validPassword = password.length > minLength;

  if (!validName) {
    return res.status(400).json({ message: errors.nameLength });
  }
  
  if (!validEmail) {
    return res.status(400).json({ message: errors.emailFormat });
  }

  if (!validPassword) {
    return res.status(400).json({ message: errors.passwordLength });
  }

  next();
});

const existsUser = rescue(async (req, res, next) => {
  const { name, email } = req.body;

  const findUserName = await getUserByName(name);
  if (findUserName) return res.status(409).json({ message: 'Nome já existe' });

  const findUserEmail = await getUserByEmail(email);
  if (findUserEmail) return res.status(409).json({ message: 'Email já existe' });

  return next();
});

module.exports = {
  validatePassword,
  validateUser,
  existsUser,
};