const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

// register

async function register(login, password) {
  if (!password) {
    throw new Error('Password is empty');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
}

// login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  return { user, token };
}

// get users list

function getUsers() {
  return User.find();
}

// get roles list

function getRoles() {
  return [
    { roleId: ROLES.ADMIN, name: 'Admin' },
    { roleId: ROLES.MODERATOR, name: 'Moderator' },
    { roleId: ROLES.READER, name: 'Reader' },
  ];
}

// delete

async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

// edit (roles)

async function updateUser(id, roleId) {
  return User.findOneAndUpdate({ _id: id }, { $set: { roleId } }, { returnDocument: 'after' });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
