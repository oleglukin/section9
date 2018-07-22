'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebase2.default.initializeApp(_config.firebaseConfig);

// GraphQL resolvers
var resolvers = {
  Query: {
    // Get first N flights from the database
    flights: function flights(parent, args) {
      var fligths = _firebase2.default.database().ref(_config.endpoints.fligths);
      return fligths.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    flight: function flight(parent, args) {
      var fligths = _firebase2.default.database().ref(_config.endpoints.fligths + args.id);
      return fligths.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airline: function airline(parent, args) {
      if (args.id) {
        var airline = _firebase2.default.database().ref(_config.endpoints.airlines + args.id);
        return airline.once("value").then(function (snapshot) {
          return snapshot.val();
        });
      } else if (args.Code) {
        var airlines = _firebase2.default.database().ref(_config.endpoints.airlines);
        return airlines.limitToFirst(1).orderByChild("Code").equalTo(args.Code).once("value").then(function (snapshot) {
          return snapshot.val();
        });
      }
    },

    airlines: function airlines(parent, args) {
      var airlines = _firebase2.default.database().ref(_config.endpoints.airlines);
      return airlines.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airport: function airport(parent, args) {
      var airports = _firebase2.default.database().ref(_config.endpoints.airports);
      return airports.limitToFirst(1).orderByChild("Code").equalTo(String(args.id)).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    }
  },

  // Get Airline info for each flight by AIRLINE_ID
  Flight: {
    airline: function airline(parent) {
      var airlines = _firebase2.default.database().ref(_config.endpoints.airlines);
      return airlines.limitToFirst(1).orderByChild("Code").equalTo(parent.AIRLINE_ID).once("value").then(function (snapshot) {
        var val = snapshot.val();
        return val[Object.keys(val)[0]];
      });
    },

    origin_airport: function origin_airport(parent) {
      var airports = _firebase2.default.database().ref(_config.endpoints.airports);
      return airports.limitToFirst(1).orderByChild("Code").equalTo(parent.ORIGIN_AIRPORT_ID).once("value").then(function (snapshot) {
        var val = snapshot.val();
        return val[Object.keys(val)[0]];
      });
    },

    destination_airport: function destination_airport(parent) {
      var airports = _firebase2.default.database().ref(_config.endpoints.airports);
      return airports.limitToFirst(1).orderByChild("Code").equalTo(parent.DEST_AIRPORT_ID).once("value").then(function (snapshot) {
        var val = snapshot.val();
        return val[Object.keys(val)[0]];
      });
    },

    departure_delay_group: function departure_delay_group(parent) {
      var delayGroups = _firebase2.default.database().ref(_config.endpoints.delayGroups);
      console.log(delayGroups.toString());
      console.log(parent.DEP_DELAY_GROUP);
      return delayGroups.limitToFirst(1).orderByChild("Code").equalTo(String(parent.DEP_DELAY_GROUP)).once("value").then(function (snapshot) {
        var val = snapshot.val();
        return val[Object.keys(val)[0]];
      });
    },

    arrival_delay_group: function arrival_delay_group(parent) {
      var delayGroups = _firebase2.default.database().ref(_config.endpoints.delayGroups);
      return delayGroups.limitToFirst(1).orderByChild("Code").equalTo(String(parent.ARR_DELAY_GROUP)).once("value").then(function (snapshot) {
        var val = snapshot.val();
        return val[Object.keys(val)[0]];
      });
    }
  }
};

exports.default = resolvers;