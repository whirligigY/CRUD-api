const http = require('http');
const { getUsers, getUser, addUser } = require('./controllers/userController');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const server = http.createServer((req, res) => {
  const reg_exp = /\/api\/users\/([0-9]+)/;
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url.match(reg_exp) && req.method === 'GET') {
    const userId = req.url.split('/')[3];
    getUser(req, res, userId);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    addUser(req, res);
  } else {
    res.writeHeader(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
