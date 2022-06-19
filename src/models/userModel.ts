let users = require('../../data/users.json');
const { v4: uuidv4 } = require('uuid');
const { writeData } = require('../utils');
import User = require('../interfaces');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}
function findOne(id: string) {
  return new Promise((resolve, reject) => {
    const user = users.find((user: User) => String(user.id) === String(id));
    resolve(user);
  });
}
function add(user: User) {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeData('./data/users.json', users);
    resolve(newUser);
  });
}
function update(updatedUser: User, id: string) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex(
      (user: User) => String(user.id) === String(id),
    );
    users[index] = { id, ...updatedUser };
    writeData('./data/users.json', users);

    resolve(users[index]);
  });
}
function remove(id: string) {
  return new Promise((resolve, reject) => {
    users = users.filter((user: User) => user.id !== id);
    writeData('./data/users.json', users);
    resolve(null);
  });
}

module.exports = { findAll, findOne, add, update, remove };
