import { TransListStateItem } from "types/global";
import { auth, db } from "./firebaseConfig";

export const signIn = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const signUp = (
  email: string,
  password: string,
  name: string,
  phoneNumber: string
) =>
  auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
    if (userAuth.user) {
      db.collection("users")
        .doc(userAuth.user.uid)
        .set({
          categories: [],
          wooCredentials: { ck: null, cs: null, useWoocommerce: false },
          storeDetails: {
            name: null,
            address: null,
            phoneNumber: null,
            website: null,
            comSelected: null,
            deliveryPrice: null,
            taxRate: 13,
          },
          ownerDetails: {
            name: name,
            address: null,
            phoneNumber: phoneNumber,
            email: email,
          },
        });
      userAuth.user.updateProfile({
        displayName: name,
      });
    }
  });

export const updateData = (categories: string[]) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      categories: categories,
    })
    .catch((e) => console.log("ERROR HAS OCCURE FB: ", e));
};

// export const updateWooCredentials = (wooCredentials: any) => {
//   db.collection("users").doc(auth.currentUser?.uid).update({
//     wooCredentials: wooCredentials,
//   });
// };

export const updateTransList = (receipt: TransListStateItem) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("transList")
    .add({
      ...receipt,
      dateCompleted: new Date(),
    });
};

export const updateStoreDetails = (storeDetails: any) => {
  db.collection("users").doc(auth.currentUser?.uid).update({
    storeDetails: storeDetails,
  });
  if (storeDetails.onlineStoreActive) {
    db.collection("public").doc(auth.currentUser?.uid).update({
      storeDetails: storeDetails,
    });
  }
};

export const updateFreeTrial = (endDate: any) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      freeTrial: endDate,
    })
    .finally(() => {
      window.location.reload();
    });
};

export const logout = () => {
  localStorage.removeItem("isAuthedBackend");
  localStorage.removeItem("savedUserState");
  auth.signOut();
  // window.location.reload();
  window.location.href = "https://divinepos.com";
};

export const addCustomerDetailsToDb = (customer: any) =>
  db
    .collection("users")
    .doc(auth.currentUser?.uid)
    .collection("customers")
    .add({
      ...customer,
      createdAt: new Date(),
    });
