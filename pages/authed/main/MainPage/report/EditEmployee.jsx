import React, { useEffect, useRef, useState } from 'react'
import { Upload } from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { employeesState, setEmployeesState, setUserStoreState, userState, userStoreState } from 'state/state';
import { updateData } from 'state/firebaseFunctions';
import { FlatList, Image, Modal, TouchableOpacity, View } from 'react-native';
import OptionView from 'components/product/OptionView';
import { Button } from 'react-native';
import { Link, useHistory, useParams } from 'react-router-dom';
import { auth, db, storage } from 'state/firebaseConfig';

import DatePicker from "react-datepicker";
import { Text } from '@react-native-material/core';

const EditEmployee = () => {
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
                console.log('Made it before empty check')
                if (snapshot.empty) return
                const hours = []
                snapshot.forEach((doc) => {
                    console.log('doc.data()', doc.data())
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

    useEffect(() => {
        console.log('All Hours: ', allHours)
        console.log('Paid Selected: ', paidSelected)
        console.log('Unpaid Selected: ', unPaidSelected)

    }, [allHours, paidSelected, unPaidSelected])



    function handleDataUpdate() {
        if (!employee.name) {
            seterror('Please enter a employee name')
            return
        }
        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).update({
            name: employee.name,
            pin: employee.pin
        })
        const newEmployeesList = [...employees]
        const index = newEmployeesList.findIndex(e => e.id === employee.id)
        newEmployeesList[index] = employee
        setEmployeesState(newEmployeesList)
        // history.push("/authed/report/employeesreport")
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Employee Edit</h4>
                            <h6>Edit your employee details</h6>
                        </div>
                    </div>
                    {/* /add */}
                    {employee && <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label>Employee Name</label>
                                                <input type="text" placeholder="Employee Name" value={employee?.name} onChange={(event) => setemployee((prevState) => ({
                                                    ...prevState,
                                                    name: event.target.value,
                                                }))} onBlur={handleDataUpdate} />
                                            </div>
                                        </div>
                                        <View style={{ width: 10 }} />
                                        <div className="col-lg-3 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label>Employee Pin</label>
                                                <input type="text" placeholder="Employee Pin" value={employee?.pin} onChange={(event) => setemployee((prevState) => ({
                                                    ...prevState,
                                                    pin: event.target.value,
                                                }))} onBlur={handleDataUpdate} />
                                            </div>
                                        </div>
                                    </View>

                                    <Button title='Remove Employee' onPress={() => {
                                        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).delete()
                                        const newEmployeesList = [...employees]
                                        const filteredEmployeesList = newEmployeesList.filter(e => e.id !== employee.id)
                                        setEmployeesState(filteredEmployeesList)
                                        history.push("/authed/report/employeesreport")
                                    }}
                                        color={'red'}
                                    />
                                </View>

                                <View style={{ marginBottom: 50 }}>
                                    <Text>Add Hours</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Date:</Text>
                                            <div>
                                                <input id='dateSelected' aria-label="Date" type="date" onChange={(event) => {
                                                    console.log('event.target.value', event.target.value)
                                                    const date = new Date(event.target.value.replace(/-/g, '\/'));
                                                    setdateSelected(date)
                                                }
                                                } />
                                            </div>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Start Time:</Text>
                                            <div>
                                                <input id='startTime' aria-label="Time" type="time" onChange={(event) => {
                                                    console.log('Time target value: ', event.target.value)
                                                    setstartTime(event.target.value)
                                                }
                                                } />
                                            </div>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>End Time:</Text>
                                            <div>
                                                <input id='endTime' aria-label="Time" type="time" onChange={event => setendTime(event.target.value)} />
                                            </div>
                                        </View>
                                        <Button title="Add" onPress={() => {
                                            if (!dateSelected || !startTime || !endTime) return
                                            console.log('dateSelected in add button: ', dateSelected)
                                            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").add({
                                                date: dateSelected,
                                                startTime: startTime,
                                                endTime: endTime
                                            }).then((docRef) => {
                                                setallHours([...allHours, {
                                                    date: dateSelected,
                                                    startTime: startTime,
                                                    endTime: endTime,
                                                    id: docRef.id
                                                }])
                                            })
                                            setdateSelected(null)
                                            setstartTime(null)
                                            setendTime(null)
                                            document.getElementById('dateSelected').value = null
                                            document.getElementById('startTime').value = null
                                            document.getElementById('endTime').value = null
                                        }} />
                                    </View>
                                    <View style={{ marginTop: 50 }}>
                                        <Text>Unpaid</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <input id="unPaidCheckAll" value={unPaidSelected.length === allHours.filter(e => !e.paid).length ? true : false} aria-label="Checkbox" type="checkbox" onChange={(event) => {
                                                if (unPaidSelected.length === allHours.filter(e => !e.paid).length) {
                                                    setunPaidSelected([])
                                                } else {
                                                    setunPaidSelected(allHours.filter(e => !e.paid))
                                                }
                                            }} /></View>
                                            <View style={{ alignItems: 'center', flex: 2 }}> <Text>Date</Text> </View>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <Text>Clock In</Text></View>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <Text>Clock Out</Text></View>
                                            <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Button title="Delete" onPress={() => {
                                                    const newHours = [...allHours]
                                                    unPaidSelected.forEach(hour => {
                                                        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).delete()
                                                        newHours.splice(allHours.indexOf(hour), 1)
                                                    }
                                                    )
                                                    setallHours(prev => prev.filter(e => !unPaidSelected.includes(e)))
                                                    setunPaidSelected([])
                                                    document.getElementById('unPaidCheckAll').checked = false;
                                                }
                                                } />
                                                <View style={{ width: 10 }} />
                                                <Button title='Mark as Paid' onPress={() => {
                                                    const newHours = [...allHours]
                                                    unPaidSelected.forEach(hour => {
                                                        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).update({
                                                            paid: true
                                                        })
                                                        newHours[allHours.indexOf(hour)].paid = true
                                                    }
                                                    )
                                                    setallHours(newHours)
                                                    setunPaidSelected([])
                                                    document.getElementById('unPaidCheckAll').checked = false;
                                                }
                                                } />
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom: 10 }} />
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
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <input value={isChecked} id={`unpaidSelected${index}`} aria-label="Checkbox" type="checkbox" onChange={(event) => {
                                                        if (isChecked) {
                                                            setunPaidSelected(prev => prev.filter((item) => item !== hour))
                                                        } else {
                                                            setunPaidSelected(prev => [...prev, hour])
                                                        }
                                                    }} /></View>
                                                    <View style={{ alignItems: 'center', flex: 2 }}> <Text>{date.toDateString()}</Text> </View>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <Text>{hour.startTime}</Text></View>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <Text>{hour.endTime}</Text></View>
                                                    <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button title="Delete" onPress={() => {
                                                            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).delete()
                                                            const newHours = [...allHours]
                                                            newHours.splice(index, 1)
                                                            setallHours(newHours)
                                                        }
                                                        } />
                                                        <View style={{ width: 10 }} />
                                                        <Button title='Mark as Paid' onPress={() => {
                                                            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).update({
                                                                paid: true
                                                            })
                                                            const newHours = [...allHours]
                                                            newHours[index].paid = true
                                                            setallHours(newHours)
                                                        }
                                                        } />
                                                    </View>
                                                </View>
                                            )
                                        }
                                        )}
                                    </View>
                                    <View style={{ marginTop: 50 }}>
                                        <Text>Paid</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <input id="paidCheckAll" value={paidSelected.length === allHours.filter(e => e.paid).length ? true : false} aria-label="Checkbox" type="checkbox" onChange={(event) => {
                                                if (paidSelected.length === allHours.filter(e => e.paid).length) {
                                                    setpaidSelected([])
                                                } else {
                                                    setpaidSelected(allHours.filter(e => e.paid))
                                                }
                                            }} /></View>
                                            <View style={{ alignItems: 'center', flex: 2 }}> <Text>Date</Text> </View>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <Text>Clock In</Text></View>
                                            <View style={{ alignItems: 'center', flex: 1 }}> <Text>Clock Out</Text></View>
                                            <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Button title="Delete" onPress={() => {
                                                    const newHours = [...allHours]
                                                    paidSelected.forEach(hour => {
                                                        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).delete()
                                                        newHours.splice(allHours.indexOf(hour), 1)
                                                    }
                                                    )
                                                    setallHours(prev => prev.filter(e => !paidSelected.includes(e)))
                                                    setpaidSelected([])
                                                    document.getElementById('paidCheckAll').checked = false;
                                                }
                                                } />
                                                <View style={{ width: 10 }} />
                                                <Button title='Mark as unPaid' onPress={() => {
                                                    const newHours = [...allHours]
                                                    paidSelected.forEach(hour => {
                                                        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).update({
                                                            paid: false
                                                        })
                                                        newHours[allHours.indexOf(hour)].paid = false
                                                    }
                                                    )
                                                    setallHours(newHours)
                                                    setpaidSelected([])
                                                    document.getElementById('paidCheckAll').checked = false;
                                                }
                                                } />
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', height: 1, backgroundColor: 'black', marginBottom: 10 }} />
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
                                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <input value={isChecked} id={`paidSelected${index}`} aria-label="Checkbox" type="checkbox" onChange={(event) => {
                                                        if (isChecked) {
                                                            setpaidSelected(prev => prev.filter((item) => item !== hour))
                                                        } else {
                                                            setpaidSelected(prev => [...prev, hour])
                                                        }
                                                    }} /></View>
                                                    <View style={{ alignItems: 'center', flex: 2 }}> <Text>{date.toDateString()}</Text> </View>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <Text>{hour.startTime}</Text></View>
                                                    <View style={{ alignItems: 'center', flex: 1 }}> <Text>{hour.endTime}</Text></View>
                                                    <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <Button title="Delete" onPress={() => {
                                                            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).delete()
                                                            const newHours = [...allHours]
                                                            newHours.splice(index, 1)
                                                            setallHours(newHours)
                                                        }
                                                        } />
                                                        <View style={{ width: 10 }} />
                                                        <Button title='Mark as unPaid' onPress={() => {
                                                            db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).collection("hours").doc(hour.id.toString()).update({
                                                                paid: false
                                                            })
                                                            const newHours = [...allHours]
                                                            newHours[index].paid = false
                                                            setallHours(newHours)
                                                        }
                                                        } />
                                                    </View>
                                                </View>
                                            )
                                        }
                                        )}
                                    </View>
                                </View>

                                {/* <div className="col-lg-12">
                                    <button className="btn btn-submit me-2" onClick={handleDataUpdate}>
                                        Update
                                    </button>
                                    <Link style={{ textDecoration: 'none' }} to="/authed/report/employeesreport" className="btn btn-cancel">
                                        Cancel
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>}
                    <Modal visible={error} transparent={true}>
                        <TouchableOpacity
                            onPress={() => seterror(false)}
                            style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "20%",
                                backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                        >
                            <div
                                data-wf-user-form-error="true"
                                className=" error-message "
                            >
                                <div className="user-form-error-msg">
                                    {error}
                                </div>
                            </div>
                        </TouchableOpacity>
                    </Modal>
                    {/* /add */}
                </div>
            </div>
        </>
    )
}
export default EditEmployee;