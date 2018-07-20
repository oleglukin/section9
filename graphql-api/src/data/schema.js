import { makeExecutableSchema } from "graphql-tools"

import resolvers from "./resolvers"

const schema = `
type Airline {
  id: ID!
  Code: Int
  Description: String
}
type Flight {
  id: ID!
  YEAR: Int
  MONTH: Int
  QUARTER: Int
  AIRLINE_ID: Int
  airline: Airline
  CANCELLED: String
  ORIGIN_CITY_NAME: String
  DEST_CITY_NAME: String
}
# the schema allows the following query:
type Query {
  flights(first: Int): [Flight]
  flight(id: ID!): Flight
  airline(id: ID!): Airline
  airlines(first: Int): [Airline]
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})