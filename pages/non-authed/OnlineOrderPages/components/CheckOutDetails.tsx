import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import FieldInputWithLabel from "./FieldInputWithLabel";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useAlert } from "react-alert";
import {
  OrderDetailsState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";

const validateEmail = (email: string) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

function CheckOutDetails() {
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setloading] = useState(false);
  const alertP = useAlert();
  const orderDetails = OrderDetailsState.use();
  const storeDetails = storeDetailState.use();
  const { width } = useWindowDimensions();

  const stripe = useStripe();
  const elements = useElements();
  const currency = "cad";

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();

    if (!validateEmail(emailAddress)) {
      alertP.error("Please enter a valid email address.");
      setloading(false);
      return;
    }

    if (!stripe || !elements) {
      console.log("Stripe.js has not yet loaded.");
      alertP.error("Error please try again");
      setloading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const newOrderDetails = {
      ...orderDetails,
      customer: { ...orderDetails.customer, email: emailAddress },
    };

    try {
      const { token, error } = await stripe.createToken(cardNumberElement);

      if (error) {
        console.error("Error creating token:", error);
        alertP.error("Error please try again");
        setloading(false);
        return;
      }

      const response = await fetch(
        "https://us-central1-posmate-5fc0a.cloudfunctions.net/processPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token.id,
            amount: orderDetails.total,
            currency,
            storeUID: storeDetails.docID,
            orderDetails: newOrderDetails,
            storeDetails: storeDetails,
          }),
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const responseData = await response.json();
          if (responseData.success) {
            console.log("Payment processed successfully!");
            setOrderDetailsState({
              page: 6,
            });
          } else {
            console.error(
              "Payment processing failed. Server message:",
              responseData.message
            );
            alertP.error("Payment processing failed.");
            setloading(false);
          }
        } else {
          console.error("Non-JSON response received:", await response.text());
          alertP.error("Non-JSON response received.");
          setloading(false);
        }
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (jsonError) {
      console.error("Error parsing JSON response or network error:", jsonError);
      alertP.error("Payment processing failed. Please try again.");
      setloading(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#121212",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#121212",
        },
        "::placeholder": {
          color: "#c3c3c3",
        },
        backgroundColor: "transparent", // This assumes your overall background is the color you want
      },
      invalid: {
        iconColor: "#FF0000",
        color: "#FF0000",
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      <View
        style={[styles.fieldsGroup, width < 1000 && { width: width * 0.9 }]}
      >
        <FieldInputWithLabel
          label="Email Address*"
          txtInput="Email Address"
          style={[styles.nameField, loading && { opacity: 0.5 }]}
          value={emailAddress}
          onChangeText={(text) => setEmailAddress(text)}
          textContentType="emailAddress"
        />
        <FieldInputWithLabel
          label="Card Number*"
          style={styles.nameField}
          customInput={() => (
            <div
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 14,
              }}
            >
              <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          )}
        />
        <View style={styles.buzzCodeAndPhoneRow}>
          <FieldInputWithLabel
            label="Expiry*"
            style={styles.buzzCodeField}
            customInput={() => (
              <div
                style={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            )}
          />
          <FieldInputWithLabel
            label="CVV*"
            style={styles.phoneNumberField}
            customInput={() => (
              <div
                style={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            )}
          />
        </View>
      </View>
      <Pressable
        style={[
          styles.continueBtn,
          (!stripe || !elements || loading || emailAddress === "") && {
            opacity: 0.5,
          },
        ]}
        onPress={handleSubmit}
        disabled={!stripe || !elements || loading || emailAddress === ""}
      >
        <Text style={styles.continueBtnTxt}>CHECKOUT</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  fieldsGroup: {
    width: 380,
    height: 250,
    justifyContent: "space-between",
  },
  nameField: {
    height: 70,
    width: "100%",
  },
  addressField: {
    height: 70,
    width: "100%",
  },
  buzzCodeAndPhoneRow: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buzzCodeField: {
    height: 70,
    width: "48%",
  },
  phoneNumberField: {
    height: 70,
    width: "48%",
  },
  continueBtn: {
    width: 219,
    height: 60,
    backgroundColor: "rgba(238,125,67,1)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginTop: 10,
  },
  continueBtnTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CheckOutDetails;
