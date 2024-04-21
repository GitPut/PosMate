import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import {
  Text,
  Pressable,
  View,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import {
  OrderDetailsState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";

function OnlineOrderHome() {
  const storeDetails = storeDetailState.use();
  const orderDetails = OrderDetailsState.use();
  const page = orderDetails.page;
  const screenWidth = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.plantImgContainer}>
          <View style={styles.wingImgContainer}>
            <View style={styles.pizzaImgContainer}>
              <View style={styles.frontContainer}>
                <View style={styles.logoGroup}>
                  {storeDetails.hasLogo ? (
                    <Pressable
                      onPress={() => {
                        if (page === 5) {
                          setOrderDetailsState({
                            page: 4,
                          });
                        } else {
                          setOrderDetailsState({
                            ...orderDetails,
                            delivery: false,
                            address: null,
                            page: 1,
                          });
                        }
                      }}
                    >
                      <Image
                        source={require("./assets/images/dpos-logo-white.png")}
                        resizeMode="contain"
                        style={styles.logo}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        if (page === 5) {
                          setOrderDetailsState({
                            page: 4,
                          });
                        } else {
                          setOrderDetailsState({
                            ...orderDetails,
                            delivery: false,
                            address: null,
                            page: 1,
                          });
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
                    </Pressable>
                  )}
                  <Image
                    source={require("./assets/images/image_ridw..png")}
                    resizeMode="contain"
                    style={styles.dash}
                  ></Image>
                </View>
                {screenWidth > 1000 ? (
                  <>
                    {storeDetails.acceptDelivery ? (
                      <View style={styles.btnContainerRow}>
                        <Pressable
                          style={styles.pickupBtn}
                          onPress={() =>
                            setOrderDetailsState({
                              page: 2,
                            })
                          }
                        >
                          <Text style={styles.pickupBtnTxt}>PICK UP</Text>
                        </Pressable>
                        <Pressable
                          style={styles.deliveryBtn}
                          onPress={() => {
                            setOrderDetailsState({
                              ...orderDetails,
                              delivery: true,
                              page: 3,
                            });
                          }}
                        >
                          <Text style={styles.deliveryBtnTxt}>DELIVERY</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Pressable
                          style={styles.pickupBtn}
                          onPress={() =>
                            setOrderDetailsState({
                              page: 2,
                            })
                          }
                        >
                          <Text style={styles.pickupBtnTxt}>PICK UP</Text>
                        </Pressable>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {storeDetails.acceptDelivery ? (
                      <View>
                        <Pressable
                          style={[styles.pickupBtn, { marginBottom: 20 }]}
                          onPress={() =>
                            setOrderDetailsState({
                              page: 2,
                            })
                          }
                        >
                          <Text style={styles.pickupBtnTxt}>PICK UP</Text>
                        </Pressable>
                        <Pressable
                          style={styles.deliveryBtn}
                          onPress={() => {
                            setOrderDetailsState({
                              ...orderDetails,
                              delivery: true,
                              page: 3,
                            });
                          }}
                        >
                          <Text style={styles.deliveryBtnTxt}>DELIVERY</Text>
                        </Pressable>
                      </View>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Pressable
                          style={styles.pickupBtn}
                          onPress={() =>
                            setOrderDetailsState({
                              page: 2,
                            })
                          }
                        >
                          <Text style={styles.pickupBtnTxt}>PICK UP</Text>
                        </Pressable>
                      </div>
                    )}
                  </>
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
                      />
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
                      />
                      <Text style={styles.addressTxt}>
                        {
                          storeDetails.address?.value?.structured_formatting?.main_text
                        }
                        {"\n"}
                        {
                          storeDetails.address?.value?.structured_formatting?.secondary_text
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
    height: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumberIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    marginRight: 15,
  },
  phoneNumberTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
  },
  addressRow: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  addressIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    marginRight: 10
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

export default OnlineOrderHome;
