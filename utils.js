const fs = require('fs');

const writeData = (path, info) => {
  fs.writeFileSync(path, JSON.stringify(info), 'utf8', (err) => {
    if (err) {
      console.log(`Err: ${err}`);
    }
  });

  // fs.unlink(path, (err) => {
  //   if (err) throw new Error('FS operation failed');
  // });
  // fs.writeFile(path, JSON.stringify(info), 'utf8', (err) => {
  //   if (err) {
  //     console.log(`Err: ${err}`);
  //   }
  // });
  // const stream = fs.createWriteStream(path, 'utf8');

  // stream.on('error', (err) => console.log(`Err: ${err}`));
  // stream.write(JSON.stringify(info));
  // stream.end();
};

module.exports = {
  writeData,
};
