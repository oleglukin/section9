import firebase from 'firebase'
import firebaseConfig from '../config'

firebase.initializeApp(firebaseConfig);

var fligthsParent = "/jan-2018-limited/";


// GraphQL resolvers
const resolvers = {
  Query: {
    // Get first N flights from the database
    flights: (parent, args) => {
      var fligths = firebase.database().ref(fligthsParent);
      return fligths.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    flight: (parent, args) => {
      var fligths = firebase.database().ref(fligthsParent + args.id);
      return fligths.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airline: (parent, args) => {
      if (args.id) {
        var airline = firebase.database().ref("/AirlineID/" + args.id);
        return airline.once("value").then(function (snapshot) {
          return snapshot.val();
        });
      }
      else if (args.Code) {
        var airlines = firebase.database().ref("/AirlineID/");
        return airlines.limitToFirst(1)
          .orderByChild("Code")
          .equalTo(Code)
          .once("value").then(function (snapshot) {
            return snapshot.val();
          });
      }
    },

    airlines: (parent, args) => {
      var airlines = firebase.database().ref("/AirlineID/");
      return airlines.limitToFirst(args.first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    }
  },

  // Get Airline info for each flight by AIRLINE_ID
  Flight: {
    airline: parent => {
      var airlines = firebase.database().ref("/AirlineID/");
      return airlines.limitToFirst(1)
        .orderByChild("Code")
        .equalTo(parent.AIRLINE_ID)
        .once("value").then(function (snapshot) {
          var val = snapshot.val();
          return val[Object.keys(val)[0]]; 
        });
    }
  }
}

export default resolvers