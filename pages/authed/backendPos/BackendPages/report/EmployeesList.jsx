import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView
} from "react-native";
import EmployeeItem from "./components/EmployeeItem";
import { employeesState } from "state/state";
import Modal from "react-native-modal";
import AddEmployeeModal from "./modals/AddEmployeeModal";

const EmployeesReport = () => {
    const employees = employeesState.use()
    const [addEmployeeModal, setaddEmployeeModal] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.employeeReportTopHeaderTxt}>Employee Report</Text>
                <Pressable style={styles.addEmployeeBtn} activeOpacity={0.6} onPress={() => setaddEmployeeModal(true)}>
                    <Text style={styles.addEmployeeBtnLbl}>Add Employee</Text>
                </Pressable>
            </View>
            <View style={styles.employeeMapContainer}>
                <View style={styles.innerMapContainer}>
                    <View style={styles.employeeNameTopRowHeader}>
                        <Text style={styles.employeeNameHeader}>Employee Name</Text>
                    </View>
                    <View style={styles.employeeMap}>
                        <ScrollView
                            horizontal={false}
                            contentContainerStyle={styles.employeeMap_contentContainerStyle}
                        >
                            {employees.length > 0 ?
                                employees.map((employee, index) =>
                                    <EmployeeItem key={index} style={styles.employeeItem} employee={employee} />)
                                :
                                <Text>No Employees</Text>
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Modal
                isVisible={addEmployeeModal}
                animationIn="fadeIn"
                animationOut="fadeOut"
            >
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
                    <AddEmployeeModal setaddEmployeeModal={setaddEmployeeModal} addEmployeeModal={addEmployeeModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 506,
        paddingRight: 20
    },
    topRow: {
        width: '100%',
        height: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    employeeReportTopHeaderTxt: {
        fontWeight: '700',
        color: "#121212",
        fontSize: 16
    },
    addEmployeeBtn: {
        width: 172,
        height: 48,
        backgroundColor: "#1c294e",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    addEmployeeBtnLbl: {
        color: "rgba(255,255,255,1)",
        fontSize: 14
    },
    employeeMapContainer: {
        height: 417,
        borderWidth: 1,
        borderColor: "#bdbfc9",
        shadowColor: "#c5c7d1",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 60,
        shadowOpacity: 1,
        shadowRadius: 20,
        alignItems: "center",
        marginTop: 41,
        backgroundColor: 'white',
    },
    innerMapContainer: {
        height: 301,
        justifyContent: "flex-start",
        marginTop: 32,
        width: '95%'
    },
    employeeNameTopRowHeader: {
        width: '100%',
        height: 36,
        borderWidth: 0,
        borderColor: "#cbcdda",
        borderBottomWidth: 1,
        justifyContent: "flex-start",
        paddingRight: 20
    },
    employeeNameHeader: {
        fontWeight: '700',
        color: "#61656f"
    },
    employeeMap: {
        height: 266
    },
    employeeMap_contentContainerStyle: {
        height: 266,
        width: '100%',
        alignItems: "center",
        paddingRight: 20
    },
    employeeItem: {
        height: 66,
        width: '100%'
    },
});

export default EmployeesReport;
