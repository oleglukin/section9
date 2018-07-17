"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = undefined;

var _server = require("./graphql/server");

var _server2 = _interopRequireDefault(_server);

var _firebaseFunctions = require("firebase-functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* CF for Firebase with graphql-server-express */
var graphQLServer = (0, _server2.default)();

// https://us-central1-section9-210115.cloudfunctions.net/api
var api = exports.api = _firebaseFunctions.https.onRequest(graphQLServer);