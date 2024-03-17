import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useHistory } from "react-router-dom";

function EmployeeItem({ employee, style }) {
  const history = useHistory();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.5}
      onPress={() => history.push(`/authed/report/editemployee/${employee.id}`)}
    >
      <View style={styles.employeeItemRowLeftContainer}>
        <View style={styles.personIconContainer}>
          <MaterialIcons name="person-outline" style={styles.personIcon} />
        </View>
        <Text style={styles.employeeNameLbl}>{employee.name}</Text>
      </View>
      <Ionicons name="chevron-forward" style={styles.chevronRight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: "#cfd0dd",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  employeeItemRowLeftContainer: {
    width: 501,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  personIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#eef2ff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  personIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 29,
  },
  employeeNameLbl: {
    color: "#121212",
    fontSize: 16,
  },
  chevronRight: {
    color: "#909ba5",
    fontSize: 25,
    marginRight: 8,
  },
});

export default EmployeeItem;
