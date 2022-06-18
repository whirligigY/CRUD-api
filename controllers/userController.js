const User = require('../models/userModel');
const { validateUser } = require('../utils');

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
      res.end(JSON.stringify({ message: 'User not found' }));
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
      const { username, age, hobbies } = JSON.parse(body);
      const newUser = { username, age, hobbies };
      const isValidData = validateUser(newUser);
      console.log('isValidData', isValidData);
      if (isValidData) {
        const createdUser = await User.add(JSON.parse(body));
        res.writeHeader(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdUser));
      } else {
        res.writeHeader(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User data is not correct' }));
      }
    });
  } catch (err) {
    console.log(err);
  }
};
//PUT api/users/:id
const updateUser = async (req, res, id) => {
  try {
    const requiredUser = await User.findOne(id);
    if (!requiredUser) {
      res.writeHeader(404, { 'Content-Type': 'application/json' });
      req.end(JSON.stringify({ message: 'User for update not found' }));
    } else {
      let body = '';
      req.on('data', (chank) => {
        body += chank;
      });
      req.on('end', async () => {
        const { username, age, hobbies } = JSON.parse(body);
        const updatedUser = {
          username: username || requiredUser.username,
          age: age || requiredUser.age,
          hobbies: hobbies || requiredUser.hobbies,
        };
        const user = await User.update(updatedUser, id);
        res.writeHeader(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (req, res, id) => {
  try {
    const userForDelete = User.findOne(id);
    if (!userForDelete) {
      res.writeHeader(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User for delete not found' }));
    } else {
      await User.remove(id);
      res.writeHeader(204, { 'Content-Type': 'application/json' });
      res.one(JSON.stringify({ message: `User with id ${id} removed` }));
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
