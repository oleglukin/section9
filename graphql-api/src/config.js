// Initialise Firebase with a config
var firebaseConfig = {
    apiKey: "BTRaS45950q6FRKdoLzgtr45hm11RXnQT7GaCHo",
    authDomain: "section9-210115.firebaseapp.com",
    databaseURL: "https://section9-210115.firebaseio.com",
    projectId: "section9-210115",
    storageBucket: "section9-210115.appspot.com",
    messagingSenderId: "124504813524"
};

// Firebase endpoints (objects to query)
var endpoints = {
    fligths: "/jan-2018-limited/",
    airlines: "/AirlineID/",
    airports: "/Airport/",
    delayGroups: "/DepartureDelayGroups/"
}

export { firebaseConfig, endpoints }
