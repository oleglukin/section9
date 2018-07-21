import setupGraphQLServer from "./server"

const graphQLServer = setupGraphQLServer()
graphQLServer.listen(80, () => console.log('GraphQL server listening on port 80'))