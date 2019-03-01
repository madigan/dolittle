class Dolittle {
    constructor(
        topicLimit=50,
        topicLengthLimit=1000
    ) {
        this.TOPIC_LIMIT = topicLimit;
        this.TOPIC_LENGTH_LIMIT = topicLengthLimit;
        
        this._topics = {};
        this.latestTopics = [];
    }

    /**
     * Pushes a message onto a topic. If the topic is full the oldest message 
     * is dropped.
     * @param {string} topic The name of the topic to push to.
     * @param {string} message The message to push onto the topic.
     */
    push(topic, message) {
        let t = this.getTopic(topic)||this.addTopic(topic);
        
        let created = Date.now();

        t.push({
            id: `${topic}-${created}-${t.length}`,
            created: created,
            message: message
        });
        while(t.length > this.TOPIC_LENGTH_LIMIT) {
            t.shift();
        }

        this.latestTopics = this.latestTopics.filter( value => value != topic );
        this.latestTopics.push(topic);
    }

    /**
     * Pull the first message off a topic.
     * @param {string} topic The name of the topic to pull from.
     * @returns {object} The first message off the topic.
     */
    pull(topic) {
        return (
            this.getTopic(topic)||this.addTopic(topic)
        ).shift();
    }

    /**
     * Get a topic based on its name.
     * @param {string} name The name of the topic.
     * @returns {object[]} The topic array.
     */
    getTopic( name ) {
        return this._topics[name];
    }

    /**
     * Add a new topic with a given name.
     * @param {string} name The name of the topic.
     * @returns {object[]} The topic array.
     */
    addTopic( name ) {
        if(Object.keys(this._topics).length >= this.TOPIC_LIMIT) {
            // Remove latest topic
            delete this._topics[this.latestTopics.shift()];
        }
        this._topics[name] = [];
        this.latestTopics.push(name);
        return this._topics[name];
    }
}

module.exports = Dolittle;