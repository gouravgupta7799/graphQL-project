// const { ApolloServer } = require("@apollo/server");
// const { ApolloGateway } = require("@apollo/gateway");
const { startStandaloneServer } = require('@apollo/server/standalone');
// // const { expressMiddleware } = require('@apollo/server/express4');
// const { ApolloServerPluginSubscriptionCallback } = require('@apollo/server/plugin/subscriptionCallback');
// const express = require('express')
// // const app = express();
// const { readFileSync } = require('fs');

// const superGraphsdl = readFileSync('./supergraph.graphql').toString()
// const gateway = new ApolloGateway({
//   superGraphsdl,
//   // serviceList: [
//   //   { name: 'User', url: "http://localhost:4001" },
//   //   { name: 'Product', url: "http://localhost:4002" }
//   // ]
// })

// async function start() {

//   const server = new ApolloServer({
//     gateway,
//     Subscriptions: false,
//     // plugins: [ApolloServerPluginSubscriptionCallback()],
//   })
//   const { url } = await startStandaloneServer(server, {
//     listen: 4000,
//   })
//   console.log(`servr run on ${url}`)
//   // await server.start();
//   // app.use(
//   //   "/graphql",
//   //   cors(),
//   //   express.json(),
//   //   expressMiddleware(server)
//   // );
//   // app.listen(4002, async () => {
//   //   console.log(`Server listening on port ${4002}`);
//   // });
// }

// start()

const { ApolloServer } = require("@apollo/server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require('fs');

async function start() {
  // Read the supergraph SDL from file
  const superGraphSDL = readFileSync('./supergraph.graphql').toString();

  // Create ApolloGateway with supergraph SDL
  const gateway = new ApolloGateway({
    supergraphSdl: superGraphSDL,
    debug: true, // Enable debug mode for logging
  });

  // Create an ApolloServer instance with the gateway
  const server = new ApolloServer({
    gateway,
    subscriptions: false, // Disable subscriptions
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: 4000,
  })
  console.log(`servr run on ${url}`)
}

start();
