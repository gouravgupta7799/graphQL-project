const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeof.js");
const { buildSubgraphSchema } = require('@apollo/subgraph')
const MONGO_URI = "mongodb://127.0.0.1:27017/new-project-part1";
require('dotenv').config()
const { auths } = require('./auth.js')


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


startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    await auths(req)
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

