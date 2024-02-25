// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Image,
//   TouchableOpacity,
//   Text,
//   useWindowDimensions,
// } from "react-native";
// import { FontAwesome, Entypo } from "@expo/vector-icons";

// function OnlineOrderHome(props) {
//   const width = useWindowDimensions().width;

//   return (
//     <View style={styles.container}>
//       <View style={styles.logoGroup}>
//         <Image
//           source={require("./assets/images/dpos-logo-white.png")}
//           resizeMode="contain"
//           style={styles.logo}
//         ></Image>
//         <Image
//           source={require("./assets/images/image_ridw..png")}
//           resizeMode="contain"
//           style={[styles.dash, { width: width * 0.4 }]}
//         ></Image>
//       </View>
//       <View style={styles.btnContainerRow}>
//         <TouchableOpacity style={styles.pickupBtn}>
//           <Text style={styles.pickupBtnTxt}>PICK UP</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.deliveryBtn}>
//           <Text style={styles.deliveryBtnTxt}>DELIVERY</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.bottomRowGroup}>
//         <View style={styles.detailsLocationGroup}>
//           <View style={styles.phoneNumberRow}>
//             <FontAwesome
//               name="phone"
//               style={styles.phoneNumberIcon}
//             ></FontAwesome>
//             <Text style={styles.phoneNumberTxt}>(226) 600-5925</Text>
//           </View>
//           <View style={styles.addressRow}>
//             <Entypo name="location-pin" style={styles.addressIcon}></Entypo>
//             <Text style={styles.addressTxt}>
//               32 Sunrise Drive,{"\n"}Kitchener, Ontario
//             </Text>
//           </View>
//         </View>
//         <View style={styles.socialIconsGroup}>
//           <Image
//             source={require("./assets/images/image_pDaA..png")}
//             resizeMode="contain"
//             style={styles.facebookIcon}
//           ></Image>
//           <Image
//             source={require("./assets/images/image_CLpi..png")}
//             resizeMode="contain"
//             style={styles.instagramIcon}
//           ></Image>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgba(30,30,30,1)",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   logoGroup: {
//     height: 80,
//     padding: 10,
//     justifyContent: "space-between",
//     alignSelf: "flex-start",
//   },
//   logo: {
//     width: 237,
//     height: 66,
//   },
//   dash: {
//     height: 25,
//   },
//   btnContainerRow: {
//     flexDirection: "row",
//     width: 683,
//     justifyContent: "space-between",
//   },
//   pickupBtn: {
//     width: 219,
//     height: 60,
//     backgroundColor: "rgba(238,125,67,1)",
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "rgba(0,0,0,1)",
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//     elevation: 30,
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   pickupBtnTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   deliveryBtn: {
//     width: 219,
//     height: 60,
//     backgroundColor: "rgba(238,125,67,1)",
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "rgba(0,0,0,1)",
//     shadowOffset: {
//       width: 3,
//       height: 3,
//     },
//     elevation: 30,
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   deliveryBtnTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   bottomRowGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     alignSelf: "stretch",
//   },
//   detailsLocationGroup: {
//     justifyContent: "center",
//     margin: 10,
//   },
//   phoneNumberRow: {
//     width: 240,
//     height: 65,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   phoneNumberIcon: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 50,
//   },
//   phoneNumberTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 25,
//     fontWeight: "500",
//   },
//   addressRow: {
//     width: 231,
//     height: 65,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   addressIcon: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 50,
//   },
//   addressTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 23,
//   },
//   socialIconsGroup: {
//     width: 190,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     margin: 10,
//   },
//   facebookIcon: {
//     height: 57,
//     width: 72,
//   },
//   instagramIcon: {
//     height: 57,
//     width: 72,
//   },
// });

// export default OnlineOrderHome;

import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DeliveryDetails from "./components/home/DeliveryDetails";
import PickupDetails from "./components/home/PickupDetails";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import CheckOutDetails from "./components/home/CheckOutDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function OnlineOrderHome({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  page,
}) {
  const [enterDetailsSection, setenterDetailsSection] = useState(
    page === 3 ? "checkout" : null
  );
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  const RenderDetailsSection = () => {
    if (enterDetailsSection === "delivery") {
      return (
        <DeliveryDetails
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
          width={screenWidth > 1000 ? 380 : screenWidth * 0.9}
        />
      );
    } else if (enterDetailsSection === "pickup") {
      return (
        <PickupDetails
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
        />
      );
    } else if (page === 3) {
      return (
        <Elements stripe={loadStripe(storeDetails.stripePublicKey)}>
          <CheckOutDetails
            storeDetails={storeDetails}
            setorderDetails={setorderDetails}
            orderDetails={orderDetails}
            setpage={setpage}
          />
        </Elements>
      );
    } else {
      return (
        <Text style={{ fontSize: 35, fontWeight: "700", color: "white" }}>
          Thank you for placing a order.
        </Text>
      );
    }
  };

  return (
    <Container>
      <BackgroundContainer>
        {screenWidth > 1000 ? (
          <>
            <PlantImg src={require("./assets/images/image_JqcD..png")} />
            <WingImg src={require("./assets/images/image_BSgk..png")} />
            <PizzaImg src={require("./assets/images/image_DrUG..png")} />
          </>
        ) : (
          <>
            <PlantImgMobile src={require("./assets/images/image_JqcD..png")} />
            <WingImgMobile src={require("./assets/images/sidewings.png")} />
            <PizzaImgMobile src={require("./assets/images/image_DrUG..png")} />
          </>
        )}
        <FrontContainer>
          <LogoGroup>
            {storeDetails.hasLogo ? (
              <Logo
                onClick={() => {
                  if (page > 1) {
                    setpage((prev) => prev - 1);
                  } else {
                    setorderDetails({
                      ...orderDetails,
                      delivery: false,
                      address: null,
                    });
                    setenterDetailsSection(null);
                  }
                }}
                src={require("./assets/images/dpos-logo-white.png")}
              ></Logo>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (page > 1) {
                    setpage((prev) => prev - 1);
                  } else {
                    setorderDetails({
                      ...orderDetails,
                      delivery: false,
                      address: null,
                    });
                    setenterDetailsSection(null);
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
            <Dash src={require("./assets/images/image_ridw..png")} />
          </LogoGroup>
          {!enterDetailsSection ? (
            <>
              {screenWidth > 1000 ? (
                <>
                  {storeDetails.acceptDelivery ? (
                    <BtnContainerRow>
                      <PickupBtn
                        onClick={() => setenterDetailsSection("pickup")}
                      >
                        <ButtonOverlay>
                          <PickupBtnTxt>PICK UP</PickupBtnTxt>
                        </ButtonOverlay>
                      </PickupBtn>
                      <DeliveryBtn
                        onClick={() => {
                          setorderDetails({ ...orderDetails, delivery: true });
                          setenterDetailsSection("delivery");
                        }}
                      >
                        <ButtonOverlay>
                          <DeliveryBtnTxt>DELIVERY</DeliveryBtnTxt>
                        </ButtonOverlay>
                      </DeliveryBtn>
                    </BtnContainerRow>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PickupBtn
                        onClick={() => setenterDetailsSection("pickup")}
                      >
                        <ButtonOverlay>
                          <PickupBtnTxt>PICK UP</PickupBtnTxt>
                        </ButtonOverlay>
                      </PickupBtn>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {storeDetails.acceptDelivery ? (
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PickupBtn
                        onClick={() => setenterDetailsSection("pickup")}
                      >
                        <ButtonOverlay>
                          <PickupBtnTxt>PICK UP</PickupBtnTxt>
                        </ButtonOverlay>
                      </PickupBtn>
                      <div style={{ height: 30 }}></div>
                      <DeliveryBtn
                        onClick={() => {
                          setorderDetails({ ...orderDetails, delivery: true });
                          setenterDetailsSection("delivery");
                        }}
                      >
                        <ButtonOverlay>
                          <DeliveryBtnTxt>DELIVERY</DeliveryBtnTxt>
                        </ButtonOverlay>
                      </DeliveryBtn>
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
                      <PickupBtn
                        onClick={() => setenterDetailsSection("pickup")}
                      >
                        <ButtonOverlay>
                          <PickupBtnTxt>PICK UP</PickupBtnTxt>
                        </ButtonOverlay>
                      </PickupBtn>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {screenWidth > 1000 ? (
                <RenderDetailsSection />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <RenderDetailsSection />
                </View>
              )}
            </>
          )}
          <BottomRowGroup>
            <DetailsLocationGroup>
              {screenWidth > 1000 ? (
                <>
                  <PhoneNumberRow>
                    <FontAwesome
                      name="phone"
                      style={{
                        color: "rgba(255,255,255,1)",
                        fontSize: 50,
                      }}
                    ></FontAwesome>
                    <PhoneNumberTxt>{storeDetails.phoneNumber}</PhoneNumberTxt>
                  </PhoneNumberRow>
                  <AddressRow>
                    <Entypo
                      name="location-pin"
                      style={{
                        color: "rgba(255,255,255,1)",
                        fontSize: 50,
                      }}
                    ></Entypo>
                    <AddressTxt>
                      {
                        storeDetails.address?.value.structured_formatting
                          .main_text
                      }
                      {"\n"}
                      {
                        storeDetails.address?.value.structured_formatting
                          .secondary_text
                      }
                    </AddressTxt>
                  </AddressRow>
                </>
              ) : (
                <>
                  <PhoneNumberRowMobile>
                    <FontAwesome
                      name="phone"
                      style={{
                        color: "rgba(255,255,255,1)",
                        fontSize: 35,
                      }}
                    ></FontAwesome>
                    <PhoneNumberTxtMobile>
                      {storeDetails.phoneNumber}
                    </PhoneNumberTxtMobile>
                  </PhoneNumberRowMobile>
                  <AddressRowMobile>
                    <Entypo
                      name="location-pin"
                      style={{
                        color: "rgba(255,255,255,1)",
                        fontSize: 35,
                      }}
                    ></Entypo>
                    <AddressTxtMobile>
                      {
                        storeDetails.address?.value.structured_formatting
                          .main_text
                      }
                      {"\n"}
                      {
                        storeDetails.address?.value.structured_formatting
                          .secondary_text
                      }
                    </AddressTxtMobile>
                  </AddressRowMobile>
                </>
              )}
            </DetailsLocationGroup>
            {storeDetails.hasSocial && (
              <SocialIconsGroup>
                <FacebookIcon
                  src={require("./assets/images/image_pDaA..png")}
                ></FacebookIcon>
                <InstagramIcon
                  src={require("./assets/images/image_CLpi..png")}
                ></InstagramIcon>
              </SocialIconsGroup>
            )}
          </BottomRowGroup>
        </FrontContainer>
      </BackgroundContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(30, 30, 30, 1);
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
const BackgroundContainer = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1 1 0%;
`;

const PlantImg = styled.img`
  width: 200px;
  object-fit: contain;
  position: absolute;
  bottom: 5vh;
  left: 0px;
`;
const PlantImgMobile = styled.img`
  width: 20%;
  object-fit: contain;
  position: absolute;
  bottom: 18vh;
  left: 0px;
`;

const WingImg = styled.img`
  width: 40%;
  object-fit: contain;
  bottom: 0px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
`;
const WingImgMobile = styled.img`
  width: 40%;
  object-fit: contain;
  position: absolute;
  bottom: 13vh;
  right: 0px;
`;

const PizzaImg = styled.img`
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0px;
  right: 0px;
`;
const PizzaImgMobile = styled.img`
  height: 40%;
  object-fit: contain;
  position: absolute;
  top: 10vh;
  right: 0px;
`;

const FrontContainer = styled.div`
  flex: 1 1 0%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const LogoGroup = styled.div`
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  height: 110px;
  padding: 10px;
  display: flex;
`;

const Logo = styled.img`
  width: 237px;
  height: 100%;
  object-fit: contain;
`;

const Dash = styled.img`
  height: 100%;
  width: 50vw;
  object-fit: contain;
`;

const BtnContainerRow = styled.div`
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  width: 683px;
  display: flex;
`;

const PickupBtn = styled.div`
  width: 219px;
  height: 60px;
  background-color: rgba(238, 125, 67, 1);
  border-radius: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 3px 3px 10px 0.2px rgba(0, 0, 0, 1);
`;

const PickupBtnTxt = styled.span`
  font-style: normal;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
`;

const DeliveryBtn = styled.div`
  width: 219px;
  height: 60px;
  background-color: rgba(238, 125, 67, 1);
  border-radius: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 3px 3px 10px 0.2px rgba(0, 0, 0, 1);
`;

const DeliveryBtnTxt = styled.span`
  font-style: normal;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
`;

const BottomRowGroup = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 150px;
  width: 100vw;
  display: flex;
`;

const DetailsLocationGroup = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  display: flex;
`;

const PhoneNumberRow = styled.div`
  width: 230px;
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;
const PhoneNumberRowMobile = styled.div`
  width: 180px;
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const PhoneNumberTxt = styled.span`
  font-style: normal;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
`;
const PhoneNumberTxtMobile = styled.span`
  font-style: normal;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;

const AddressRow = styled.div`
  width: 250px;
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;
const AddressRowMobile = styled.div`
  width: 200px;
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const AddressTxt = styled.span`
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
`;
const AddressTxtMobile = styled.span`
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
`;

const SocialIconsGroup = styled.div`
  width: 190px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  display: flex;
`;

const FacebookIcon = styled.img`
  height: 57px;
  width: 100%;
  object-fit: contain;
`;

const InstagramIcon = styled.img`
  height: 57px;
  width: 100%;
  object-fit: contain;
`;

export default OnlineOrderHome;
