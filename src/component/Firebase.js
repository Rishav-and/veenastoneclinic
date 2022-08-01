
import {getAuth } from "firebase/auth";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";


var firebaseConfig = {

  apiKey: "AIzaSyAGHMfaBy28T7yQpoGvPjQ0rzXJA7NqSJI",

  authDomain: "veenastoneclinic.firebaseapp.com",

  databaseURL: "https://veenastoneclinic-default-rtdb.firebaseio.com",

  projectId: "veenastoneclinic",

  storageBucket: "veenastoneclinic.appspot.com",

  messagingSenderId: "148345750965",

  appId: "1:148345750965:web:fb0fa3d4f6cbf5f07e85fc",

  measurementId: "G-5YXB2WR0QK"


  
  };
  

 
const fire = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
var db = fire.firestore();

export { db , auth} ;
export default fire;