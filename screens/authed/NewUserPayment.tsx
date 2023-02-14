import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EditStoreDetails from "components/EditStoreDetails";
import DropDown from "components/DropDown";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";

const NewUserPayment = () => {
  const [planType, setplanType] = useState("Pay $50 each month");

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Welcome To Divine Pos</Text>
        <Text>Please enter your busienss details to start!</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <Text>Choose plan type</Text>
          <DropDown
            label=""
            options={[
              "Pay $50 each month",
              "Pay $480 Per Year/Each month @$40",
              "Test",
            ]}
            setValue={setplanType}
            value={planType}
          />
        </View>
        <EditStoreDetails
          customBtnLbl="Check Out"
          customBtnExtraFunction={async () => {
            let priceId;
            if (planType === "Pay $50 each month") {
              priceId = "price_1Mb2s4CIw3L7DOwI5PDx3qKx";
            } else if (planType === "Pay $480 Per Year/Each month @$40") {
              priceId = "price_1Mb2s4CIw3L7DOwIF00zPa4q";
            } else if (planType === "Test") {
              priceId = "price_1Mb4uSCIw3L7DOwI6exh9JBt";
            }
            await db
              .collection("users")
              .doc(auth.currentUser.uid)
              .collection("checkout_sessions")
              .add({
                price: priceId, // todo price Id from your products price in the Stripe Dashboard
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
          }}
        />
      </View>
    </View>
  );
};

export default NewUserPayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(31,35,48,1)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "white",
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    padding: 50,
  },
});
