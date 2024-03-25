import React, { useEffect, useRef, useState } from "react";
import "react-select2-wrapper/css/select2.css";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Animated,
    Modal,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { Button, Switch, TextInput } from "@react-native-material/core";
import {
    deviceIdState,
    deviceTreeState,
    setDeviceTreeState,
    setMyDeviceDetailsState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import ReactSelect from "react-select";
import { loadStripe } from "@stripe/stripe-js";
import { Image } from "react-native";
import tw from 'twrnc';

const DeviceSettings = () => {
    const deviceTree = deviceTreeState.use()
    const myDeviceID = deviceIdState.use()
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [viewVisible, setviewVisible] = useState(false);
    const { width, height } = Dimensions.get('window');

    const fadeIn = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const resetLoader = () => {
        setviewVisible(true);
        fadeIn();
    };

    const AddNewDevice = async () => {
        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("checkout_sessions")
            .add({
                price: 'price_1Oj9NZCIw3L7DOwI7DKAhIve', // todo price Id from your products price in the Stripe Dashboard
                quantity: 1,
                success_url: window.location.href, // return user to this screen on successful purchase
                cancel_url: window.location.href, // return user to this screen on failed purchase
            })
            .then((docRef) => {
                // Wait for the checkoutSession to get attached by the extension
                docRef.onSnapshot(async (snap) => {
                    const { error, sessionId } = snap.data();
                    if (error) {
                        // Show an error to your customer and inspect
                        // your Cloud Function logs in the Firebase console.
                        alert(`An error occurred: ${error.message}`);
                    }

                    if (sessionId) {
                        // We have a session, let's redirect to Checkout
                        // Init Stripe
                        const stripe = await loadStripe(
                            "pk_live_51MHqrvCIw3L7DOwI0ol9CTCSH7mQXTLKpxTWKzmwOY1MdKwaYwhdJq6WTpkWdBeql3sS44JmybynlRnaO2nSa1FK001dHiEOZO" // todo enter your public stripe key here
                        );
                        console.log(`redirecting`);
                        await stripe.redirectToCheckout({ sessionId });
                    }
                });
            });
    }

    //Make style better

    return (
        <div className="page-wrapper">
            <div className="content">
                <View style={styles.container}>
                    <View style={styles.headerRowContainer}>
                        <Text style={styles.headerTxt}>Device Settings</Text>
                        {deviceTree.devices.length < 2 + deviceTree.extraDevicesPayingFor ?
                            <TouchableOpacity
                                onPress={() => {

                                    db.collection('users').doc(auth.currentUser.uid).collection('devices').add({ name: `Device${deviceTree.devices.length}`, id: null, printToPrinter: null }).then((docRef) => {
                                        const clone = { ...deviceTree }
                                        clone.devices.push({ name: "Device", id: null, printToPrinter: null, sendPrintToUserID: null, docID: docRef.id })
                                        setDeviceTreeState(clone)
                                    })
                                }}
                                style={tw.style([
                                    'bg-green-500',
                                    'rounded-md',
                                    'p-3',
                                    'mt-2',
                                    'mb-2'
                                ])}
                            >
                                <Text style={tw.style([
                                    'text-white',
                                    'text-center',
                                    'text-base'
                                ])} >Add Device</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => {
                                    resetLoader()
                                    AddNewDevice()
                                }}
                                style={tw.style([
                                    'bg-green-500',
                                    'rounded-md',
                                    'p-3',
                                    'mt-2',
                                    'mb-2'
                                ])}
                            >
                                <Text style={tw.style([
                                    'text-white',
                                    'text-center',
                                    'text-base'
                                ])} >Pay For Another Device</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <ScrollView style={[{ width: '90%', height: height / 1.4 }, tw.style([
                        'p-5',
                        'border',
                        'border-gray-200',
                        'rounded-md',
                        'bg-white',
                        'shadow-md',
                    ])]}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        {deviceTree.devices.map((device, index) => {

                            const otherDeviceOptions = []
                            deviceTree.devices.map((deviceSearch, index) => {
                                if (deviceSearch.id !== device.id) {
                                    otherDeviceOptions.push({ value: deviceSearch.docID, label: deviceSearch.name })
                                }
                            })

                            return (
                                <View key={index} style={tw.style([
                                    'flex-1',
                                    'p-5',
                                    'border',
                                    'border-gray-200',
                                    'rounded-md',
                                    'mb-5',
                                    'bg-white',
                                    'shadow-md',
                                    'w-11/12',
                                    'items-center'
                                ])}>
                                    <View style={tw.style('w-1/2')}>
                                        <Text style={tw.style([
                                            'text-sm',
                                            'mb-2',

                                        ])} >Device Name</Text>
                                        <TextInput placeholder='Enter device name'
                                            value={device.name}
                                            onChangeText={val => {
                                                const clone = { ...deviceTree }
                                                clone.devices[index].name = val
                                                setDeviceTreeState(clone)
                                            }}
                                            style={tw.style(['w-full', 'p-2', 'border', 'border-gray-300', 'rounded-md', 'mb-2'])}
                                        />
                                    </View>
                                    <View
                                        style={tw.style([
                                            'flex',
                                            'flex-row',
                                            'items-center',
                                            'mb-2',
                                            'mt-2',
                                            'w-1/2',
                                            'justify-between',
                                            'border-b'
                                        ])}
                                    >
                                        <Text style={tw.style([
                                            'text-sm',
                                            'mb-2',
                                            'font-medium'
                                        ])} >Device Id: </Text>
                                        <Text style={tw.style([
                                            'text-sm',
                                            'mb-2',
                                        ])} >{device.id ? device.id.toUpperCase() : 'No Id set to this device'}</Text>
                                    </View>
                                    <View style={tw.style([
                                        'flex',
                                        'flex-row',
                                        'items-center',
                                        'mb-2',
                                        'mt-2',
                                        'justify-between',
                                        'w-1/2',
                                        'border-b'
                                    ])}>
                                        <Text style={tw.style([
                                            'text-sm',
                                            'mb-2',
                                            'font-medium'
                                        ])} >Print Online Orders: </Text>
                                        <Switch value={device.printOnlineOrders} onValueChange={val => {
                                            const clone = { ...deviceTree }
                                            clone.devices[index].printOnlineOrders = val
                                            setDeviceTreeState(clone)
                                        }} />
                                    </View>
                                    <View style={tw.style([
                                        'flex',
                                        'flex-row',
                                        'items-center',
                                        'mb-2',
                                        'mt-2',
                                        'justify-between',
                                        'w-1/2',
                                        'border-b'
                                    ])}>
                                        <Text style={tw.style([
                                            'text-sm',
                                            'mb-2',
                                            'font-medium'
                                        ])} >Use Different Device To Print: </Text>
                                        <Switch value={device.useDifferentDeviceToPrint} onValueChange={val => {
                                            const clone = { ...deviceTree }
                                            clone.devices[index].useDifferentDeviceToPrint = val
                                            setDeviceTreeState(clone)
                                        }} />
                                    </View>
                                    {!device.useDifferentDeviceToPrint ? <View style={
                                        tw.style([
                                            'flex',
                                            'flex-col',
                                            'items-center',
                                            'mb-2',
                                            'mt-2',
                                            'w-1/2',
                                        ])
                                    }>
                                        <Text style={[tw.style([
                                            'text-sm',
                                            'mb-2',
                                        ]), { width: '100%' }]} >Print To Printer</Text>
                                        <TextInput placeholder='Enter printer name'
                                            value={device.printToPrinter}
                                            onChangeText={val => {
                                                const clone = { ...deviceTree }
                                                clone.devices[index].printToPrinter = val
                                                setDeviceTreeState(clone)
                                            }}
                                            style={[tw.style(['p-2', 'border', 'border-gray-300', 'rounded-md', 'mb-2']), { width: '100%' }]}
                                        />
                                    </View> :
                                        <View style={
                                            tw.style([
                                                'flex',
                                                'flex-col',
                                                'items-center',
                                                'mb-2',
                                                'mt-2',
                                                'w-1/2',
                                            ])
                                        }>
                                            <Text style={tw.style([
                                                'text-sm',
                                                'mb-2',
                                            ])} >Choose Device To Send Print To</Text>
                                            {/* <select
                                                style={tw.style([
                                                    'w-1/2',
                                                    'p-2',
                                                    'border',
                                                    'border-gray-300',
                                                    'rounded-md',
                                                    'mb-2'
                                                ])}
                                                value={device.sendPrintToUserID}
                                            // onChange={(e) => {
                                            //     const clone = { ...deviceTree }
                                            //     clone.devices[index].sendPrintToUserID = e.target.value
                                            //     setDeviceTreeState(clone)
                                            //     console.log('Device to send to updated to: ', ' Label: ', e.target.label, ' Value: ', e.target.value)
                                            // }
                                            // }
                                            >
                                                <option value={null}>Select Device</option>
                                                {otherDeviceOptions.map((device, index) => {
                                                    return (
                                                        <option key={index} label={device.label} value={device.value} onClick={() => {
                                                            const clone = { ...deviceTree }
                                                            clone.devices[index].sendPrintToUserID = { value: device.value, label: device.label }
                                                            setDeviceTreeState(clone)
                                                            console.log('Device to send to updated to: ', ' Label: ', device.label, ' Value: ', device.value)
                                                        }}>{device.label}</option>
                                                    )
                                                })}
                                            </select> */}
                                            <ReactSelect
                                                options={otherDeviceOptions}
                                                value={
                                                    device.sendPrintToUserID
                                                }
                                                onChange={(val) => {
                                                    const clone = { ...deviceTree }
                                                    clone.devices[index].sendPrintToUserID = val
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
                                                    container: (provided, state) => ({
                                                        ...provided,
                                                        width: "100%",
                                                    }),
                                                }}
                                                menuPlacement="auto"
                                                menuPosition="fixed"
                                            />
                                        </View>
                                    }
                                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'space-between' }, tw.style('w-1/2')]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update(device)
                                                const clone = { ...deviceTree }
                                                clone.devices[index] = device
                                                setDeviceTreeState(clone
                                                )
                                                console.log('Updated Device')
                                                setMyDeviceDetailsState(device)
                                                console.log('Updated My Device Details: ', device)
                                            }}
                                            style={tw.style([
                                                'bg-blue-500',
                                                'rounded-md',
                                                'p-3',
                                                'w-2/5',
                                                'mt-2',
                                                'mb-2'
                                            ])}
                                        >
                                            <Text style={tw.style([
                                                'text-white',
                                                'text-center',
                                                'text-base'
                                            ])} >Update Device</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (deviceTree.devices.filter(deviceSearch => deviceSearch.id === myDeviceID).length > 0) {
                                                    db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(deviceTree.devices.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].docID).update({ id: null })
                                                    const clone = { ...deviceTree }
                                                    clone.devices.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].id = null
                                                    setDeviceTreeState(clone)
                                                }
                                                db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update({ id: myDeviceID })
                                                const clone = { ...deviceTree }
                                                clone.devices[index].id = myDeviceID
                                                setDeviceTreeState(clone)
                                                setMyDeviceDetailsState(device)
                                            }}
                                            style={tw.style([
                                                'bg-blue-500',
                                                'rounded-md',
                                                'p-3',
                                                'w-2/5',
                                                'mt-2',
                                                'mb-2'
                                            ])}
                                        >
                                            <Text style={tw.style([
                                                'text-white',
                                                'text-center',
                                                'text-base'
                                            ])} >Set To My ID</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).delete()
                                            let clone = { ...deviceTree }
                                            clone = { ...clone, devices: clone.devices.filter(deviceSearch => deviceSearch.docID !== device.docID) }
                                            setDeviceTreeState(clone)
                                        }}
                                        style={tw.style([
                                            'bg-red-500',
                                            'rounded-md',
                                            'p-3',
                                            'w-1/2',
                                            'mt-2',
                                            'mb-4',
                                        ])}
                                    >
                                        <Text style={tw.style([
                                            'text-white',
                                            'text-center',
                                            'text-base'
                                        ])} >Delete Device</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                {viewVisible && (
                    <Modal visible={true}>
                        <Animated.View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white",
                                position: "absolute",
                                opacity: fadeAnim,
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Image
                                source={require("assets/loading.gif")}
                                style={{ width: 450, height: 450, resizeMode: "contain" }}
                            />
                        </Animated.View>
                    </Modal>
                )}
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
        marginTop: 20
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
