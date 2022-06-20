"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const writeData = (path, info) => {
    fs.writeFileSync(path, JSON.stringify(info), 'utf8', (err) => {
        if (err) {
            console.log(`Err: ${err}`);
        }
    });
};
const validateUser = (obj) => {
    let isValidData = false;
    const requiredFields = ['username', 'age', 'hobbies'];
    console.log('Object.keys(obj)', Object.keys(obj));
    isValidData = requiredFields.every((field) => field === Object.keys(obj).find((el) => el === field));
    return isValidData;
};
module.exports = {
    writeData,
    validateUser,
};
//# sourceMappingURL=utils.js.map