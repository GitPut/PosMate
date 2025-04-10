import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { employeesState } from "state/state";
import { Ionicons } from "@expo/vector-icons";
import EmployeeClockInItem from "./components/EmployeeClockInItem";
import Modal from "react-native-modal-web";
import { posHomeState, updatePosHomeState } from "state/posHomeState";

const ClockinModal = () => {
  const { height, width } = useWindowDimensions();
  const employees = employeesState.use();
  const { clockinModal } = posHomeState.use();

  return (
    <Modal isVisible={clockinModal} animationIn="fadeIn" animationOut="fadeOut">
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => updatePosHomeState({ clockinModal: false })}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
            width: width,
          }}
        >
          <Pressable>
            <div style={{ cursor: "default" }}>
              <View style={styles.container}>
                <View style={styles.closeIconContainer}>
                  <Pressable
                    onPress={() => updatePosHomeState({ clockinModal: false })}
                  >
                    <Ionicons name="close" style={styles.closeIcon} />
                  </Pressable>
                </View>
                <View style={styles.secondAreaContainer}>
                  <Text style={styles.employeesClockIn}>
                    Employee&#39;s Clock-In
                  </Text>
                  <View style={styles.employeesScrollView}>
                    <ScrollView
                      horizontal={false}
                      contentContainerStyle={
                        styles.employeesScrollView_contentContainerStyle
                      }
                    >
                      {employees.map((employee) => {
                        const isClockedIn = employee.clockedIn?.startTime;

                        return (
                          <EmployeeClockInItem
                            key={employee.id}
                            employee={employee}
                            employees={employees}
                            isClockedIn={isClockedIn ? true : false}
                          />
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </div>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: 540,
    height: 609,
  },
  closeIconContainer: {
    width: 540,
    height: 58,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  closeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    margin: 20,
  },
  secondAreaContainer: {
    width: 421,
    height: 523,
    justifyContent: "space-between",
    alignItems: "center",
  },
  employeesClockIn: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  employeesScrollView: {
    height: 460,
    margin: 0,
  },
  employeesScrollView_contentContainerStyle: {
    height: "100%",
    width: 421,
    alignItems: "center",
    paddingTop: 3,
    paddingRight: 25,
    marginLeft: 25,
  },
  employeeClockInItem: {
    height: 84,
    width: 415,
    marginBottom: 30,
  },
  employeeClockInItem1: {
    height: 84,
    width: 415,
    marginBottom: 30,
  },
  employeeClockInItem2: {
    height: 84,
    width: 415,
    marginBottom: 30,
  },
  employeeClockInItem3: {
    height: 84,
    width: 415,
    marginBottom: 30,
  },
  employeeClockInItem4: {
    height: 84,
    width: 415,
    marginBottom: 30,
  },
});

export default ClockinModal;
