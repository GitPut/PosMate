import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";

const OrderPage = () => {
  const { store } = useParams();

  return (
    <View>
      <Image
        src={require("assets/dpos-logo-black.png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
          <Modal visible={true} transparent={true}>
              <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: "100%", height: "100%" }}>
        <Text>Welcome to {store}</Text>
              </View>
      </Modal>
    </View>
  );
};

export default OrderPage;

const styles = StyleSheet.create({});
