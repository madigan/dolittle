const Dolittle = require('./Dolittle');
const faker = require('faker');

describe('Dolittle', () => {
    let dolittle;

    beforeEach( () => {
        dolittle = new Dolittle();
    });

    it('defaults the topic limit to 50', () => {
        expect( dolittle.TOPIC_LIMIT ).toBe(50);
    });
    it('defaults topic length limit to 1000', () => {
        expect( dolittle.TOPIC_LENGTH_LIMIT ).toBe(1000);
    });
    it('defaults event cleanup interval to be the same as the max event age', () => {
        expect( dolittle.TOPIC_CLEANUP_INTERVAL ).toBe( dolittle.MAX_EVENT_AGE );
        dolittle = new Dolittle(undefined, undefined, 3000);
        expect( dolittle.TOPIC_CLEANUP_INTERVAL ).toBe( dolittle.MAX_EVENT_AGE );
    });

    it('messages added to a topic can be retrieved', () => {
        let topic = faker.random.uuid();
        let message = faker.lorem.paragraph(3);
        dolittle.push(topic, message);

        let pulled = dolittle.pull(topic);
        expect( pulled.id ).toBeDefined();
        expect( pulled.message ).toBe(message);
        expect( pulled.created ).toBeLessThanOrEqual(Date.now());
    });

    it('deletes the oldest topic when the limit is exceeded', () => {
        let firstTopic = faker.random.uuid();
        let message = faker.lorem.paragraph(1);
        dolittle.push(firstTopic, message);

        for(let i = 0; i < dolittle.TOPIC_LIMIT; i++) {
            dolittle.push(faker.random.uuid(), faker.lorem.paragraph(3));
        }
        expect( dolittle.getTopic( firstTopic ) ).toBeUndefined();
    });

    it('deletes the oldest message in a topic when the limit is exceeded', () => {
        let topic = faker.random.uuid();
        for(let i = 0; i < dolittle.TOPIC_LENGTH_LIMIT + 1; i++) {
            dolittle.push(topic, faker.lorem.paragraph(1));
        }
        expect( dolittle.getTopic( topic ).length ).toBe(dolittle.TOPIC_LENGTH_LIMIT);
    });
});