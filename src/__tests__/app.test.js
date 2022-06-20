//const {expect}  = require("@jest/globals")
const { agent } = require('supertest');
const request = require('supertest');
const server = require('../app');

describe('first', () => {
  const agent = request.agent(server);
  let id = '';
  it('should return empty users array', async () => {
    const result = await agent.get('/api/users');
    expect(result.body).toEqual([]);
    expect(result.statusCode).toBe(200);
  });
  it('should return created user', async () => {
    const newUser = {
      username: 'Ivan',
      age: 22,
      hobbies: ['skiing'],
    };
    const result = await agent.post('/api/users').send(newUser);
    id = result.body.id;
    expect(result.statusCode).toBe(201);
    expect(result.body.username).toBe('Ivan');
    expect(result.body.age).toBe(22);
    expect(result.body.hobbies).toEqual(['skiing']);
    expect(result.body.id).toBe(id);
  });
  it('should return user by Id', async () => {
    const result = await agent.get(`/api/users/${id}`);
    expect(result.statusCode).toBe(200);
    expect(result.body.username).toBe('Ivan');
    expect(result.body.age).toBe(22);
    expect(result.body.hobbies).toEqual(['skiing']);
    expect(result.body.id).toBe(id);
  });
  it('should return updated user by Id', async () => {
    const updatedUser = {
      username: 'Ivan',
      age: 27,
      hobbies: ['skiing', 'drawing'],
    };
    const result = await agent.put(`/api/users/${id}`).send(updatedUser);
    expect(result.statusCode).toBe(200);
    expect(result.body.age).toBe(27);
    expect(result.body.hobbies).toEqual(['skiing', 'drawing']);
  });
  it('should delete user by Id', async () => {
    const result = await agent.delete(`/api/users/${id}`);
    expect(result.statusCode).toBe(204);
  });
  it('should answer user not found', async () => {
    const result = await agent.get(`/api/users/${id}`);
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe('User not found');
  });
});

describe('second', () => {
  const agent = request.agent(server);
  let id = '';

  it('should return created user', async () => {
    const newUser = {
      username: 'Maxim',
      age: 35,
      hobbies: ['cooking'],
    };
    const result = await agent.post('/api/users').send(newUser);
    id = result.body.id;
    expect(result.statusCode).toBe(201);
    expect(result.body.username).toBe('Maxim');
    expect(result.body.age).toBe(35);
    expect(result.body.hobbies).toEqual(['cooking']);
  });

  it('should answer user invalid Id', async () => {
    const result = await agent.get(`/api/users/${22}`);
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe('Invalid ID');
  });
  it('should return user by Id', async () => {
    const result = await agent.get(`/api/users/${id}`);
    expect(result.statusCode).toBe(200);
    expect(result.body.username).toBe('Maxim');
    expect(result.body.age).toBe(35);
    expect(result.body.hobbies).toEqual(['cooking']);
  });
  it('should delete user by Id', async () => {
    const result = await agent.delete(`/api/users/${id}`);
    expect(result.statusCode).toBe(204);
  });
  it('should answer user not found', async () => {
    const result = await agent.delete(`/api/users/${id}`);
    expect(result.statusCode).toBe(404);
  });
});

describe('third', () => {
  const agent = request.agent(server);
  let id = '';
  it('should answer user invalid Id', async () => {
    const updatedUser = {
      username: 'Maxim',
      age: 35,
      hobbies: ['cooking'],
    };
    const result = await agent.put(`/api/users/${id}`).send(updatedUser);
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe('Invalid ID');
  });
  it('should answer user invalid Id', async () => {
    const result = await agent.delete(`/api/users/${id}`);
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe('Invalid ID');
  });
  it('should answer user invalid Id', async () => {
    const result = await agent.get(`/api/users/${id}`);
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe('Invalid ID');
  });
  it('should return created user', async () => {
    const newUser = {
      username: 'Maxim',
      age: 37,
      hobbies: [],
    };
    const result = await agent.post('/api/users').send(newUser);
    id = result.body.id;
    expect(result.statusCode).toBe(201);
    expect(result.body.username).toBe('Maxim');
    expect(result.body.age).toBe(37);
    expect(result.body.hobbies).toEqual([]);
    expect(result.body.id).toBe(id);
  });
  it('should return real user Id', async () => {
    const updatedUser = {
      username: 'Maxim',
      age: 35,
      id: 123,
    };
    const result = await agent.put(`/api/users/${id}`).send(updatedUser);
    expect(result.statusCode).toBe(200);
    expect(result.body.id).toBe(result.body.id);
    expect(result.body.age).toBe(35);
  });
  it('should delete user by Id', async () => {
    const result = await agent.delete(`/api/users/${id}`);
    expect(result.statusCode).toBe(204);
  });
});
