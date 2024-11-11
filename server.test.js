const request = require('supertest');
const app = require('./server');  // Adjust the path if necessary

let server;

beforeAll(() => {
    // Start the server before running tests
    server = app.listen(3000);
});

afterAll((done) => {
    // Close the server after tests to prevent open handles
    server.close(done);
});

describe('Weather API', () => {
    it('should return weather data for a valid city', async () => {
        const response = await request(app).get('/weather?city=London');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'London');
        expect(response.body.main).toHaveProperty('temp');
    });

    it('should return an error for an invalid city', async () => {
        const response = await request(app).get('/weather?city=InvalidCity');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error', 'City not found');
    });
});

