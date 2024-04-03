import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DropdownPeriod from '../DropdownPeriod';
import ShowEmployeeItem from '../ShowEmployeeItem';

const EmployeesBox = () => {
  return (
    <View style={styles.employeesContainer}>
      <View style={styles.employeesInnerContainer}>
        <View style={styles.employeesHeaderRow}>
          <Text style={styles.employees}>Employees</Text>
          <DropdownPeriod
            dropdownPeriodLbl="Today"
            style={styles.employeesDropdownPeriod}
          />
        </View>
        <View style={styles.employesWrapContainer}>
          <ShowEmployeeItem style={styles.showEmployeeItem} />
          <ShowEmployeeItem style={styles.showEmployeeItem2} />
          <ShowEmployeeItem style={styles.showEmployeeItem3} />
          <ShowEmployeeItem style={styles.showEmployeeItem4} />
        </View>
      </View>
    </View>
  );
}

export default EmployeesBox

const styles = StyleSheet.create({
  employeesContainer: {
    width: 383,
    height: 218,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  employeesInnerContainer: {
    width: 347,
    height: 191,
  },
  employeesHeaderRow: {
    width: 347,
    height: 27,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  employees: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  employeesDropdownPeriod: {
    height: 27,
    width: 84,
  },
  employesWrapContainer: {
    width: 271,
    height: 135,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  showEmployeeItem: {
    height: 38,
    width: 125,
  },
  showEmployeeItem2: {
    height: 38,
    width: 125,
  },
  showEmployeeItem3: {
    height: 38,
    width: 125,
  },
  showEmployeeItem4: {
    height: 38,
    width: 125,
  },
});