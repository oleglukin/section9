import firebase from 'firebase'

// Initialise Firebase with a config
var config = {
  apiKey: "BTRaS45950q6FRKdoLzgtr45hm11RXnQT7GaCHo",
  authDomain: "section9-210115.firebaseapp.com",
  databaseURL: "https://section9-210115.firebaseio.com",
  projectId: "section9-210115",
  storageBucket: "section9-210115.appspot.com",
  messagingSenderId: "124504813524"
};
firebase.initializeApp(config);


// GraphQL resolvers
const resolveFunctions = {
  Query: {
    flights: (parent, args) => {
      const { first } = args;
      var fligths = firebase.database().ref("/jan-2018-limited/");
      return fligths.limitToFirst(first).once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    flight: (parent, args) => {
      const { id } = args;
      var fligths = firebase.database().ref("/jan-2018-limited/" + id);
      return fligths.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airline: (parent, args) => {
      const { id } = args;
      var airlineID = firebase.database().ref("/AirlineID/" + id);
      return airlineID.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    },

    airlines: () => {
      var airlineID = firebase.database().ref("/AirlineID/");
      return airlineID.once("value").then(function (snapshot) {
        return snapshot.val();
      });
    }
  }
}

export default resolveFunctions