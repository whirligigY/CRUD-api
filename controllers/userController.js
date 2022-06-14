const User = require('../models/userModel');

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getUsers,
};
