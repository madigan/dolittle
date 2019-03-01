const request = require('supertest');
const faker = require('faker');
const server = require('./server');

describe('Dolittle Server', () => {
    it('GET / redirects to the github page', done => {
        request(server)
            .get('/')
            .then(res => {
                expect(res.statusCode).toBe(307);
                done();
            });
    });

    it('POST /push and POST /pull let messages pass through', done => {
        let message = faker.lorem.paragraph();
        let topic = faker.random.uuid();

        request(server)
            .post('/push')
            .send({topic:topic, message:message})
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200);
                request(server)
                    .post('/pull')
                    .send({topic:topic})
                    .set('Accept', 'application/json')
                    .then(res => {
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toBeDefined();
                        expect(res.body.message).toBe(message);
                        done();
                    });
            });
    });
});