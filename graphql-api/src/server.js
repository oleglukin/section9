import bodyParser from "body-parser"
import express from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import schema from "./data/schema"
import { printSchema } from "graphql/utilities/schemaPrinter"

// setup server
const setupGraphQLServer = () => {
  const graphQLServer = express()

  // /graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  )

  // /graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "/graphql" })
  )

  // /schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer