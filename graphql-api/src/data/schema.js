import { makeExecutableSchema } from "graphql-tools"

import resolvers from "./resolvers"

const schema = `
type Airline {
  id: ID!
  Code: Int
  Description: String
}
type Airport {
  id: ID!
  Code: Int
  Description: String
}
type DelayGroup {
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
  ORIGIN_STATE_ABR: String
  ORIGIN_AIRPORT_ID: String
  origin_airport: Airport
  DEST_CITY_NAME: String
  DEST_STATE_ABR: String
  DEST_AIRPORT_ID: String
  destination_airport: Airport
  DEP_TIME: Int
  DEP_DELAY_GROUP: String
  departure_delay_group: DelayGroup
  ARR_TIME: Int
  ARR_DELAY_GROUP: String
  arrival_delay_group: DelayGroup
}
# the schema allows the following query:
type Query {
  flights(first: Int): [Flight]
  flight(id: ID!): Flight
  airline(id: ID!): Airline
  airlines(first: Int): [Airline]
  airport(id: Int): Airport
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})