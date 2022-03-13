'use strict';
process.env.SECRET = "BURGER" || process.env.SECRET
const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/models/index');
const mockRequest = supertest(server);
let users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('V2 Test', () => {
    Object.keys(users).forEach(userRole => {
        describe(`${userRole} users`, () => {
            it('create new record', async () => {
                const register = await mockRequest.post('/signup').send(users[userRole]);
                const token = register.body.token;
                const response = await mockRequest.post('/api/v2/movies').send({
                    "name": "rush hour",
                    "releaseDate": "xx/1996",
                    "genre": "comedy"
                }).set("Authorization", `Bearer ${token}`);
                if (userRole === 'user') {
                    expect(response.status).not.toBe(201);
                } else {
                    expect(response.status).toBe(201);
                }
            });
            it('get all records', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                await mockRequest.put('/api/v2/movies').send({
                    "name": "rush hour",
                    "releaseDate": "xx/1996",
                    "genre": "comedy"
                }).set('Authorization', `Bearer admin`);
                const response = await mockRequest.get('/api/v2/movies').set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(200);
            });
            it('get one record', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.get('/api/v2/movies/1').set('Authorization', `Bearer ${token}`);
             
                expect(response.status).toBe(200);
            });
            it('update record', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.put('/api/v2/movies/1').send({
                    "name": "rush hour",
                    "releaseDate": "xx/2000",
                    "genre": "comedy"
                }).set('Authorization', `Bearer ${token}`);
                if (users[userRole].role === 'user' || users[userRole].role === 'writer') {
                    expect(response.status).not.toBe(201);
                } else {
                    expect(response.status).toBe(201);
                }
            });
            if ('delete record', async () => {
                const register = await mockRequest.post('/signin').auth(users[userRole].username, users[userRole].password);
                const token = register.body.token;
                const response = await mockRequest.delete('/api/v2/movies/1').set('Authorization', `Bearer ${token}`);
                if (users[userRole].role === 'admin') {
                    expect(response.status).toBe(204);
                } else {
                    expect(response.status).not.toBe(204);
                }
            });
        });
    });
});