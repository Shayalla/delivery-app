const express = require('express');
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/tokenMiddleware');
const { deleteUser } = require('../services/users');

const administratorRouter = express.Router();

administratorRouter.delete('/manage', validateToken, rescue(async (req, res) => {
  const { id } = req.headers;
  const { role } = req.user;

  if (role === 'administrator') await deleteUser(id);
  return res.status(200).json({ message: 'Deletado com sucesso' });
}));

module.exports = { administratorRouter };
