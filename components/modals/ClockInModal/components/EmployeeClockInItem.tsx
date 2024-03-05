import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "state/firebaseConfig";

function EmployeeClockInItem({
  employee,
  employees,
  setEmployeesState,
  isClockedIn,
  style,
}) {
  const [enteredPin, setenteredPin] = useState("");

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSideGroup}>
        <MaterialIcons name="person" style={styles.personIcon} />
        <Text style={styles.employeeName}>{employee.name}</Text>
      </View>
      <View style={styles.rightSideGroup}>
        <View style={styles.textInputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="PIN"
            onChangeText={(val) => setenteredPin(val)}
            value={enteredPin}
          />
          <TouchableOpacity
            style={[
              styles.button,
              isClockedIn && { backgroundColor: "#FF0000" },
            ]}
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
                    prev[employees.indexOf(employee)].clockedIn = false;
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
                    clockedIn: {
                      startTime: startTime,
                      date: date,
                    },
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
          >
            <Text style={styles.clockInLabel}>
              {isClockedIn ? "Clock Out" : "Clock In"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#edf1fe",
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSideGroup: {
    width: 114,
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
  },
  personIcon: {
    color: "#1c294e",
    fontSize: 55,
  },
  employeeName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  rightSideGroup: {
    width: 183,
    height: 49,
    margin: 15,
    flexDirection: "row",
  },
  textInput: {
    width: 85,
    height: 35,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b4b5b8",
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: 92,
    height: 49,
    backgroundColor: "#03c551",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7,
  },
  clockInLabel: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
  textInputRow: {
    height: 49,
    flexDirection: "row",
    flex: 1,
    marginRight: -1,
  },
});

export default EmployeeClockInItem;
