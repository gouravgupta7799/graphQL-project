const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose');
require('dotenv').config();
const { startStandaloneServer } = require("@apollo/server/standalone")
const MONGO_URI = "mongodb://127.0.0.1:27017/new-project-part2";
const { buildSubgraphSchema } = require('@apollo/subgraph')
const { resolvers } = require('./resolver2')
const { typeDefs } = require('./typeDef2');
// const { schema } = require('./model/products');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

async function start2() {
  const { url } = await startStandaloneServer(server, {
    listen: 4002,
  })
  console.log(`servr run on ${url}`)
}
start2()
