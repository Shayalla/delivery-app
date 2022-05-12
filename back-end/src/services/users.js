const md5 = require('md5');
const generateToken = require('../auth/generateToken');
const { User } = require('../database/models');

const getUserByEmail = async (email) => { 
  const user = await User.findOne({ where: { email } });
  return user;
};

const getUserByName = async (name) => {
  const user = await User.findOne({ where: { name } });
  return user;
};

const createUser = async ({ name, email, password, role }) => {
  const user = await User.create({ name, email, password, role });
  const token = generateToken(user.dataValues);
  return { name, email, token, role };
};

const loginUser = async ({ email, password }) => {
  const hashedPassword = md5(password);
  const user = await User.findOne({ where: { email, password: hashedPassword } });
  if (user === null) return { message: 'Usuário não encontrado' };

  const { id, name, role } = user.dataValues;
  const token = generateToken({ id, name, email, role });
  return { name, email, role, token };
};

const getAllUser = async () => {
  const users = await User.findAll();
  const filterUser = users.filter((user) => user.role !== 'administrator');
  return filterUser;
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
 getUserByEmail,
 getUserByName,
 getAllUser,
 createUser,
 deleteUser,
 loginUser,
};