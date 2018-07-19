import { makeExecutableSchema } from "graphql-tools"

import resolvers from "./resolvers"

const schema = `
type AirlineID {
  id: ID!
  Code: Int
  Description: String
}
type Flight {
  id: ID!
  YEAR: Int
  MONTH: Int
  QUARTER: Int
  Airline: AirlineID
  CANCELLED: String
  ORIGIN_CITY_NAME: String
  DEST_CITY_NAME: String
}
# the schema allows the following query:
type Query {
  flights: [Flight]
  flight(id: ID!): Flight
  airline(id: ID!): AirlineID
  airlines: [AirlineID]
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})