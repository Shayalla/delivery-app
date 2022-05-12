const express = require('express');
const rescue = require('express-rescue');
const { loginUser, getAllUser } = require('../services/users');

const userRouter = express.Router();

userRouter.post('/', rescue(async (req, res) => {
  const login = await loginUser(req.body);

  if (login.message) return res.status(404).json(login.message);
  return res.status(200).json(login);
}));

userRouter.get('/users', rescue(async (_req, res) => {
  const users = await getAllUser();
  res.status(200).json(users);
}));

module.exports = { userRouter };
