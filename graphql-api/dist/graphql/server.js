"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("../data/schema");

var _schema2 = _interopRequireDefault(_schema);

var _schemaPrinter = require("graphql/utilities/schemaPrinter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup server
var setupGraphQLServer = function setupGraphQLServer() {
  var graphQLServer = (0, _express2.default)();

  // /graphql
  graphQLServer.use("/graphql", _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default, context: {} }));

  // /graphiql
  graphQLServer.use("/graphiql", (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: "/graphql" }));

  // /schema
  graphQLServer.use("/schema", function (req, res) {
    res.set("Content-Type", "text/plain");
    res.send((0, _schemaPrinter.printSchema)(_schema2.default));
  });

  return graphQLServer;
};

exports.default = setupGraphQLServer;