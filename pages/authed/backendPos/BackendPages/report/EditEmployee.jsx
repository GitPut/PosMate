import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import HoursItem from "./components/HoursItem";
import { employeesState, setEmployeesState } from 'state/state';
import { useHistory, useParams } from 'react-router-dom';
import { auth, db } from 'state/firebaseConfig';

function EditEmployee() {
    const { height, width } = Dimensions.get('window');
    const { employeeId } = useParams()
    const employees = employeesState.use()
    const [employee, setemployee] = useState(null);
    const [dateSelected, setdateSelected] = useState(null)
    const [startTime, setstartTime] = useState(null)
    const [endTime, setendTime] = useState(null)
    const [allHours, setallHours] = useState([])
    const [paidSelected, setpaidSelected] = useState([])
    const [unPaidSelected, setunPaidSelected] = useState([])

    const history = useHistory();
    const [error, seterror] = useState(false)

    useEffect(() => {
        if (employees.length > 0) {
            const myEmployee = employees.filter(e => e.id === employeeId)[0]

            if (!myEmployee) {
                history.push("/authed/report/employeesreport")
                return
            }

            setemployee(myEmployee)
            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(myEmployee.id.toString()).collection("hours").get().then((snapshot) => {
                if (snapshot.empty) return
                const hours = []
                snapshot.forEach((doc) => {
                    hours.push({ ...doc.data(), id: doc.id })
                })
                setallHours(hours)
            }
            )
        } else {
            history.push("/authed/report/employeesreport")
            return
        }
    }, [])

    function handleDataUpdate() {
        if (!employee.name) {
            seterror('Please enter a employee name')
            return
        }
        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employeeId).update({
            name: employee.name,
            pin: employee.pin ? employee.pin : null,
            role: employee.role ? employee.role : null
        })
        const newEmployeesList = [...employees]
        const index = newEmployeesList.findIndex(e => e.id === employee.id)
        newEmployeesList[index] = employee
        setEmployeesState(newEmployeesList)
        // history.push("/authed/report/employeesreport")
    }

    return (
        <View style={styles.container}>
            <View style={[styles.headerContainer, { height: height * 0.12 }]}>
                <TouchableOpacity style={{ flexDirection: 'row' }} activeOpacity={0.7} onPress={() => history.push("/authed/report/employeesreport")}>
                    <Entypo name="chevron-left" style={styles.chevronLeftIcon} />
                    <View style={styles.topHeaderGroup}>
                        <Text style={styles.employeeReportHeaderTxt}>Employee Report</Text>
                        <Text style={styles.employeeName}>{employee?.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {employee && <View style={{ height: height * 0.709 }}>
                <ScrollView style={styles.userEmployeeReport}
                    contentContainerStyle={{
                        // justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: 50
                    }}
                >
                    <View style={styles.topInputDetailsRow}>
                        <View style={styles.inputGroup}>
                            <View style={styles.employeeNameInputGroup}>
                                <Text style={styles.employeeNameTxt}>Employee Name</Text>
                                <TextInput style={styles.employeeNameInput} placeholder='Enter Name' value={employee?.name} onChangeText={(val) => setemployee((prevState) => ({
                                    ...prevState,
                                    name: val,
                                }))} onBlur={handleDataUpdate} />
                            </View>
                            <View style={styles.employeePinInputGroup}>
                                <Text style={styles.employeePinTxt}>Employee PIN</Text>
                                <TextInput style={styles.employeePinInput} placeholder='Enter PIN' value={employee?.pin} onChangeText={(val) => setemployee((prevState) => ({
                                    ...prevState,
                                    pin: val,
                                }))} onBlur={handleDataUpdate} />
                            </View>
                            <View style={styles.employeeRoleInputGroup}>
                                <Text style={styles.employeeRole}>Employee Role</Text>
                                <TextInput style={styles.employeeRoleInput} placeholder='Enter Role' value={employee?.role} onChangeText={(val) => setemployee((prevState) => ({
                                    ...prevState,
                                    role: val,
                                }))} onBlur={handleDataUpdate} />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.removeEmployeeBtn}
                            activeOpacity={0.7}
                            onPress={() => {
                                db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).delete()
                                const newEmployeesList = [...employees]
                                const filteredEmployeesList = newEmployeesList.filter(e => e.id !== employee.id)
                                setEmployeesState(filteredEmployeesList)
                                history.push("/authed/report/employeesreport")
                            }}
                        >
                            <Text style={styles.removeEmployeeTxt}>Remove Employee</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addHoursContainer}>
                        <Text style={styles.addHoursSectionHeader}>Add hours</Text>
                        <View style={styles.addHoursRow}>
                            <View style={styles.addHoursLeftGroup}>
                                <View style={styles.dateInputGroup}>
                                    <Text style={styles.dateTxt}>Date:</Text>
                                    {/* <View style={styles.dateInput}></View> */}
                                    <div>
                                        <input id='dateSelected' aria-label="Date" type="date" onChange={(event) => {
                                            console.log('event.target.value', event.target.value)
                                            const date = new Date(event.target.value.replace(/-/g, '\/'));
                                            setdateSelected(date)
                                        }
                                        } />
                                    </div>
                                </View>
                                <View style={styles.startTimeInputGroup}>
                                    <Text style={styles.startTimeTxt}>Start Time:</Text>
                                    {/* <View style={styles.startTimeInput}></View> */}
                                    <div>
                                        <input id='startTime' aria-label="Time" type="time" onChange={(event) => {
                                            console.log('Time target value: ', event.target.value)
                                            setstartTime(event.target.value)
                                        }
                                        } />
                                    </div>
                                </View>
                                <View style={styles.endTimeInputGroup}>
                                    <Text style={styles.endTimeTxt}>End Time:</Text>
                                    {/* <View style={styles.endTimeInput}></View> */}
                                    <div>
                                        <input id='endTime' aria-label="Time" type="time" onChange={event => setendTime(event.target.value)} />
                                    </div>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addBtn}
                                activeOpacity={0.7}
                                onPress={() => {
                                    if (!dateSelected || !startTime || !endTime) return
                                    console.log('dateSelected in add button: ', dateSelected)
                                    db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").add({
                                        date: dateSelected,
                                        startTime: startTime,
                                        endTime: endTime,
                                        paid: false
                                    }).then((docRef) => {
                                        setallHours([...allHours, {
                                            date: dateSelected,
                                            startTime: startTime,
                                            endTime: endTime,
                                            id: docRef.id,
                                            paid: false
                                        }])
                                    })
                                    setdateSelected(null)
                                    setstartTime(null)
                                    setendTime(null)
                                    document.getElementById('dateSelected').value = null
                                    document.getElementById('startTime').value = null
                                    document.getElementById('endTime').value = null
                                }}>
                                <Text style={styles.addBtnTxt}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.unpaidAndPaidDetails}>
                        <View style={styles.unpaidGroup}>
                            <View style={styles.unpaidHeader}>
                                <View style={styles.labelsRowInner}>
                                    <Text style={styles.unpaidLbl}>Unpaid</Text>
                                    <Text style={styles.unpaidDateLbl}>Date</Text>
                                    <Text style={styles.unpaidClockInLbl}>Clock In</Text>
                                    <Text style={styles.unpaidClockOutLbl}>Clock Out</Text>
                                </View>
                            </View>
                            {allHours.length > 0 && allHours.map((hour, index) => {
                                if (hour.paid) return

                                const date = hour.date.seconds ? new Date(hour.date.seconds * 1000) : new Date(hour.date)
                                const isChecked = unPaidSelected.filter(e => e.id === hour.id).length > 0
                                const ref = document.getElementById(`unpaidSelected${index}`)

                                if (ref) {
                                    if (isChecked) {
                                        document.getElementById(`unpaidSelected${index}`).checked = true;
                                    } else {
                                        document.getElementById(`unpaidSelected${index}`).checked = false;
                                    }
                                }

                                return (
                                    <HoursItem
                                        key={index}
                                        style={styles.hoursItem}
                                        date={date}
                                        hour={hour}
                                        employee={employee}
                                        allHours={allHours}
                                        setallHours={setallHours}
                                        index={index}
                                        isPaid={false}
                                    />
                                )
                            }
                            )}
                        </View>
                        <View style={styles.paidGroup}>
                            <View style={styles.paidHeader}>
                                <View style={styles.paidLabelsRowInner}>
                                    <Text style={styles.paidLbl}>Paid</Text>
                                    <Text style={styles.paidDateLbl}>Date</Text>
                                    <Text style={styles.paidClockInLbl}>Clock In</Text>
                                    <Text style={styles.paidClockOutLbl}>Clock Out</Text>
                                </View>
                            </View>
                            {allHours.length > 0 && allHours.map((hour, index) => {
                                if (!hour.paid) return

                                const date = hour.date.seconds ? new Date(hour.date.seconds * 1000) : new Date(hour.date)
                                const isChecked = paidSelected.filter(e => e.id === hour.id).length > 0
                                const ref = document.getElementById(`paidSelected${index}`)

                                if (ref) {
                                    if (isChecked) {
                                        document.getElementById(`paidSelected${index}`).checked = true;
                                    } else {
                                        document.getElementById(`paidSelected${index}`).checked = false;
                                    }
                                }

                                return (
                                    <HoursItem
                                        key={index}
                                        style={styles.hoursItem}
                                        date={date}
                                        hour={hour}
                                        employee={employee}
                                        allHours={allHours}
                                        setallHours={setallHours}
                                        index={index}
                                        isPaid={true}
                                    />
                                )
                            }
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        width: 1049,
        // height: '100%',
        flex: 1,
    },
    headerContainer: {
        width: 1049,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'flex-start'
    },
    chevronLeftIcon: {
        color: "rgba(128,128,128,1)",
        fontSize: 27,
        marginLeft: 12,
        marginRight: 15
    },
    topHeaderGroup: {
        width: 437,
        height: 48,
        justifyContent: "space-between",
        marginTop: 8
    },
    employeeReportHeaderTxt: {
        fontSize: 14
    },
    employeeName: {
        fontSize: 18
    },
    userEmployeeReport: {
        width: '100%',
        // height: '95%',
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#bdc1cb",
        shadowColor: "#c6c8d3",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 90,
        shadowOpacity: 0.53,
        shadowRadius: 30,
    },
    topInputDetailsRow: {
        width: 985,
        height: 87,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    inputGroup: {
        flexDirection: "row",
        width: 709,
        height: 87,
        alignItems: "center",
        justifyContent: "space-between"
    },
    employeeNameInputGroup: {
        width: 195,
        height: 84,
        justifyContent: "space-between"
    },
    employeeNameTxt: {
        fontWeight: '700',
        color: "#61656f"
    },
    employeeNameInput: {
        width: 195,
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5,
        padding: 10
    },
    employeePinInputGroup: {
        width: 195,
        height: 87,
        justifyContent: "space-between"
    },
    employeePinTxt: {
        fontWeight: '700',
        color: "#61656f"
    },
    employeePinInput: {
        width: 195,
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5,
        padding: 10
    },
    employeeRoleInputGroup: {
        width: 195,
        height: 87,
        justifyContent: "space-between"
    },
    employeeRole: {
        fontWeight: '700',
        color: "#61656f"
    },
    employeeRoleInput: {
        width: 195,
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5,
        padding: 10
    },
    removeEmployeeBtn: {
        width: 162,
        height: 39,
        backgroundColor: "#eb1f1e",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0
    },
    removeEmployeeTxt: {
        fontWeight: '700',
        color: "#ffffff",
        fontSize: 14,
        margin: 0,
        padding: 0
    },
    addHoursContainer: {
        width: 985,
        height: 87,
        justifyContent: "space-between",
        marginTop: 40,
    },
    addHoursSectionHeader: {
        fontWeight: '700',
        color: "#121212"
    },
    addHoursRow: {
        width: 985,
        height: 58,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    addHoursLeftGroup: {
        width: 581,
        height: 55,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateInputGroup: {
        width: 195,
        height: 55,
        justifyContent: "space-between"
    },
    dateTxt: {
        fontWeight: '700',
        color: "#61656f"
    },
    dateInput: {
        width: 195,
        height: 34,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5,
        padding: 10
    },
    startTimeInputGroup: {
        width: 138,
        height: 55,
        justifyContent: "space-between"
    },
    startTimeTxt: {
        fontWeight: '700',
        color: "#61656f"
    },
    startTimeInput: {
        width: 138,
        height: 34,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5
    },
    endTimeInputGroup: {
        width: 138,
        height: 55,
        justifyContent: "space-between"
    },
    endTimeTxt: {
        fontWeight: '700',
        color: "#61656f"
    },
    endTimeInput: {
        width: 138,
        height: 34,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#9b9b9b",
        borderRadius: 5
    },
    addBtn: {
        width: 80,
        height: 41,
        backgroundColor: "#1c294e",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    addBtnTxt: {
        color: "#ffffff",
        fontSize: 14
    },
    unpaidAndPaidDetails: {
        width: 992,
        marginTop: 60
    },
    unpaidAndPaidDetails_contentContainerStyle: {
        height: '100%',
        width: 992
    },
    unpaidGroup: {
        width: 986,
        justifyContent: "flex-start",
        marginBottom: 55
    },
    unpaidHeader: {
        width: 986,
        height: 39,
        justifyContent: "space-between",
        borderWidth: 0,
        borderColor: "#e6e7ee",
        borderBottomWidth: 1,
        marginBottom: 15
    },
    labelsRowInner: {
        width: 750,
        height: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    unpaidLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 230,
        height: 17
    },
    unpaidDateLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 210,
        height: 17
    },
    unpaidClockInLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 210
    },
    unpaidClockOutLbl: {
        fontWeight: '700',
        color: "#121212"
    },
    hoursItem: {
        height: 41,
        width: 986,
        marginTop: 0,
        marginBottom: 30
    },
    hoursItem1: {
        height: 41,
        width: 986,
        marginBottom: 30
    },
    paidGroup: {
        width: 986,
        justifyContent: "flex-start"
    },
    paidHeader: {
        width: 986,
        height: 39,
        justifyContent: "space-between",
        borderWidth: 0,
        borderColor: "#e6e7ee",
        borderBottomWidth: 1,
        marginBottom: 15
    },
    paidLabelsRowInner: {
        width: 750,
        height: 17,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    paidLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 230,
        height: 17
    },
    paidDateLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 210,
        height: 17
    },
    paidClockInLbl: {
        fontWeight: '700',
        color: "#121212",
        width: 210
    },
    paidClockOutLbl: {
        fontWeight: '700',
        color: "#121212"
    },
    hoursItem2: {
        height: 41,
        width: 986,
        marginTop: 0,
        marginBottom: 30
    },
    hoursItem3: {
        height: 41,
        width: 986,
        marginBottom: 30
    }
});

export default EditEmployee;
