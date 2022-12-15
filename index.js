'use strict'
const { graphql, buildSchema } = require('graphql');
const express = require('express');
const gqlMiddleware = require('express-graphql');

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

// execute query hello
graphql(schema, '{ hello, greeting }', resolvers)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));


