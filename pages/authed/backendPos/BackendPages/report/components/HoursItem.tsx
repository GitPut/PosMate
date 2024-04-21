import React from "react";
import { StyleSheet, View, Text, Pressable, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "state/firebaseConfig";
import { Employee, HourItem } from "types/global";

interface HoursItemProps {
  style?: ViewStyle;
  date: Date;
  hour: HourItem;
  employee: Employee;
  allHours: HourItem[];
  setallHours: (val: HourItem[]) => void;
  index: number;
  isPaid: boolean;
}

function HoursItem({
  style,
  date,
  hour,
  employee,
  allHours,
  setallHours,
  index,
  isPaid,
}: HoursItemProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.checkboxGroup}>
        <View style={styles.checkbox}></View>
      </View>
      <Text style={styles.enteredDateTxt}>{date.toDateString()}</Text>
      <Text style={styles.enteredInTimeTxt}>{hour.startTime}</Text>
      <Text style={styles.enteredOutTimeTxt1}>{hour.endTime}</Text>
      <View style={styles.optionsRow}>
        <Pressable
          onPress={() => {
            db.collection("users")
              .doc(auth.currentUser?.uid)
              .collection("employees")
              .doc(employee.id.toString())
              .collection("hours")
              .doc(hour.id.toString())
              .delete();
            const newHours = [...allHours];
            newHours.splice(index, 1);
            setallHours(newHours);
          }}
        >
          <Feather name="trash" style={styles.trashIcon} />
        </Pressable>
        {isPaid ? (
          <Pressable
            style={styles.markedAsPaidBtn}
            onPress={() => {
              db.collection("users")
                .doc(auth.currentUser?.uid)
                .collection("employees")
                .doc(employee.id.toString())
                .collection("hours")
                .doc(hour.id.toString())
                .update({
                  paid: false,
                });
              const newHours = [...allHours];
              newHours[index].paid = false;
              setallHours(newHours);
            }}
          >
            <Text style={styles.markAsPaidTxt}>Mark Unpaid</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.markedAsPaidBtn}
            onPress={() => {
              db.collection("users")
                .doc(auth.currentUser?.uid)
                .collection("employees")
                .doc(employee.id.toString())
                .collection("hours")
                .doc(hour.id.toString())
                .update({
                  paid: true,
                });
              const newHours = [...allHours];
              newHours[index].paid = true;
              setallHours(newHours);
            }}
          >
            <Text style={styles.markAsPaidTxt}>Mark as Paid</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxGroup: {
    width: 233,
    height: 11,
    justifyContent: "center",
  },
  checkbox: {
    width: 12,
    height: 12,
    backgroundColor: "#E6E6E6",
    marginLeft: 20,
  },
  enteredDateTxt: {
    color: "#121212",
    width: 210,
    height: 17,
  },
  enteredInTimeTxt: {
    color: "#121212",
    width: 210,
    height: 17,
  },
  enteredOutTimeTxt1: {
    color: "#121212",
    width: 170,
    height: 17,
  },
  optionsRow: {
    width: 165,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trashIcon: {
    color: "#eb1f1e",
    fontSize: 30,
  },
  markedAsPaidBtn: {
    width: 112,
    height: 41,
    backgroundColor: "#1c294e",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  markAsPaidTxt: {
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default HoursItem;
