require('dotenv').config()
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
// const { expressMiddleware } = require('@apollo/server/express4')
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeof.js");
const { buildSubgraphSchema } = require('@apollo/subgraph')
require('dotenv').config()
const { auths } = require('./auth.js')
const sequelize = require('./utill/databse.js');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');


const userEndpoint = '/s2s-schema';


exports.userSchema = app.get(userEndpoint, (req, res) => {
  const file = fs.readFileSync('s2suser.graphql');
  res.type('application/txt');
  res.charset = 'UTF-8';
  res.write(file);
  res.end();
});

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),

});

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

async function start1() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async ({ req, res }) => {
      if(req.auth)
      await auths(req)
    }
  })
  console.log(`Server ready at ${url}`);
  // await server.start();
  // app.use(
  //   "/graphql",
  //   cors(),
  //   express.json(),
  //   expressMiddleware(server, {
  //     context: auths,
  //   })
  // );
  // app.listen(3001, async () => {
  //   console.log(`Server listening on port ${3001}`);
  // });
}

start1()