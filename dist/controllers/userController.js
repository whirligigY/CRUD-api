"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/userModel');
const { validateUser } = require('../utils');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    catch (err) {
        console.log(err);
    }
});
const getUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne(id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    }
    catch (err) {
        console.log(err);
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = '';
        req.on('data', (chank) => {
            body += chank;
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const { username, age, hobbies } = JSON.parse(body);
            const newUser = { username, age, hobbies };
            const isValidData = validateUser(newUser);
            if (isValidData) {
                const createdUser = yield User.add(JSON.parse(body));
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(createdUser));
            }
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User data is not correct' }));
            }
        }));
    }
    catch (err) {
        console.log(err);
    }
});
//PUT api/users/:id
const updateUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredUser = yield User.findOne(id);
        if (!requiredUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User for update not found' }));
        }
        else {
            let body = '';
            req.on('data', (chank) => {
                body += chank;
            });
            req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                const { username, age, hobbies } = JSON.parse(body);
                const updatedUser = {
                    username: username || requiredUser.username,
                    age: age || requiredUser.age,
                    hobbies: hobbies || requiredUser.hobbies,
                };
                const user = yield User.update(updatedUser, id);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            }));
        }
    }
    catch (err) {
        console.log(err);
    }
});
const deleteUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userForDelete = yield User.findOne(id);
        if (!userForDelete) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
        else {
            yield User.remove(id);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with id ${id} removed` }));
        }
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=userController.js.map