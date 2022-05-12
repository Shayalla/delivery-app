const express = require('express');
const rescue = require('express-rescue');
const md5 = require('md5');
const { createUser } = require('../services/users');
const { existsUser, validateUser } = require('../middlewares/userMiddlewares');
const { validateToken } = require('../middlewares/tokenMiddleware');

const registerRouter = express.Router();

registerRouter.post('/', existsUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
console.log('AQUIIIIIIIIIIII 44444');
  
  const newUser = await createUser({ name, email, password: md5(password), role: 'customer' });

  return res.status(201).json(newUser);
}));

registerRouter.post('/administrator',
  existsUser,
  validateUser,
  validateToken,
  rescue(async (req, res) => {
    const { name, email, password, role } = req.body;
    
    const newUser = await createUser({ name, email, password: md5(password), role });

  return res.status(201).json(newUser);
}));

module.exports = { registerRouter };
