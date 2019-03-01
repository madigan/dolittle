const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Dolittle = require('./Dolittle');

let app = express();
let dolittle = new Dolittle();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect(307, 'https://github.com/madigan/dolittle');
});

app.post('/push', (req, res) => {
    // Get the topic and message
    let topic = req.body.topic;
    let message = req.body.message;

    dolittle.push(topic, message);
    res.status(200).end();
});

app.post('/pull', (req, res) => {
    // Get the topic
    let topic = req.body.topic;

    let data = dolittle.pull(topic);
    res.status(200).send(data);
});

module.exports = app;