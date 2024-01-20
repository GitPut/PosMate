import React, { useEffect, useRef, useState } from "react";
import "react-select2-wrapper/css/select2.css";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Animated,
} from "react-native";
import { Button, Switch, TextInput } from "@react-native-material/core";
import {
    deviceIdState,
    deviceTreeState,
    myDeviceDetailsState,
    setDeviceTreeState,
    setMyDeviceDetailsState,
    storeDetailState,
    trialDetailsState,
    woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import ReactSelect from "react-select";

const DeviceSettings = () => {
    const deviceTree = deviceTreeState.use()
    const myDeviceDetails = myDeviceDetailsState.use()
    const myDeviceID = deviceIdState.use()

    return (
        <div className="page-wrapper">
            <div className="content">
                <View style={styles.container}>
                    <View style={styles.headerRowContainer}>
                        <Text style={styles.headerTxt}>Device Settings</Text>
                    </View>
                    {deviceTree.map((device, index) => {

                        const otherDeviceOptions = []
                        deviceTree.map((deviceSearch, index) => {
                            if (deviceSearch.id !== device.id) {
                                otherDeviceOptions.push({ value: deviceSearch.docID, label: deviceSearch.name })
                            }
                        })

                        return (
                            <View key={index} style={[styles.detailInputContainer, { marginBottom: 25 }]}>
                                <TextInput placeholder={`Name: ${device.name}`} value={device.name} onChangeText={val => {
                                    const clone = [...deviceTree]
                                    clone[index].name = val

                                    setDeviceTreeState(clone)

                                }}
                                    style={{ marginBottom: 10 }}
                                />
                                <Text style={{ marginBottom: 10 }} >Id: {device.id ? device.id : 'No Id set to this device'}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ marginRight: 10 }}>Use Different Device To Print: </Text>
                                    <Switch value={device.useDifferentDeviceToPrint} onValueChange={val => {
                                        const clone = [...deviceTree]
                                        clone[index].useDifferentDeviceToPrint = val
                                        setDeviceTreeState(clone)
                                    }} />
                                </View>
                                {!device.useDifferentDeviceToPrint ? <TextInput placeholder={`Print To Printer: ${device.printToPrinter}`} value={device.printToPrinter} onChangeText={val => {
                                    const clone = [...deviceTree]
                                    clone[index].printToPrinter = val
                                    setDeviceTreeState(clone)
                                }}
                                /> :
                                    <ReactSelect
                                        options={otherDeviceOptions}
                                        value={
                                            device.sendPrintToUserID
                                        }
                                        onChange={(val) => {
                                            const clone = [...deviceTree]
                                            clone[index].sendPrintToUserID = val
                                            setDeviceTreeState(clone)
                                        }}
                                        placeholder={"Choose Device To Send Print To"}
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                            control: (provided, state) => ({
                                                ...provided,
                                                background: "#fff",
                                                borderColor: "#9e9e9e",
                                                minHeight: "52px",
                                                height: "52px",
                                                boxShadow: state.isFocused ? null : null,
                                            }),

                                            valueContainer: (provided, state) => ({
                                                ...provided,
                                                height: "52px",
                                                padding: "0 6px",
                                            }),

                                            input: (provided, state) => ({
                                                ...provided,
                                                margin: "0px",
                                            }),
                                            indicatorSeparator: (state) => ({
                                                display: "none",
                                            }),
                                            indicatorsContainer: (provided, state) => ({
                                                ...provided,
                                                height: "52px",
                                            }),
                                        }}
                                        menuPlacement="auto"
                                        menuPosition="fixed"
                                    />
                                }
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                                    <Text>Would you like online orders to print to this device?</Text>
                                    <Switch value={device.printOnlineOrders} onValueChange={val => {
                                        const clone = [...deviceTree]
                                        clone[index].printOnlineOrders = val
                                        setDeviceTreeState(clone)
                                    }} />
                                </View>
                                <Button
                                    title="Update Device"
                                    onPress={() => {
                                        db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update(device)
                                        const clone = [...deviceTree]
                                        clone[index] = device
                                        setDeviceTreeState(clone
                                        )
                                        console.log('Updated Device')
                                        setMyDeviceDetailsState(device)
                                    }}
                                    style={{
                                        marginBottom: 10
                                    }}
                                />
                                <Button
                                    title="Set To My ID"
                                    onPress={() => {
                                        if (deviceTree.filter(deviceSearch => deviceSearch.id === myDeviceID).length > 0) {
                                            db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(deviceTree.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].docID).update({ id: null })
                                            const clone = [...deviceTree]
                                            clone.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].id = null
                                            setDeviceTreeState(clone)
                                        }
                                        db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update({ id: myDeviceID })
                                        const clone = [...deviceTree]
                                        clone[index].id = myDeviceID
                                        setDeviceTreeState(clone)
                                        setMyDeviceDetailsState(device)
                                    }}
                                    style={{
                                        marginBottom: 10
                                    }}
                                />
                                <Button title="Delete Device" onPress={() => {
                                    db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).delete()
                                    const clone = [...deviceTree]
                                    clone.filter(deviceSearch => deviceSearch.docID !== device.docID)
                                    setDeviceTreeState(clone)
                                }
                                }
                                    style={{
                                        marginBottom: 10
                                    }}
                                />
                            </View>
                        )
                    })}
                    <Button title="Add Device" onPress={() => {

                        db.collection('users').doc(auth.currentUser.uid).collection('devices').add({ name: `Device${deviceTree.length}`, id: null, printToPrinter: null })

                        const clone = [...deviceTree]
                        clone.push({ name: "Device", id: null, printToPrinter: null, sendPrintToUserID: null })
                        setDeviceTreeState(clone)
                    }} />
                </View>
            </div>
        </div >
    );


};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,1)",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    headerRowContainer: {
        width: "90%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTxt: {
        fontFamily: "archivo-600",
        color: "rgba(98,96,96,1)",
        fontSize: 20,
    },
    billingBtn: {
        width: 60,
        height: 60,
        backgroundColor: "#E6E6E6",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    billingIcon: {
        color: "rgba(128,128,128,1)",
        fontSize: 30,
    },
    detailInputContainer: {
        width: "90%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(155,152,152,1)",
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 45,
        shadowOpacity: 0.2,
        shadowRadius: 15,
        padding: 30,
        minHeight: "75%",
        marginTop: 15,
    },
    materialStackedLabelTextbox1: {
        height: 60,
        width: 483,
    },
    materialStackedLabelTextbox2: {
        height: 60,
        width: 483,
        marginLeft: 43,
    },
    materialStackedLabelTextbox1Row: {
        height: 60,
        flexDirection: "row",
        marginTop: 23,
        marginLeft: 36,
        marginRight: 32,
    },
    materialStackedLabelTextbox3: {
        height: 60,
        width: 483,
    },
    materialStackedLabelTextbox5: {
        height: 60,
        width: 483,
        marginLeft: 43,
    },
    materialStackedLabelTextbox3Row: {
        height: 60,
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 36,
        marginRight: 32,
    },
    materialStackedLabelTextbox4: {
        height: 60,
        width: 483,
    },
    materialStackedLabelTextbox6: {
        height: 60,
        width: 483,
        marginLeft: 43,
    },
    materialStackedLabelTextbox4Row: {
        height: 60,
        flexDirection: "row",
        marginTop: 29,
        marginLeft: 36,
        marginRight: 32,
    },
    materialStackedLabelTextbox7: {
        height: 60,
        width: 483,
    },
    materialButtonViolet2: {
        height: 48,
        width: 483,
        marginLeft: 43,
        marginTop: 12,
    },
    materialStackedLabelTextbox7Row: {
        height: 60,
        flexDirection: "row",
        marginTop: 14,
        marginLeft: 36,
        marginRight: 32,
    },
    helperDownloadContainer: {
        width: "100%",
        height: 79,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    helperTxt: {
        fontFamily: "archivo-500",
        color: "#121212",
        fontSize: 19,
        width: 483,
        height: 52,
    },
    badgeWindows: {
        width: 200,
        height: 79,
    },
    badgeMac: {
        width: 200,
        height: 79,
    },
});

export default DeviceSettings;
