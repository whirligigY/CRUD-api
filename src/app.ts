const { createServer, IncomingMessage, ServerResponse } = require('http');
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require('./controllers/userController');

require('dotenv').config();

const server = createServer((req: any, res: any) => {
  const reg_exp =
    /\/api\/users\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/g;
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url.match(reg_exp) && req.method === 'GET') {
    const userId = req.url.split('/')[3];
    getUser(req, res, userId);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    addUser(req, res);
  } else if (req.url.match(reg_exp) && req.method === 'PUT') {
    const userId = req.url.split('/')[3];
    updateUser(req, res, userId);
  } else if (req.url.match(reg_exp) && req.method === 'DELETE') {
    const userId = req.url.split('/')[3];
    deleteUser(req, res, userId);
  } else if (
    req.url.match(/\/api\/users\/+/) &&
    (req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT')
  ) {
    if (!req.url.match(reg_exp)) {
      res.writeHeader(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID' }));
    }
  } else {
    res.writeHeader(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
