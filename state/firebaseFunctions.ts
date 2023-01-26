import { auth, db } from "./firebaseConfig";

export const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signUp = (email, password) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      if (userAuth.user) {
        db.collection("users")
          .doc(userAuth.user.uid)
          .set({
            paid: true,
            products: [],
            categories: [],
            wooCredentials: { ck: null, cs: null, useWoocommerce: false },
            //company name
            //adddress
            //etc
          });
      }
    })
    .catch((e) => console.log(e));

export const updateData = (categories, products) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    products: products,
    categories: categories,
  });
};

export const updateWooCredentials = (wooCredentials) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    wooCredentials: wooCredentials,
  });
};

export const updateTransList = (transList) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    transList: transList,
  });
};

export const updateStoreDetails = (storeDetails) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    storeDetails: storeDetails,
  });
};