'use strict';
const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/models/index');
const mockRequest = supertest(server);
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});
describe('Test v1 route', () => {
    it('add new record ', async () => {
        const response = await mockRequest.post('/api/v1/music').send({
            "artist": "tamta",
            "songName": "senorita",
            "genre": "rap"
        });
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
    });

    it('get all records', async () => {
        const response = await mockRequest.get('/api/v1/music');
        console.log("1111111111",response.status);
        expect(response.status).toBe(200);
    });

    it('get one record', async () => {
        const response = await mockRequest.get('/api/v1/music/1');
        expect(response.status).toBe(200);
    });
    it('updated record', async () => {
        const response = await mockRequest.put('/api/v1/music/1').send({
            "artist": "tamta",
            "songName": "ballahenna",
            "genre": "rap"
        });
        expect(response.status).toBe(201);
    });
    it('delete record ', async () => {
        const response = await mockRequest.delete('/api/v1/music/1');
        expect(response.status).toBe(204);
    });
});