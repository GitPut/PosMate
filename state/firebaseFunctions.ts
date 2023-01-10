import { auth, db } from "./firebaseConfig";

export const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signUp = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      if (userAuth.user) {
        db.collection("users").doc(userAuth.user.uid).set({
          paid: true,
          //company name
          //adddress
          //etc
        });
      }
    })
    .catch((e) => console.log(e));
