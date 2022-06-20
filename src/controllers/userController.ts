const User = require('../models/userModel');
const { validateUser } = require('../utils');
import { IncomingMessage, ServerResponse, Server } from 'http';

const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
};
const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const user = await User.findOne(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
};
const addUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = '';
    req.on('data', (chank) => {
      body += chank;
    });
    req.on('end', async () => {
      try {
        const newUser = JSON.parse(body);

        const isValidData = validateUser(newUser);
        if (isValidData) {
          const createdUser = await User.add(newUser);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(createdUser));
        } else {
          throw new Error();
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User data is not correct' }));
      }
    });
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
};
//PUT api/users/:id
const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  try {
    const requiredUser = await User.findOne(id);
    if (!requiredUser) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User for update not found' }));
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
};
const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: String,
) => {
  try {
    const userForDelete = await User.findOne(id);
    if (!userForDelete) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await User.remove(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User with id ${id} removed` }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error' }));
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
