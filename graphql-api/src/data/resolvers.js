import firebase from 'firebase'
import { firebaseConfig, endpoints } from '../config'

firebase.initializeApp(firebaseConfig);



// GraphQL resolvers
const resolvers = {
  Query: {
    // Get first N flights from the database
    flights: (parent, args) => {
      var fligths = firebase.database().ref(endpoints.fligths);
      return fligths.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    flight: (parent, args) => {
      var fligths = firebase.database().ref(endpoints.fligths + args.id);
      return fligths.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airline: (parent, args) => {
      if (args.id) {
        var airline = firebase.database().ref(endpoints.airlines + args.id);
        return airline.once("value").then(function (snapshot) {
          return snapshot.val();
        });
      }
      else if (args.Code) {
        var airlines = firebase.database().ref(endpoints.airlines);
        return airlines.limitToFirst(1)
          .orderByChild("Code")
          .equalTo(args.Code)
          .once("value").then(function (snapshot) {
            return snapshot.val();
          });
      }
    },

    airlines: (parent, args) => {
      var airlines = firebase.database().ref(endpoints.airlines);
      return airlines.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airport: (parent, args) => {
      var airports = firebase.database().ref(endpoints.airports);
      return airports.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(String(args.id))
        .once("value").then(function (snapshot) {
          return snapshot.val();
        });
    }
  },

  // Get Airline info for each flight by AIRLINE_ID
  Flight: {
    airline: parent => {
      var airlines = firebase.database().ref(endpoints.airlines);
      return airlines.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(parent.AIRLINE_ID)
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]];
        });
    },

    origin_airport: parent => {
      var airports = firebase.database().ref(endpoints.airports);
      return airports.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(parent.ORIGIN_AIRPORT_ID)
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]];
        });
    },

    destination_airport: parent => {
      var airports = firebase.database().ref(endpoints.airports);
      return airports.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(parent.DEST_AIRPORT_ID)
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]];
        });
    },

    departure_delay_group: parent => {
      var delayGroups = firebase.database().ref(endpoints.delayGroups);
      console.log(delayGroups.toString())
      console.log(parent.DEP_DELAY_GROUP)
      return delayGroups.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(String(parent.DEP_DELAY_GROUP))
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]];
        });
    },

    arrival_delay_group: parent => {
      var delayGroups = firebase.database().ref(endpoints.delayGroups);
      return delayGroups.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(String(parent.ARR_DELAY_GROUP))
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]];
        });
    }
  }
}

export default resolvers