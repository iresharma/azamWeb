const firebaseConfig = {
    apiKey: "AIzaSyBPgrFTi9dWh4ZsJgwrMYExbx7BhuIuJ1s",
    authDomain: "azamwebnotes.firebaseapp.com",
    databaseURL: "https://azamwebnotes.firebaseio.com",
    projectId: "azamwebnotes",
    storageBucket: "azamwebnotes.appspot.com",
    messagingSenderId: "1034585965918",
    appId: "1:1034585965918:web:aef57e4089b4e7b7673bcf"
  };

import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
const auth = firebase.auth();
const storageBucket = firebase.storage()
export default {db, auth, storageBucket}