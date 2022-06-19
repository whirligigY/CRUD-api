"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let users = require('../../data/users.json');
const { v4: uuidv4 } = require('uuid');
const { writeData } = require('../utils');
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}
function findOne(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => String(user.id) === String(id));
        resolve(user);
    });
}
function add(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: uuidv4() }, user);
        users.push(newUser);
        writeData('./data/users.json', users);
        resolve(newUser);
    });
}
function update(updatedUser, id) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((user) => String(user.id) === String(id));
        users[index] = Object.assign({ id }, updatedUser);
        writeData('./data/users.json', users);
        resolve(users[index]);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        users = users.filter((user) => user.id !== id);
        writeData('./data/users.json', users);
        resolve(null);
    });
}
module.exports = { findAll, findOne, add, update, remove };
//# sourceMappingURL=userModel.js.map