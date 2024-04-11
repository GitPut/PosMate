import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";
import "firebase/compat/storage";

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
firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a time.
      console.log("Persistence failed: ", err);
      alert("Please only keep one tab of Divine POS open at a time.");
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      console.log("Persistence is not available: ", err);
    }
  });

// Initialize Cloud Firestore and get a reference to the service
export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export const sendEmailFunc = (data) => {
  // firebase
  //   .functions()
  //   .httpsCallable("sendEmailTo")(data)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //Disabled for now because i keep getting blank emails i suspect from this function
};
