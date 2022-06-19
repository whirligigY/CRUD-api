const fs = require('fs');
import User = require('./interfaces');

const writeData = (path: string, info: User) => {
  fs.writeFileSync(path, JSON.stringify(info), 'utf8', (err: Error) => {
    if (err) {
      console.log(`Err: ${err}`);
    }
  });
};
const validateUser = (obj: User) => {
  let isValidData = false;
  const requiredFields = ['username', 'age', 'hobbies'];
  isValidData = requiredFields.every(
    (field) => field === Object.keys(obj).find((el) => el === field),
  );

  return isValidData;
};

module.exports = {
  writeData,
  validateUser,
};
