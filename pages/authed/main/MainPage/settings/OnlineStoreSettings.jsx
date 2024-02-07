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
    onlineStoreState,
    setOnlineStoreState,
    setStoreDetailState,
    setWoocommerceState,
    storeDetailState,
    trialDetailsState,
    userStoreState,
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
import EditStoreDetails from "pages/authed/main/MainPage/settings/EditStoreDetails";
import ReactSelect from "react-select";

const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";
import tw from 'twrnc'

const OnlineStoreSettings = () => {
    const onlineStoreDetails = onlineStoreState.use()
    const storeDetails = storeDetailState.use()
    const catalog = userStoreState.use()
    const [urlEnding, seturlEnding] = useState(onlineStoreDetails.urlEnding)
    const [stripePublicKey, setstripePublicKey] = useState(onlineStoreDetails.stripePublicKey)
    const [stripeSecretKey, setstripeSecretKey] = useState(onlineStoreDetails.stripeSecretKey)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [viewVisible, setviewVisible] = useState(false);

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

    const startOnlineStore = () => {
        db.collection("public").where("urlEnding", "==", urlEnding)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    db.collection("public").doc(auth.currentUser.uid).set({
                        storeDetails: storeDetails,
                        categories: catalog.categories,
                        urlEnding: urlEnding,
                    }).then(() => {
                        catalog.products.forEach((product) => {
                            db.collection("public").doc(auth.currentUser.uid).collection("products").doc(product.id).set(product)
                        })
                        db.collection('users').doc(auth.currentUser.uid).update({
                            onlineStoreActive: true,
                            onlineStoreSetUp: true,
                            urlEnding: urlEnding
                        })
                        setOnlineStoreState({
                            onlineStoreActive: true,
                            onlineStoreSetUp: true,
                            urlEnding: urlEnding
                        })
                    })
                } else {
                    alert("This url ending is already taken. Please choose another one.")
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const updateStripeDetails = () => {
        db.collection('users').doc(auth.currentUser.uid).update({
            stripePublicKey: stripePublicKey,
            stripeSecretKey: stripeSecretKey
        })
        db.collection("public").doc(auth.currentUser.uid).update({
            stripePublicKey: stripePublicKey
        })
        setOnlineStoreState({
            ...onlineStoreDetails,
            stripePublicKey: stripePublicKey,
            stripeSecretKey: stripeSecretKey
        })
    }

    const makeOnlineStoreActive = () => {
        if (!onlineStoreDetails.onlineStoreActive) {
            catalog.products.forEach((product) => {
                db.collection("public").doc(auth.currentUser.uid).collection("products").doc(product.id).set(product)
            })
            db.collection('users').doc(auth.currentUser.uid).update({
                onlineStoreActive: true,
                onlineStoreSetUp: true,
                urlEnding: urlEnding,
            })
            db.collection('public').doc(auth.currentUser.uid).update({
                onlineStoreActive: true,
                onlineStoreSetUp: true,
                urlEnding: urlEnding,
                storeDetails: storeDetails,
                categories: catalog.categories,
            })
            setOnlineStoreState({
                ...onlineStoreDetails,
                onlineStoreActive: true,
            })
        } else {
            db.collection('users').doc(auth.currentUser.uid).update({
                onlineStoreActive: false,
                onlineStoreSetUp: true,
                urlEnding: urlEnding
            })
            db.collection('public').doc(auth.currentUser.uid).update({
                onlineStoreActive: false,
                onlineStoreSetUp: true,
                urlEnding: urlEnding
            })
            setOnlineStoreState({
                ...onlineStoreDetails,
                onlineStoreActive: false,
            })
        }
    }

    const payOnlineStore = async () => {
        resetLoader()

        await db
            .collection("users")
            .doc(auth.currentUser.uid)
            .collection("checkout_sessions")
            .add({
                // price: 'price_1Ocw7JCIw3L7DOwIWpAyVUiB', // real price
                price: 'price_1OdwZqCIw3L7DOwIj1Fu96SW', // test price
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

    //update styling of the page


    return (
        <div className="page-wrapper">
            <div className="content">
                <View style={styles.container}>
                    <View style={styles.headerRowContainer}>
                        <Text style={styles.headerTxt}>Online Store Settings</Text>
                    </View>
                    <View style={styles.detailInputContainer}>
                        {/* <ScrollView>
                            {onlineStoreDetails.paidStatus !== 'active' ? <Button title="Pay for online store" onPress={payOnlineStore} /> : <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                                <Text>Online Store Active?</Text>
                                <Switch value={onlineStoreDetails.onlineStoreActive} onValueChange={makeOnlineStoreActive} />
                            </View>}
                            <Text>Order Url Ending: </Text>
                            <TextInput
                                placeholder="Enter Url Ending"
                                value={onlineStoreDetails.urlEnding ? onlineStoreDetails.urlEnding : urlEnding}
                                onChangeText={(text) => { if (!onlineStoreDetails.onlineStoreSetUp) { seturlEnding(text.replace(/[^a-zA-Z-]/g, '').toLowerCase()) } }}
                            />
                            <Button title='Start Online Store' onPress={startOnlineStore} disabled={onlineStoreDetails.onlineStoreSetUp} />

                            <Text>Stripe Details: </Text>
                            <TextInput placeholder="Enter Stripe Public Key" value={onlineStoreDetails.stripePublicKey ? onlineStoreDetails.stripePublicKey : stripePublicKey} onChangeText={(text) => { setstripePublicKey(text) }} />
                            <TextInput placeholder="Enter Stripe Secret Key" value={onlineStoreDetails.stripeSecretKey ? onlineStoreDetails.stripeSecretKey : stripeSecretKey} onChangeText={(text) => { setstripeSecretKey(text) }} />
                            <Button title='Update Stripe Details' onPress={() => { updateStripeDetails() }} />
                        </ScrollView> */}
                        {onlineStoreDetails.paidStatus === 'active' ?
                            <View style={tw.style([
                                'flex-row',
                                'justify-between',
                                'items-center',
                                'mb-5',
                            ])}>
                                <Text style={tw.style('text-base')}>Online Store Active?</Text>
                                <Switch value={onlineStoreDetails.onlineStoreActive} onValueChange={makeOnlineStoreActive} />
                            </View> :
                            <TouchableOpacity onPress={payOnlineStore} style={tw.style('bg-blue-500 p-2 rounded-md')}>
                                <Text style={tw.style('text-white')}>Pay for online store</Text>
                            </TouchableOpacity>
                        }
                        <View style={tw.style('mb-5')}>
                            <Text style={tw.style('text-base')}>Order Url Ending: </Text>
                            <TextInput
                                placeholder="Enter Url Ending"
                                value={onlineStoreDetails.urlEnding ? onlineStoreDetails.urlEnding : urlEnding}
                                onChangeText={(text) => { if (!onlineStoreDetails.onlineStoreSetUp) { seturlEnding(text.replace(/[^a-zA-Z-]/g, '').toLowerCase()) } }}
                            />
                            {!onlineStoreDetails.onlineStoreSetUp && <TouchableOpacity onPress={startOnlineStore} disabled={onlineStoreDetails.onlineStoreSetUp} style={tw.style('bg-blue-500 p-2 rounded-md')}>
                                <Text style={tw.style('text-white')}>Start Online Store</Text>
                            </TouchableOpacity>}
                            <View style={tw.style('mt-5')}>
                                <View >
                                    <Text style={tw.style('text-base')}>Stripe Public Key</Text>
                                    <TextInput placeholder="Enter Stripe Public Key" value={onlineStoreDetails.stripePublicKey ? onlineStoreDetails.stripePublicKey : stripePublicKey} onChangeText={(text) => { setstripePublicKey(text) }} />
                                </View>
                                <View style={tw.style('mt-5')}>
                                    <Text style={tw.style('text-base')}>Stripe Secret Key</Text>
                                    <TextInput placeholder="Enter Stripe Secret Key" value={onlineStoreDetails.stripeSecretKey ? onlineStoreDetails.stripeSecretKey : stripeSecretKey} onChangeText={(text) => { setstripeSecretKey(text) }} />
                                </View>
                                <TouchableOpacity onPress={() => { updateStripeDetails() }} style={tw.style([
                                    'bg-blue-500',
                                    'p-5',
                                    'rounded-md',
                                    'mt-5',

                                ])}>
                                    <Text style={tw.style(['text-white',
                                        'text-center',
                                        'text-base'
                                    ])}>Update Billing Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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

export default OnlineStoreSettings;
