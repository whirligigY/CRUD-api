const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};
const addUser = async (req, res) => {
  try {
    let body = '';
    req.on('data', (chank) => {
      body += chank;
    });
    req.on('end', async () => {
      const createdUser = await User.add(JSON.parse(body));
      res.writeHeader(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(createdUser));
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
};
