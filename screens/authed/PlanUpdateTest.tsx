import { View, Text, Button } from "react-native";
import React from "react";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import Axios from "axios";
import firebase from "firebase/app";

const PlanUpdateTest = () => {
  const sendToCheckout = async () => {
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("checkout_sessions")
      .add({
        price: "price_1Mb4uSCIw3L7DOwI6exh9JBt", // todo price Id from your products price in the Stripe Dashboard
        success_url: window.location.origin, // return user to this screen on successful purchase
        cancel_url: window.location.origin, // return user to this screen on failed purchase
      })
      .then((docRef) => {
        // Wait for the checkoutSession to get attached by the extension
        docRef.onSnapshot(async (snap) => {
          const { error, sessionId } = snap.data();
          if (error) {
            // Show an error to your customer and inspect
            // your Cloud Function logs in the Firebase console.
            alert(`An error occurred: ${error.message}`);
          }

          if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await loadStripe(
              "pk_live_51MHqrvCIw3L7DOwI0ol9CTCSH7mQXTLKpxTWKzmwOY1MdKwaYwhdJq6WTpkWdBeql3sS44JmybynlRnaO2nSa1FK001dHiEOZO" // todo enter your public stripe key here
            );
            console.log(`redirecting`);
            await stripe.redirectToCheckout({ sessionId });
          }
        });
      });
  };

  const Manage = () => {
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.origin}`,
        locale: "auto",
      })
      .then((response) => {
          console.log(response.data);
          window.location = response.data.url;
      })
      .catch((error) => {
        alert('Unknown error has occured: ',error);
      });
    // var data = JSON.stringify({
    //   email: email,
    // });

    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://us-central1-posmate-5fc0a.cloudfunctions.net/createPortalLink",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   //   data: data,
    // };

    // Axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  //   const sendToCustomerPortal = async () => {
  //     // had to update firebase.app().functions() to firebase.default.functions() and
  //     // removed the region from the functions call (from stripe firebase extension docs)
  //     const functionRef = firebase
  //       .functions()
  //       .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  //     const { data } = await functionRef({ returnUrl: window.location.origin });
  //     window.location.assign(data.url);
  //   }

  return (
    <View>
      <Text>PlanUpdateTest</Text>
      <Button title="TEST" onPress={sendToCheckout} />
      <Button title="Manage" onPress={Manage} />
    </View>
  );
};

export default PlanUpdateTest;
