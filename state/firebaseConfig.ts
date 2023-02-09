import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDmtlrkfZRbFy8P7D4BFXTIkzMDC_DP5n8",
  authDomain: "posmate-5fc0a.firebaseapp.com",
  projectId: "posmate-5fc0a",
  storageBucket: "posmate-5fc0a.appspot.com",
  messagingSenderId: "48463376409",
  appId: "1:48463376409:web:b427a4fbc3c210a5977a88",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = firebase.auth();

export const db = firebase.firestore();

export const sendEmailFunc = (data) =>
  firebase
    .functions()
    .httpsCallable("sendEmailTo")(data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
