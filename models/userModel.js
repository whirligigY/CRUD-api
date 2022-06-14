const users = require('../data/users.json');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

module.exports = { findAll };
