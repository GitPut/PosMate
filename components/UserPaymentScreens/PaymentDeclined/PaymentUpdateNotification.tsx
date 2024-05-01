import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import firebase from "firebase/compat/app";
import Logo from "assets/dpos-logo-black.png";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "state/firebaseFunctions";
import { useAlert } from "react-alert";

interface PaymentUpdateNotificationProps {
  isCanceled: boolean;
}

const PaymentUpdateNotification = ({
  isCanceled,
}: PaymentUpdateNotificationProps) => {
  const alertP = useAlert();

  const sendToCheckout = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("checkout_sessions")
        .add({
          price: "price_1Oj9OpCIw3L7DOwIBviuzrSh", // todo price Id from your products price in the Stripe Dashboard
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
              alertP.error(`An error occurred`);
            }

            if (sessionId) {
              // We have a session, let's redirect to Checkout
              // Init Stripe
              const stripe = await loadStripe(
                "pk_live_51MHqrvCIw3L7DOwI0ol9CTCSH7mQXTLKpxTWKzmwOY1MdKwaYwhdJq6WTpkWdBeql3sS44JmybynlRnaO2nSa1FK001dHiEOZO" // todo enter your public stripe key here
              );
              if (!stripe) return;
              await stripe.redirectToCheckout({ sessionId });
            }
          });
        });
    }
  };

  const Manage = () => {
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.origin}`,
        locale: "auto",
      })
      .then((response) => {
        window.location = response.data.url;
      })
      .catch(() => {
        alertP.error("Unknown error has occured");
      });
  };

  if (isCanceled) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F5F5F5",
                marginRight: 20,
              }}
              onPress={logout}
            >
              <SimpleLineIcons name="logout" size={32} color="black" />
            </Pressable>
            <Image source={Logo} resizeMode="contain" style={styles.logo} key={'logo'} />
          </View>
          <View style={styles.attentionWrapper}>
            <Text style={styles.attentionNeeded}>ATTENTION NEEDED</Text>
          </View>
        </View>
        <Text style={styles.txt1}>We&apos;re sad to see you go :(</Text>
        <Text style={styles.txt2}>
          Please let us make this right! If theres a feature that missing or
          something you dont like about the software, we can change that.
        </Text>
        <Text style={styles.txt3}>
          Resubscribe to have access of your store again. At $40/month instead
          of the normal $50/month
        </Text>
        <Pressable
          style={[styles.updateBtn, { width: 450 }]}
          onPress={sendToCheckout}
        >
          <Text style={styles.updateBilling}>Resubscribe for $40/month</Text>
        </Pressable>
        <Text style={styles.txt4}>
          Please call (226) 600-5925 or email us at Support@DivinePos.com so
          that we can solve the problem you had
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={Logo} resizeMode="contain" style={styles.logo} key={'logo'} />
          <View style={styles.attentionWrapper}>
            <Text style={styles.attentionNeeded}>ATTENTION NEEDED</Text>
          </View>
        </View>
        <Text style={styles.txt1}>
          Unfortunualy there was issue with your payment
        </Text>
        <Text style={styles.txt2}>
          This can occur for multiple reasons; if your billing details dont
          match the card attached. Have a look with your credit/debit provider
        </Text>
        <Text style={styles.txt3}>
          We dont your store to have any down time so please have a look at
          updating the details.
        </Text>
        <Pressable style={styles.updateBtn} onPress={Manage}>
          <Text style={styles.updateBilling}>UPDATE BILLING</Text>
        </Pressable>
        <Text style={styles.txt4}>
          If. you have any questions or need help please call (226) 600-5925 or
          email us at Support@DivinePos.com
        </Text>
      </View>
    );
  }
};

export default PaymentUpdateNotification;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    paddingBottom: 50,
  },
  headerContainer: {
    width: "90%",
    height: 90,
    borderWidth: 1,
    borderColor: "rgba(170,164,164,1)",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 25,
  },
  logo: {
    width: 220,
    height: 85,
  },
  attentionWrapper: {
    width: 248,
    height: 64,
    backgroundColor: "#ffed95",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  attentionNeeded: {
    fontWeight: "700",
    color: "#c2a61f",
    fontSize: 22,
  },
  txt1: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 25,
    width: 792,
    height: 29,
  },
  txt2: {
    color: "#121212",
    fontSize: 22,
    width: 792,
    height: 73,
  },
  updateBtn: {
    width: 326,
    height: 90,
    backgroundColor: "#7c2bfe",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBilling: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  txt3: {
    color: "#121212",
    fontSize: 22,
    width: 792,
    height: 73,
  },
  txt4: {
    color: "#121212",
    fontSize: 22,
    width: 792,
    height: 73,
  },
});
