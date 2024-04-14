import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import InputWithLbl from "../components/InputWithLbl";
import { auth, db } from "state/firebaseConfig";
import { employeesState, setEmployeesState } from "state/state";
import { useAlert } from "react-alert";

function AddEmployeeModal({ setaddEmployeeModal, addEmployeeModal }) {
  const { height, width } = useWindowDimensions();
  const employees = employeesState.use();
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [pin, setpin] = useState("");
  const alertP = useAlert();

  useEffect(() => {
    if (!addEmployeeModal) {
      setname("");
      setrole("");
      setpin("");
    }
  }, [addEmployeeModal]);

  const AddEmployee = () => {
    const employee = {
      name: name,
      role: role,
      pin: pin,
      id: Math.random().toString(36).substr(2, 9),
    };

    if (!employee.name) {
      alertP.error("Please enter a employee name");
      return;
    }
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("employees")
      .doc(employee.id.toString())
      .set(employee);
    setEmployeesState([...employees, employee]);
    setaddEmployeeModal(false);
  };

  return (
    <Pressable
      onPress={() => setaddEmployeeModal(false)}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.addEmployeeHeaderLbl}>Add Employee</Text>
              <View style={styles.inputsGroup}>
                <InputWithLbl
                  lbl="Name"
                  placeholder="Enter name"
                  style={styles.nameInput}
                  value={name}
                  setValue={setname}
                />
                <InputWithLbl
                  lbl="Role"
                  placeholder="Enter role"
                  style={styles.roleInput}
                  value={role}
                  setValue={setrole}
                />
                <InputWithLbl
                  lbl="Pin"
                  placeholder="Enter pin"
                  style={styles.pinInput}
                  value={pin}
                  setValue={setpin}
                />
              </View>
              <View style={styles.bottomBtnsRow}>
                <Pressable
                  style={styles.cancelBtn}
                  activeOpacity={0.6}
                  onPress={() => setaddEmployeeModal(false)}
                >
                  <Text style={styles.cancelBtnTxt}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.saveBtn}
                  activeOpacity={0.6}
                  onPress={AddEmployee}
                >
                  <Text style={styles.saveBtnTxt}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 609,
    height: 399,
    backgroundColor: "white",
  },
  innerContainer: {
    width: 352,
    height: 358,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addEmployeeHeaderLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 17,
  },
  inputsGroup: {
    width: 279,
    height: 258,
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameInput: {
    height: 77,
    width: 278,
  },
  roleInput: {
    height: 77,
    width: 278,
  },
  pinInput: {
    height: 77,
    width: 278,
  },
  bottomBtnsRow: {
    width: 352,
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelBtn: {
    width: 170,
    height: 47,
    borderRadius: 20,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnTxt: {
    fontWeight: "700",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
  },
  saveBtn: {
    width: 170,
    height: 47,
    borderRadius: 20,
    backgroundColor: "#1c294e",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
});

export default AddEmployeeModal;
