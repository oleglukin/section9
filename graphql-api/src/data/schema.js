import { makeExecutableSchema } from "graphql-tools"

import resolvers from "./resolvers"

const schema = `
type AirlineID {
  id: Int! # the ! means that every airline object _must_ have an id
  Code: String
  Description: Int
}
type Flight {
  AIRLINE_ID: Int
  CANCELLED: String
  Airline: AirlineID
  votes: Int
}
# the schema allows the following query:
type Query {
  flights: [Flight]
  airline(id: Int!): AirlineID
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})