import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "@react-native-material/core";
import {
  cartState,
  customersList,
  employeesState,
  setCartState,
  setCustomersList,
  setEmployeesState,
} from "state/state";
import { Switch } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { addCustomerDetailsToDb } from "state/firebaseFunctions";
import { auth, db } from "state/firebaseConfig";
import CartItem from "components/CartItem";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const ClockinModal = ({ setclockinModal }) => {
  const { height, width } = useWindowDimensions();
  const employees = employeesState.use();

  return (
    <>
      <TouchableOpacity
        onPress={() => setclockinModal(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          height: height,
          width: width,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "rgba(255,255,255,1)",
          borderRadius: 30,
          shadowColor: "rgba(0,0,0,1)",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 30,
          shadowOpacity: 0.57,
          shadowRadius: 10,
          width: "35%",
          height: "85%",
          padding: 40,
          alignSelf: "center",
          top: "7.5%",
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                borderBottomColor: "#F3F2F2",
                borderBottomWidth: 1,
                marginBottom: 25,
              },
            ]}
          >
            <Text
              style={{
                margin: 25,
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              Employee's Clock In
            </Text>
          </View>
          <ScrollView style={{ height: "100%", minHeight: 300 }}>
            {employees.map((employee) => {
              const isClockedIn = employee.clockedIn;
              const [enteredPin, setenteredPin] = useState(null);

              return (
                <View
                  key={employee.id}
                  style={{
                    backgroundColor: "#E6E6E6",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 40,
                    marginTop: 15,
                    borderWidth: 1,
                    width: "100%",
                    alignSelf: "center",
                  }}
                  // onPress={() => setcustomerSelected(customer)}
                >
                  <View style={styles.nameGroup}>
                    <MaterialCommunityIcons
                      name="account"
                      style={styles.personIcon}
                    />
                    <Text style={styles.customerNameTxt}>{employee.name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      placeholder="Type in PIN"
                      style={{
                        backgroundColor: "white",
                        padding: 5,
                        width: 100,
                      }}
                      value={enteredPin}
                      onChangeText={(val) => setenteredPin(val)}
                    />
                    <View style={{ width: 10 }} />
                    <Button
                      title={isClockedIn ? "Clocked Out" : "Clock In"}
                      onPress={() => {
                        if (enteredPin !== employee.pin && employee.pin)
                          return alert("Wrong PIN");
                        const date = new Date();
                        if (isClockedIn) {
                          const endTime = `${date.getHours()}:${
                            date.getMinutes() < 10
                              ? "0" + date.getMinutes()
                              : date.getMinutes()
                          }`;
                          db.collection("users")
                            .doc(auth.currentUser.uid)
                            .collection("employees")
                            .doc(employee.id)
                            .collection("hours")
                            .add({
                              date: employee.clockedIn.date,
                              startTime: employee.clockedIn.startTime,
                              endTime: endTime,
                            })
                            .then(() => {
                              db.collection("users")
                                .doc(auth.currentUser.uid)
                                .collection("employees")
                                .doc(employee.id)
                                .update({
                                  clockedIn: false,
                                });

                              const prev = [...employees];
                              prev[employees.indexOf(employee)].clockedIn =
                                false;
                              setEmployeesState(prev);
                            });
                          setenteredPin(null);
                        } else {
                          const startTime = `${date.getHours()}:${
                            date.getMinutes() < 10
                              ? "0" + date.getMinutes()
                              : date.getMinutes()
                          }`;
                          db.collection("users")
                            .doc(auth.currentUser.uid)
                            .collection("employees")
                            .doc(employee.id)
                            .update({
                              clockedIn: { startTime: startTime, date: date },
                            });

                          const prev = [...employees];
                          prev[employees.indexOf(employee)].clockedIn = {
                            startTime: startTime,
                            date: date,
                          };
                          setEmployeesState(prev);
                          setenteredPin(null);
                        }
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <Button
            title="Cancel"
            onPress={() => {
              setclockinModal(false);
            }}
            contentContainerStyle={styles.btn}
            style={{
              margin: 25,
              width: "80%",
              alignSelf: "center",
              backgroundColor: "#4050B5",
            }}
          />
        </View>
      </View>
    </>
  );
};

export default ClockinModal;

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
    width: 300,
  },
  modalContainer: {
    padding: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.57,
    shadowRadius: 10,
    width: "35%",
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
  },
  nameGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  personIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginRight: 10,
  },
  customerNameTxt: {
    fontFamily: "archivo-500",
    color: "#121212",
    fontSize: 15,
  },
  moreInfoIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  innerTxt: {
    fontSize: 13,
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    fontFamily: "archivo-600",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    opacity: 0.44,
  },
  fillTheCart: {
    fontFamily: "archivo-500",
    color: "rgba(74,74,74,1)",
    fontSize: 20,
  },
  openItemContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#64c74c",
    borderLeftWidth: 2,
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  optionsContainer: {
    width: 122,
    height: 38,
    justifyContent: "space-between",
    margin: 13,
    marginLeft: 19,
  },
  optionTxt: {
    fontFamily: "archivo-500",
    color: "rgba(187,187,186,1)",
  },
  editContainer: {
    width: 61,
    height: 38,
    flexDirection: "row",
    margin: 13,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 19,
  },
  editIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
  },
  editTxt: {
    fontFamily: "archivo-600",
    color: "rgba(74,74,74,1)",
  },
  closedItemContainer: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  closedLeftContainer: {
    flexDirection: "row",
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  openCloseIcon: {
    color: "#b1b1b1",
    fontSize: 30,
    marginRight: 15,
  },
  productIndexTxt: {
    fontFamily: "archivo-600",
    color: "#75767e",
    fontSize: 16,
    marginRight: 15,
  },
  productNameTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
  },
  closedRightContainer: {
    flexDirection: "row",
    width: "25%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPriceTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
  },
  productRemoveIcon: {
    color: "#9f9f9e",
    fontSize: 27,
  },
  deliveryIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  pickupIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
});
