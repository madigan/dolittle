# dolittle

Poor man's event bus. Allows clients to push and pull messages to in-memory queues. Absolutely no security whatsoever \o/

## Operating Instructions

Run `npm start` or `yarn start`

Environment variables:

- `PORT`: The port to listen on. Defaults to 3000.
- `TOPIC_LIMIT`: The maximum number of topics to maintain. Defaults to 50.
- `TOPIC_LENGTH_LIMIT`: The maximum number of events that can exist in a topic. Defaults to 1000.

If either of the limits above is exceeded, the least-updated topic will be dropped.

## Usage

All calls should use the HTTP POST verb with the `content-type` header set to `application/json`.

`POST /push` takes the following parameters:

- `topic` : The topic to publish the message onto.
- `message` : The string of information to store on the topic.

`POST /poll` takes the following parameters:

- `topic` : The topic to pull messages off of.

The response will be a JSON object structured as follows:

    {
        ID: "...",      // Server-generated identifier
        created: 123,   // Time the event was created
        message: ""     // The original message from the publisher
    }
