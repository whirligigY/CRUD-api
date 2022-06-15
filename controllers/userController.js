const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};
const getUser = async (req, res, id) => {
  try {
    const user = await User.findOne(id);
    if (!user) {
      res.writeHeader(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      res.writeHeader(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (e) {}
};

module.exports = {
  getUsers,
  getUser,
};
