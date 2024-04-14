import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Animated, TextInput, Pressable, Modal, Image } from "react-native";
import {
    onlineStoreState,
    setOnlineStoreState,
    storeDetailState,
    userStoreState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import { loadStripe } from "@stripe/stripe-js";
import GeneralSwitch from "components/GeneralSwitch";
import PayForOnlineStore from "./components/PayForOnlineStore";
import { useAlert } from "react-alert";

function OnlineStoreSettings() {
    const onlineStoreDetails = onlineStoreState.use()
    const storeDetails = storeDetailState.use()
    const catalog = userStoreState.use()
    const [urlEnding, seturlEnding] = useState(onlineStoreDetails.urlEnding)
    const [stripePublicKey, setstripePublicKey] = useState(onlineStoreDetails.stripePublicKey)
    const [stripeSecretKey, setstripeSecretKey] = useState(onlineStoreDetails.stripeSecretKey)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [viewVisible, setviewVisible] = useState(false);
    const alertP = useAlert();

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
                        stripePublicKey: stripePublicKey,
                    }).then(() => {
                        catalog.products.forEach((product) => {
                            db.collection("public").doc(auth.currentUser.uid).collection("products").doc(product.id).set(product)
                        })
                        db.collection('users').doc(auth.currentUser.uid).update({
                            onlineStoreActive: true,
                            onlineStoreSetUp: true,
                            urlEnding: urlEnding,
                            stripePublicKey: stripePublicKey,
                            stripeSecretKey: stripeSecretKey
                        })
                        setOnlineStoreState({
                            onlineStoreActive: true,
                            onlineStoreSetUp: true,
                            urlEnding: urlEnding,
                            stripePublicKey: stripePublicKey,
                            stripeSecretKey: stripeSecretKey
                        })
                    })
                } else {
                    alertP.error("This url ending is already taken. Please choose another one.")
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
        alertP.success("Stripe details updated successfully")
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
                price: 'price_1Ocw7JCIw3L7DOwIWpAyVUiB', // real price
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
                        alertP.error(`An error occurred`);
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

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.onlineStoreSettingsHeader}>
                    Online Store Settings
                </Text>
            </View>
            <View style={styles.onlineStoreInnerContainer}>
                {
                    onlineStoreDetails.paidStatus === 'active' ? <View style={styles.innerGroup}>
                        <View style={styles.inputsGroup}>
                            <View style={styles.urlEndingInputGroup}>
                                <Text style={styles.onlineUrlEndingTxt}>Online URL Ending</Text>
                                {onlineStoreDetails.onlineStoreSetUp ? <Pressable activeOpacity={1} style={[styles.uRLBox, { justifyContent: 'center' }]}><Text>{onlineStoreDetails.urlEnding}</Text></Pressable> : <TextInput style={styles.uRLBox} placeholder="EX: https://auth.divinepos.com/order/yoururlname" value={onlineStoreDetails.urlEnding ? onlineStoreDetails.urlEnding : urlEnding}
                                    onChangeText={(text) => { if (!onlineStoreDetails.onlineStoreSetUp) { seturlEnding(text.replace(/[^a-zA-Z-]/g, '').toLowerCase()) } }} />}
                            </View>
                            <View style={styles.stripePublicKeyInputGroup}>
                                <Text style={styles.stripePublicKeyTxt}>Stripe Public Key</Text>
                                <TextInput style={styles.stripeKeyBox} placeholder="Enter Public Key" value={onlineStoreDetails.stripePublicKey ? onlineStoreDetails.stripePublicKey : stripePublicKey} onChangeText={(text) => { setstripePublicKey(text) }} />
                            </View>
                            <View style={styles.stripePrivateKeyInputGroup}>
                                <Text style={styles.stripePrivateKeyTxt}>Stripe Private Key</Text>
                                <TextInput style={styles.stripePrivateKeyBox} placeholder="Enter Private Key" value={onlineStoreDetails.stripeSecretKey ? onlineStoreDetails.stripeSecretKey : stripeSecretKey} onChangeText={(text) => { setstripeSecretKey(text) }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontWeight: '700', marginRight: 10, }}>Online Store Active Status:</Text>
                                <GeneralSwitch isActive={onlineStoreDetails.onlineStoreActive} toggleSwitch={makeOnlineStoreActive} />
                            </View>
                        </View>
                        <View style={styles.bottomBtnGroup}>
                            <Text style={styles.readInfo}>
                                {onlineStoreDetails.onlineStoreSetUp ? '*Your Store Url Has Already Been Set' : '*Once Confirmed Your Url CAN NOT BE CHANGED'}
                            </Text>
                            {onlineStoreDetails.onlineStoreSetUp ? <Pressable style={styles.confirmBtn} activeOpacity={0.7} onPress={updateStripeDetails}>
                                <Text style={styles.confirmTxtBtn}>Update</Text>
                            </Pressable> : <Pressable style={styles.confirmBtn} activeOpacity={0.7} onPress={startOnlineStore}>
                                <Text style={styles.confirmTxtBtn}>Confirm</Text>
                            </Pressable>}
                        </View>
                    </View>
                        :
                        <PayForOnlineStore payOnlineStore={payOnlineStore} />
                }
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
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: 691,
        height: 562
    },
    headerContainer: {
        height: 19,
        alignSelf: "stretch"
    },
    onlineStoreSettingsHeader: {
        fontWeight: '700',
        color: "#121212",
        fontSize: 16
    },
    onlineStoreInnerContainer: {
        width: 499,
        height: 485,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#bfc1cb",
        shadowColor: "#b6b8c2",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 600,
        shadowOpacity: 1,
        shadowRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    innerGroup: {
        width: 358,
        height: 419,
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputsGroup: {
        width: 358,
        height: 300,
        justifyContent: "space-between"
    },
    urlEndingInputGroup: {
        width: 358,
        height: 86,
        justifyContent: "space-between"
    },
    onlineUrlEndingTxt: {
        fontWeight: '700',
        color: "#121212",
        fontSize: 17
    },
    uRLBox: {
        width: 358,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#9b9b9b",
        padding: 10
    },
    stripePublicKeyInputGroup: {
        width: 358,
        height: 87,
        justifyContent: "space-between"
    },
    stripePublicKeyTxt: {
        fontWeight: '700',
        color: "#121212",
        fontSize: 17
    },
    stripeKeyBox: {
        width: 358,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#9b9b9b",
        padding: 10
    },
    stripePrivateKeyInputGroup: {
        width: 358,
        height: 86,
        justifyContent: "space-between"
    },
    stripePrivateKeyTxt: {
        fontWeight: '700',
        color: "#121212",
        fontSize: 17
    },
    stripePrivateKeyBox: {
        width: 358,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#9b9b9b",
        padding: 10
    },
    bottomBtnGroup: {
        width: '100%',
        height: 69,
        justifyContent: 'center',
        alignItems: 'center'
    },
    readInfo: {
        color: "rgba(0,0,0,1)",
        fontSize: 12
    },
    confirmBtn: {
        width: 173,
        height: 46,
        backgroundColor: "#1c294e",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    confirmTxtBtn: {
        fontWeight: '700',
        color: "rgba(255,245,245,1)",
        fontSize: 14
    }
});

export default OnlineStoreSettings;
