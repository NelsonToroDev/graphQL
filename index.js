'use strict'
const { graphql, buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const app = express();
const port = process.env.port || 3000;


// define Schema
const schema = buildSchema(`
    type Query {
        hello: String
        greeting: String
    }
`);

// configure resolvers
const resolvers = {
    hello: () => {
        return 'Hello Worlds';
    },
    greeting: () => {
        return "Hello everybody!!!";
    }
}

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`)
});


