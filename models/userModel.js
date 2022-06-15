const users = require('../data/users.json');

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

module.exports = { findAll, findOne };
