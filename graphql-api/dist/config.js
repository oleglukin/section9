"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Initialise Firebase with a config
var firebaseConfig = {
    apiKey: "AIzaSyCN50q6FRKdoLzJTMRzhm11RXnQT7GaCHo",
    authDomain: "section9-210115.firebaseapp.com",
    databaseURL: "https://section9-210115.firebaseio.com",
    projectId: "section9-210115",
    storageBucket: "section9-210115.appspot.com",
    messagingSenderId: "894502781524"
};

var endpoints = {
    fligths: "/jan-2018-limited/",
    airlines: "/AirlineID/",
    airports: "/Airport/",
    delayGroups: "/DepartureDelayGroups/"
};

exports.firebaseConfig = firebaseConfig;
exports.endpoints = endpoints;