import { auth, db } from "./firebaseConfig";

export const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signUp = (email, password, name, phoneNumber) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      if (userAuth.user) {
        db.collection("users")
          .doc(userAuth.user.uid)
          .set({
            products: [],
            categories: [],
            wooCredentials: { ck: null, cs: null, useWoocommerce: false },
            storeDetails: {
              name: null,
              address: null,
              phoneNumber: null,
              website: null,
              comSelected: null,
              deliveryPrice: null,
            },
            ownerDetails: {
              name: name,
              address: null,
              phoneNumber: phoneNumber,
              email: email,
            },
            //company name
            //adddress
            //etc
          });
      }
    })
    .catch((e) => console.log(e));

export const updateData = (categories, products) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      products: products,
      categories: categories,
    })
    .catch((e) => console.log("ERROR HAS OCCURE FB: ", e));
};

export const updateWooCredentials = (wooCredentials) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    wooCredentials: wooCredentials,
  });
};

export const updateTransList = (reciept) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("transList")
    .add(reciept);
};

export const updateStoreDetails = (storeDetails) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    storeDetails: storeDetails,
  });
};

export const updateFreeTrial = (endDate) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    freeTrial: endDate,
  });
};

export const logout = () => auth.signOut();

export const addCustomerDetailsToDb = (customer) =>
  db
    .collection("users")
    .doc(auth.currentUser?.uid)
    .collection("customers")
    .add(customer);
