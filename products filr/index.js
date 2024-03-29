const { ApolloServer } = require('@apollo/server')
require('dotenv').config();
const { startStandaloneServer } = require("@apollo/server/standalone")
// const { expressMiddleware } = require('@apollo/server/express4')
const { buildSubgraphSchema } = require('@apollo/subgraph')
const { resolvers } = require('./resolver2')
const { typeDefs } = require('./typeDef2');
const sequelize = require('./utill/databse');
const fs = require('fs');
const express = require('express')
const cors = require('cors');

const app = express()

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

const productEndpoint = '/s3sschema';

exports.productSchema = app.get(productEndpoint, (req, res) => {
  const file = fs.readFileSync('./s2sproduct.graphql');
  res.type('application/txt');
  res.charset = 'UTF-8';
  res.write(file);
  res.end();
});

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

async function start2() {
  const { url } = await startStandaloneServer(server, {
    listen: 4002,
  })
  console.log(`servr run on ${url}`)

  // await server.start();
  // app.use(
  //   "/graphql",
  //   cors(),
  //   express.json(),
  //   expressMiddleware(server)
  // );
  // app.listen(4002, async () => {
  //   console.log(`Server listening on port ${4002}`);
  // });
}
start2()