let users = require('../../data/users.json');
const { v4: uuidv4 } = require('uuid');
const { writeData } = require('../utils');
import User = require('../interfaces');

function findAll() {
  return new Promise((resolve, reject) => {
    try {
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
}
function findOne(id: string) {
  return new Promise((resolve, reject) => {
    try {
      const user = users.find((user: User) => String(user.id) === String(id));
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
}
function add(user: User) {
  return new Promise((resolve, reject) => {
    try {
      const newUser = { id: uuidv4(), ...user };
      users.push(newUser);
      writeData('./data/users.json', users);
      resolve(newUser);
    } catch (err) {
      reject(err);
    }
  });
}

function update(updatedUser: User, id: string) {
  return new Promise((resolve, reject) => {
    try {
      const index = users.findIndex(
        (user: User) => String(user.id) === String(id),
      );
      users[index] = { id, ...updatedUser };
      writeData('./data/users.json', users);

      resolve(users[index]);
    } catch (err) {
      reject(err);
    }
  });
}

function remove(id: string) {
  return new Promise((resolve, reject) => {
    try {
      users = users.filter((user: User) => user.id !== id);
      writeData('./data/users.json', users);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { findAll, findOne, add, update, remove };
