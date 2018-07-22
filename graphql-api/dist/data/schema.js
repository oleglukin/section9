"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = "\ntype Airline {\n  id: ID!\n  Code: Int\n  Description: String\n}\ntype Airport {\n  id: ID!\n  Code: Int\n  Description: String\n}\ntype DelayGroup {\n  id: ID!\n  Code: Int\n  Description: String\n}\ntype Flight {\n  id: ID!\n  YEAR: Int\n  MONTH: Int\n  QUARTER: Int\n  AIRLINE_ID: Int\n  airline: Airline\n  CANCELLED: String\n  ORIGIN_CITY_NAME: String\n  ORIGIN_STATE_ABR: String\n  ORIGIN_AIRPORT_ID: String\n  origin_airport: Airport\n  DEST_CITY_NAME: String\n  DEST_STATE_ABR: String\n  DEST_AIRPORT_ID: String\n  destination_airport: Airport\n  DEP_TIME: Int\n  DEP_DELAY_GROUP: String\n  departure_delay_group: DelayGroup\n  ARR_TIME: Int\n  ARR_DELAY_GROUP: String\n  arrival_delay_group: DelayGroup\n}\n# the schema allows the following query:\ntype Query {\n  flights(first: Int): [Flight]\n  flight(id: ID!): Flight\n  airline(id: ID!): Airline\n  airlines(first: Int): [Airline]\n  airport(id: Int): Airport\n}\n";

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: schema,
  resolvers: _resolvers2.default
});