import React, { Component, useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DeliveryDetails from "./components/home/DeliveryDetails";
import PickupDetails from "./components/home/PickupDetails";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import CheckOutDetails from "./components/home/CheckOutDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function OnlineOrderHomeCheckout({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  page,
}) {
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.plantImgContainer}>
          {/* <Image
            source={require("./assets/images/image_JqcD..png")}
            resizeMode="contain"
            style={[styles.plantImg, screenWidth < 1000 && { width: 100 }]}
          /> */}
          <View style={styles.wingImgContainer}>
            {/* <Image
              source={
                screenWidth > 1000
                  ? require("./assets/images/image_BSgk..png")
                  : require("./assets/images/sidewings.png")
              }
              resizeMode="contain"
              style={[
                styles.wingImg,
                screenWidth < 1000 && {
                  width: 200,
                  position: "absolute",
                  right: 0,
                  bottom: "15%",
                },
              ]}
            /> */}
            <View style={styles.pizzaImgContainer}>
              {/* <Image
                source={require("./assets/images/image_DrUG..png")}
                resizeMode="contain"
                style={[
                  styles.pizzaImg,
                  screenWidth < 1000 && {
                    height: 350,
                    width: 200,
                    right: 0,
                    top: 0,
                    position: "absolute",
                  },
                ]}
              /> */}
              <View style={styles.frontContainer}>
                <View style={styles.logoGroup}>
                  {storeDetails.hasLogo ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (page === 5) {
                          setpage(4);
                        } else {
                          setorderDetails({
                            ...orderDetails,
                            delivery: false,
                            address: null,
                          });
                          setpage(1);
                        }
                      }}
                    >
                      <Image
                        source={require("./assets/images/dpos-logo-white.png")}
                        resizeMode="contain"
                        style={styles.logo}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (page === 5) {
                          setpage(4);
                        } else {
                          setorderDetails({
                            ...orderDetails,
                            delivery: false,
                            address: null,
                          });
                          setpage(1);
                        }
                      }}
                    >
                      <Text
                        style={[
                          { fontSize: 35, fontWeight: "700", color: "white" },
                          screenWidth < 1000 && { fontSize: 30 },
                        ]}
                      >
                        {storeDetails.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Image
                    source={require("./assets/images/image_ridw..png")}
                    resizeMode="contain"
                    style={styles.dash}
                  ></Image>
                </View>
                {screenWidth > 1000 ? (
                  <Elements stripe={loadStripe(storeDetails.stripePublicKey)}>
                    <CheckOutDetails
                      storeDetails={storeDetails}
                      setorderDetails={setorderDetails}
                      orderDetails={orderDetails}
                      setpage={setpage}
                      width={screenWidth > 1000 ? 380 : screenWidth * 0.9}
                    />
                  </Elements>
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Elements stripe={loadStripe(storeDetails.stripePublicKey)}>
                      <CheckOutDetails
                        storeDetails={storeDetails}
                        setorderDetails={setorderDetails}
                        orderDetails={orderDetails}
                        setpage={setpage}
                        width={screenWidth > 1000 ? 380 : screenWidth * 0.9}
                      />
                    </Elements>
                  </View>
                )}
                <View style={styles.bottomRowGroup}>
                  <View style={styles.detailsLocationGroup}>
                    <View style={styles.phoneNumberRow}>
                      <FontAwesome
                        name="phone"
                        style={[
                          styles.phoneNumberIcon,
                          screenWidth < 1000 && { fontSize: 35 },
                        ]}
                      ></FontAwesome>
                      <Text style={styles.phoneNumberTxt}>
                        {storeDetails.phoneNumber}
                      </Text>
                    </View>
                    <View style={styles.addressRow}>
                      <Entypo
                        name="location-pin"
                        style={[
                          styles.addressIcon,
                          screenWidth < 1000 && { fontSize: 35 },
                        ]}
                      ></Entypo>
                      <Text style={styles.addressTxt}>
                        {
                          storeDetails.address?.value.structured_formatting
                            .main_text
                        }
                        {"\n"}
                        {
                          storeDetails.address?.value.structured_formatting
                            .secondary_text
                        }
                      </Text>
                    </View>
                  </View>
                  {storeDetails.hasSocial && (
                    <View style={styles.socialIconsGroup}>
                      <Image
                        source={require("./assets/images/image_pDaA..png")}
                        resizeMode="contain"
                        style={styles.facebookIcon}
                      ></Image>
                      <Image
                        source={require("./assets/images/image_CLpi..png")}
                        resizeMode="contain"
                        style={styles.instagramIcon}
                      ></Image>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
  },
  plantImgContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  plantImg: {
    height: 520,
    width: 200,
  },
  wingImgContainer: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wingImg: {
    height: 200,
    width: "50%",
  },
  pizzaImgContainer: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  pizzaImg: {
    height: 1000,
    width: 401,
  },
  frontContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoGroup: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    padding: 10,
  },
  logo: {
    width: 237,
    height: 78,
  },
  dash: {
    height: 35,
    width: "50%",
  },
  btnContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    width: 683,
  },
  pickupBtn: {
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
  },
  pickupBtnTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  deliveryBtn: {
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
  },
  deliveryBtnTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  bottomRowGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    alignSelf: "stretch",
  },
  detailsLocationGroup: {
    justifyContent: "center",
    margin: 10,
  },
  phoneNumberRow: {
    width: 231,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneNumberIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 50,
  },
  phoneNumberTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  addressRow: {
    width: 231,
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 50,
  },
  addressTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 23,
  },
  socialIconsGroup: {
    width: 190,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  facebookIcon: {
    height: 57,
    width: 72,
  },
  instagramIcon: {
    height: 57,
    width: 72,
  },
});

export default OnlineOrderHomeCheckout;
