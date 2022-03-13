'use strict';
const supertest = require('supertest');
const { server } = require('../src/server');
const mockRequest = supertest(server);
describe('Server Test', () => {
    it('server is running', async () => {
        const response = await mockRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Home Route');
    });
    it('bad method', async () => {
        const response = await mockRequest.get('/randompathadfaf');
        expect(response.status).toEqual(404);
    });
});