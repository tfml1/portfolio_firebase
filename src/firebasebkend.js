/* backend */

//-------------------------------------------------------------------------------------------------------

// auth imports
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// firestore db import
import { getFirestore } from "firebase/firestore";
//-------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyJ9t5MFjyfPga8aD7OwlowcqS8X4C-OU",
  authDomain: "portfolio-c530a.firebaseapp.com",
  projectId: "portfolio-c530a",
  storageBucket: "portfolio-c530a.appspot.com",
  messagingSenderId: "725084238344",
  appId: "1:725084238344:web:dd30441c36c5251d6397bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//------------------------------------------------------------------------

// initialise firestore database
export const db = getFirestore(app);
// initialise authantication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// if firebase duplicate error occors
// FirebaseError: Firebase: Firebase App named '[DEFAULT]' already exists with different options or config (app/duplicate-app). in react
// https://newbedev.com/firebase-app-named-default-already-exists-app-duplicate-app-react-js-code-example
// https://www.youtube.com/watch?v=l7gQqxCG7aY
// usvally occors when any app prev has some other firebaseconfig n we change it
//-----------------------=----------
// if (!firebase.apps.length) {
//     firebase.initializeApp({});
// }
//--------------------------------
/*
// Config file
import * as firebase from "firebase";

const config = {...};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// Other file
import firebase from '../firebase';
...
console.log(firebase.name);
console.log(firebase.database());
*/
//--------------------------------------------------------
// otherwise, just refresh/reopen the ide worked this time
