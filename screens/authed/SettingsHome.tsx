import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@react-native-material/core";
import { logout } from "state/firebaseFunctions";
import useWindowDimensions from "components/useWindowDimensions";
import Logo from "assets/dpos-logo.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import StatsScreen from "./StatsScreen";
import EditStoreDetails from "components/EditStoreDetails";
import ProductAndCatManager from "./ProductAndCatManager";
import {
  setTutorialDetailsState,
  tutorialDetailsState,
  woocommerceState,
} from "state/state";
import { auth, db } from "state/firebaseConfig";
import PlanUpdateTest from "./PlanUpdateTest";
import ViewTransactions from "./ViewTransactions";
import HelpModal from "components/HelpModal";
import TutorialStep from "components/tutorial/TutorialStep";
import SettingsHeader from "components/SettingsHeader";
const tz = require("moment-timezone");

const SettingsHome = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [currentSettingPage, setcurrentSettingPage] = useState(null);

  ////
  const wooCredentials = woocommerceState.use();
  const [transList, settransList] = useState([]);
  const [todaysDetails, setTodaysDetails] = useState({
    todaysReceiptValue: 0,
    todaysReceipts: 0,
  });
  const tutorialDetails = tutorialDetailsState.use();

  useEffect(() => {
    if (!tutorialDetails.complete && tutorialDetails.step == 1) {
      setTutorialDetailsState((prev) => ({ ...prev, step: 2 }));
      localStorage.setItem(
        "tutorialComplete",
        JSON.stringify({
          complete: false,
          step: 2,
        })
      );
    }
  }, []);

  useEffect(() => {
    try {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            settransList((prevState) => [...prevState, doc.data()]);
          });
        });
    } catch {
      console.log("Error occured retrieving tranasctions");
    }

    if (wooCredentials.useWoocommerce === true) {
      try {
        const WooCommerceAPI = require("woocommerce-api");

        const WooCommerce = new WooCommerceAPI({
          url: wooCredentials.apiUrl,
          consumerKey: wooCredentials.ck,
          consumerSecret: wooCredentials.cs,
          wpAPI: true,
          version: "wc/v1",
        });

        let page = 1;
        let orders = [];

        const getOrders = async () => {
          const response = await WooCommerce.getAsync(
            `orders?page=${page}&per_page=100`
          );
          const data = JSON.parse(response.body);
          orders = [...orders, ...data];
          if (data.length === 100) {
            page++;
            getOrders();
          } else {
            // console.log(orders);
          }
        };

        getOrders()
          .then(() => settransList((prevState) => [...prevState, ...orders]))
          .catch((e) => console.log("error has occured"));
      } catch {
        console.log("Something occured with woo");
      }
    }
  }, []);

  useEffect(() => {
    try {
      if (transList.length > 0) {
        settransList((prev) =>
          prev
            .sort(function (a, b) {
              if (a.date && b.date) {
                return a.date.seconds - b.date.seconds;
              } else if (a.date && b.date_created) {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date.seconds * 1000);
                const newDateB = new Date(b.date_created + "Z");
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              } else if (a.date_created && b.date) {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date_created + "Z");
                const newDateB = new Date(b.date.seconds * 1000);
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              } else {
                const targetTimezone =
                  Intl.DateTimeFormat().resolvedOptions().timeZone;
                const newDateA = new Date(a.date_created + "Z");
                const newDateB = new Date(b.date_created + "Z");
                const resultA = tz(newDateA).tz(targetTimezone, true);
                const resultB = tz(newDateB).tz(targetTimezone, true);

                return resultA.valueOf() - resultB.valueOf();
              }
            })
            .reverse()
        );
        // settransList(sortedTransList);
        const todaysReceiptValue = transList.reduce((accumulator, current) => {
          let date;
          const targetTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (current.date) {
            const localDatePreConv = new Date(current.date.seconds * 1000);
            date = tz(localDatePreConv).tz(targetTimezone, true);
          } else {
            const localDatePreConv = new Date(current.date_created + "Z");
            date = tz(localDatePreConv).tz(targetTimezone, true);
          }
          // Get the current date in the desired time zone
          let today = tz().tz(targetTimezone);

          if (
            today.year() === date.year() &&
            today.month() === date.month() &&
            today.dayOfYear() === date.dayOfYear()
          ) {
            return (
              accumulator +
              parseFloat(current.date ? current.total : current.total / 1.13)
            );
          } else {
            return accumulator;
          }
        }, 0);
        const todaysReceipts = transList.reduce((accumulator, current) => {
          let date;
          const targetTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (current.date) {
            const localDatePreConv = new Date(current.date.seconds * 1000);
            date = tz(localDatePreConv).tz(targetTimezone, true);
          } else {
            const localDatePreConv = new Date(current.date_created + "Z");
            date = tz(localDatePreConv).tz(targetTimezone, true);
          }
          // Get the current date in the desired time zone
          let today = tz().tz(targetTimezone);

          if (
            today.year() === date.year() &&
            today.month() === date.month() &&
            today.dayOfYear() === date.dayOfYear()
          ) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);
        setTodaysDetails({
          todaysReceiptValue: todaysReceiptValue.toFixed(2),
          todaysReceipts: todaysReceipts,
        });
      }
    } catch {
      console.log("Error Occured when sorting dates");
    }
  }, [transList]);
  ////

  const innerBlock = useMemo(
    () => (
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View
          style={{
            height: "100%",
            width: "10%",
            backgroundColor: "rgba(31,35,48,1)",
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 30,
            shadowOpacity: 0.91,
            shadowRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setcurrentSettingPage(null)}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Ionicons
              name="ios-stats-chart"
              size={32}
              color={
                currentSettingPage !== "productManager" &&
                currentSettingPage !== "storeManager"
                  ? "white"
                  : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcurrentSettingPage("productManager")}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={32}
              color={
                currentSettingPage === "productManager" ? "white" : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcurrentSettingPage("storeManager")}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons
              name="store"
              size={32}
              color={
                currentSettingPage === "storeManager" ? "white" : "#777777"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={{
              backgroundColor: "rgba(41,44,56,1)",
              borderRadius: 100,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons name="logout" size={32} color="#777777" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%", height: "100%" }}>
          <SettingsHeader />
          {/* <MenuScreen catalog={catalog} navigation={navigation} /> */}
          <View
            style={{
              height: height - 80,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            {/* <Text>HEllo</Text> */}
            {currentSettingPage !== "productManager" &&
              currentSettingPage !== "storeManager" && (
                // <StatsScreen />
                <ViewTransactions
                  transList={transList}
                  todaysDetails={todaysDetails}
                />
              )}
            {currentSettingPage === "storeManager" && <EditStoreDetails />}
            {currentSettingPage === "productManager" && (
              <ProductAndCatManager navigation={navigation} />
            )}
          </View>
        </View>
      </View>
    ),
    [currentSettingPage, todaysDetails, transList]
  );

  return (
    <View style={{ flex: 1, height: height, width: width }}>{innerBlock}</View>
  );
};

export default SettingsHome;

const styles = StyleSheet.create({});
