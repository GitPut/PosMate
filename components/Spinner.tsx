import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";

const Spinner = ({ isModalVisible }) => {
  return (
    <Modal visible={isModalVisible} transparent={true}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        }}
      >
        <style>
          {`.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`}
        </style>

        <div className="loader"></div>
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
