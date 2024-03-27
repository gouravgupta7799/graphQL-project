const { ApolloServer } = require("@apollo/server");
const { ApolloGateway } = require("@apollo/gateway");
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServerPluginSubscriptionCallback } = require('@apollo/server/plugin/subscriptionCallback');


const gateway = new ApolloGateway({
  serviceList: [
    { name: 'User', url: "http://localhost:4000" },
    { name: 'Product', url: "http://localhost:4002" }
  ]
})

async function start() {

  const server = new ApolloServer({
    gateway,
    Subscriptions: false,
    plugins: [ApolloServerPluginSubscriptionCallback()],
  })
  const { url } = await startStandaloneServer(server, {
    listen: 4001,
  })
  console.log(`servr run on ${url}`)
}

start()