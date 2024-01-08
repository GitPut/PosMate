
// var navigator_info = window.navigator;
// var screen_info = window.screen;
// var uid = navigator_info.mimeTypes.length;
// uid += navigator_info.userAgent.replace(/\D+/g, '');
// uid += navigator_info.plugins.length;
// uid += screen_info.height || '';
// uid += screen_info.width || '';
// uid += screen_info.pixelDepth || '';
// console.log(uid);


import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Upload } from "../../EntryFile/imagePath";
import {
    View,
    Text,
    ScrollView,
    useWindowDimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Modal,
} from "react-native";
import { Button, Switch, TextInput } from "@react-native-material/core";
import {
    setStoreDetailState,
    setWoocommerceState,
    storeDetailState,
    trialDetailsState,
    woocommerceState,
} from "state/state";
import {
    updateStoreDetails,
    updateWooCredentials,
} from "state/firebaseFunctions";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Foundation from "@expo/vector-icons/Foundation";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import firebase from "firebase/app";
import EditStoreDetails from "components/EditStoreDetails";
import ReactSelect from "react-select";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

const DeviceSettings = () => {
    const storeDetails = storeDetailState.use();
    const [name, setname] = useState(storeDetails.name);
    const [phoneNumber, setphoneNumber] = useState(storeDetails.phoneNumber);
    const [address, setaddress] = useState(storeDetails.address);
    const [website, setwebsite] = useState(storeDetails.website);
    const [deliveryPrice, setdeliveryPrice] = useState(
        storeDetails.deliveryPrice
    );
    const [com, setcom] = useState(storeDetails.comSelected);
    const [settingsPassword, setsettingsPassword] = useState(
        storeDetails.settingsPassword
    );
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [viewVisible, setviewVisible] = useState(false);
    const [screen, setscreen] = useState("general");
    const wooCredentials = woocommerceState.use();
    const [apiUrl, setapiUrl] = useState(wooCredentials.apiUrl);
    const [ck, setck] = useState(wooCredentials.ck);
    const [cs, setcs] = useState(wooCredentials.cs);
    const [useWoocommerce, setuseWoocommerce] = useState(
        wooCredentials.useWoocommerce
    );
    const trialDetails = trialDetailsState.use();

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 0 in 3 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 500,
    //         useNativeDriver: false,
    //     }).start();
    // };

    // const resetLoader = () => {
    //     setviewVisible(true);
    //     fadeIn();
    // };

    // const Manage = () => {
    //     resetLoader();
    //     firebase
    //         .functions()
    //         .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
    //             returnUrl: `${window.location.origin}`,
    //             locale: "auto",
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             window.location = response.data.url;
    //         })
    //         .catch((error) => {
    //             alert("Unknown error has occured: ", error);
    //         });
    // };

    // const handleDataUpdate = () => {
    //     if (name !== null && phoneNumber !== null && address !== null) {
    //         setStoreDetailState({
    //             name: name,
    //             phoneNumber: phoneNumber,
    //             address: address,
    //             website: website,
    //             deliveryPrice: deliveryPrice,
    //             comSelected: com,
    //             settingsPassword: settingsPassword,
    //         });
    //         updateStoreDetails({
    //             name: name,
    //             phoneNumber: phoneNumber,
    //             address: address,
    //             website: website,
    //             deliveryPrice: deliveryPrice,
    //             comSelected: com,
    //             settingsPassword: settingsPassword,
    //         });
    //         if (customBtnExtraFunction) {
    //             customBtnExtraFunction();
    //         }
    //     } else {
    //         alert("Please fill in all fields");
    //     }
    // };

    const [deviceTree, setdeviceTree] = useState([])
    const [myDeviceID, setmyDeviceID] = useState(null)

    useEffect(() => {
        // Retrieve the cookie value
        function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }

        const deviceID = getCookie('deviceID');

        if (!deviceID) {// Generate a random device ID
            const yourDeviceID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            // Set a cookie
            document.cookie = `deviceID=${yourDeviceID}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

            setmyDeviceID(yourDeviceID)
        } else {
            setmyDeviceID(deviceID)
        }

        db.collection('users').doc(auth.currentUser.uid).collection('devices').get().then((snapshot) => {
            snapshot.docs.map(doc => {
                setdeviceTree(prev => [...prev, { ...doc.data(), docID: doc.id }])
            }
            )
        })

    }, [])



    return (
        <div className="page-wrapper">
            <div className="content">
                <View style={styles.container}>
                    <View style={styles.headerRowContainer}>
                        <Text style={styles.headerTxt}>Device Settings</Text>
                    </View>
                    <View style={styles.detailInputContainer}>
                        <ScrollView>
                            {deviceTree.map((device, index) => {

                                const otherDeviceOptions = []
                                deviceTree.map((deviceSearch, index) => {
                                    if (deviceSearch.id !== device.id) {
                                        otherDeviceOptions.push({ value: deviceSearch.docID, label: deviceSearch.name })
                                    }
                                })

                                return (
                                    <View key={index} style={{ marginBottom: 25 }}>
                                        <TextInput placeholder={`Name: ${device.name}`} value={device.name} onChangeText={val => setdeviceTree(prev => {
                                            const clone = [...prev]
                                            clone[index].name = val
                                            return clone
                                        })} />
                                        <Text>Id: {device.id}</Text>
                                        <Switch value={device.useDifferentDeviceToPrint} onValueChange={val => setdeviceTree(prev => {
                                            const clone = [...prev]
                                            clone[index].useDifferentDeviceToPrint = val
                                            return clone
                                        })} />
                                        {!device.useDifferentDeviceToPrint ? <TextInput placeholder={`Print To Printer: ${device.printToPrinter}`} value={device.printToPrinter} onChangeText={val => setdeviceTree(prev => {
                                            const clone = [...prev]
                                            clone[index].printToPrinter = val
                                            return clone
                                        })} /> :
                                            // <TextInput placeholder={`Enter User ID To Send Print: ${device.sendPrintToUserID}`} value={device.sendPrintToUserID} onChangeText={val => setdeviceTree(prev => {
                                            //     const clone = [...prev]
                                            //     clone[index].sendPrintToUserID = val
                                            //     return clone
                                            // })} />
                                            <ReactSelect
                                                options={otherDeviceOptions}
                                                value={
                                                    device.sendPrintToUserID
                                                }
                                                onChange={(val) => {
                                                    setdeviceTree(prev => {
                                                        const clone = [...prev]
                                                        clone[index].sendPrintToUserID = val
                                                        return clone
                                                    })
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
                                        <Text>Would you like online orders to print to this device?</Text>
                                        <Switch value={device.printOnlineOrders} onValueChange={val => setdeviceTree(prev => {
                                            const clone = [...prev]
                                            clone[index].printOnlineOrders = val
                                            return clone
                                        })} />
                                        <Button
                                            title="Update Device"
                                            onPress={() => {
                                                db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update(device)
                                                setdeviceTree(prev => {
                                                    const clone = [...prev]
                                                    clone[index] = device
                                                    return clone
                                                }
                                                )
                                            }} />
                                        <Button
                                            title="Set To My ID"
                                            onPress={() => {
                                                if (deviceTree.filter(deviceSearch => deviceSearch.id === myDeviceID).length > 0) {
                                                    db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(deviceTree.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].docID).update({ id: null })
                                                    setdeviceTree(prev => {
                                                        const clone = [...prev]
                                                        clone.filter(deviceSearch => deviceSearch.id === myDeviceID)[0].id = null
                                                        return clone
                                                    })
                                                }
                                                db.collection('users').doc(auth.currentUser.uid).collection('devices').doc(device.docID).update({ id: myDeviceID })
                                                setdeviceTree(prev => {
                                                    const clone = [...prev]
                                                    clone[index].id = myDeviceID
                                                    return clone
                                                })
                                            }} />
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <Button title="Add Device" onPress={() => {

                            db.collection('users').doc(auth.currentUser.uid).collection('devices').add({ name: `Device${deviceTree.length}`, id: null, printToPrinter: null })

                            setdeviceTree(prev => [...prev, { name: "Device", id: null, printToPrinter: null, sendPrintToUserID: null }])
                        }} />
                    </View>
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
