'use strict'
const { buildSchema } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers');

const app = express()
const port = process.env.port || 3000

// define Schema
const schema = buildSchema(
  readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
)

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
