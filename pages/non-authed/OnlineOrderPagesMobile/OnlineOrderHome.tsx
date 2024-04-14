import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DeliveryDetails from "./components/home/DeliveryDetails";
import PickupDetails from "./components/home/PickupDetails";
import { Text, Pressable, View } from "react-native";
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

  const RenderDetailsSection = () => {
    if (enterDetailsSection === "delivery") {
      return (
        <DeliveryDetails
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
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
        <PlantImg src={require("./assets/images/image_JqcD..png")}></PlantImg>
        <WingImg src={require("./assets/images/image_BSgk..png")} />
        <PizzaImg src={require("./assets/images/image_DrUG..png")}></PizzaImg>
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
              <Pressable
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
                  style={{ fontSize: 35, fontWeight: "700", color: "white" }}
                >
                  {storeDetails.name}
                </Text>
              </Pressable>
            )}
            <Dash src={require("./assets/images/image_ridw..png")}></Dash>
          </LogoGroup>
          {!enterDetailsSection ? (
            <>
              {storeDetails.acceptDelivery ? (
                <BtnContainerRow>
                  <PickupBtn onClick={() => setenterDetailsSection("pickup")}>
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
                  <PickupBtn onClick={() => setenterDetailsSection("pickup")}>
                    <ButtonOverlay>
                      <PickupBtnTxt>PICK UP</PickupBtnTxt>
                    </ButtonOverlay>
                  </PickupBtn>
                </div>
              )}
            </>
          ) : (
            <RenderDetailsSection />
          )}
          <BottomRowGroup>
            <DetailsLocationGroup>
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
                  {storeDetails.address?.value.structured_formatting.main_text}
                  {"\n"}
                  {
                    storeDetails.address?.value.structured_formatting
                      .secondary_text
                  }
                </AddressTxt>
              </AddressRow>
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

const PizzaImg = styled.img`
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0px;
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
  width: 673px;
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

const PhoneNumberTxt = styled.span`
  font-style: normal;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
`;

const AddressRow = styled.div`
  width: 250px;
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
