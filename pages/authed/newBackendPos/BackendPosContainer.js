import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import DropDownMenuBtn from "./components/DropDownMenuBtn";
import React, { useEffect, useRef, useState } from "react";
import { Route, useHistory, useLocation, withRouter } from "react-router-dom";
import { auth, db } from "state/firebaseConfig";
import {
  setTransListState,
  setTransListTableOrgState,
  storeDetailState,
  woocommerceState,
} from "state/state";
import firebase from "firebase/app";
import MenuBtn from "./components/MenuBtn";
import index from "../backendPos/Router/newAuthIndex";

const tz = require("moment-timezone");

function BackendPosContainer(props) {
  const { match } = props;
  const wooCredentials = woocommerceState.use();
  const [transList, setTransList] = useState([]);
  const [transListTableOrg, setTransListTableOrg] = useState([]);
  const [isSideMenu, setSideMenu] = useState("");
  const history = useHistory();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [viewVisible, setviewVisible] = useState(false);
  const location = useLocation();
  let pathname = location.pathname;
  const { height, width } = useWindowDimensions();
  const storeDetails = storeDetailState.use();

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

  const Manage = () => {
    resetLoader();
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.href}`,
        locale: "auto",
      })
      .then((response) => {
        console.log(response.data);
        window.location = response.data.url;
      })
      .catch((error) => {
        alert("Unknown error has occured: ", error);
      });
  };

  const getDate = (receipt) => {
    if (receipt.date_created) {
      const dateString = receipt.date_created;

      const newDate = new Date(dateString + "Z");

      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    } else if (receipt.date) {
      const newDate = new Date(receipt.date.seconds * 1000);
      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    }
  };

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
            let orderType = "";
            if (doc.data().method === "deliveryOrder") {
              orderType = "Delivery";
            }
            if (doc.data().method === "pickupOrder") {
              orderType = "Pickup";
            }
            if (doc.data().method === "inStoreOrder") {
              orderType = "In Store";
            }

            setTransList((prevState) => [...prevState, doc.data()]);
            setTransListTableOrg((prevState) => [
              ...prevState,
              {
                ...doc.data(),
                id: doc.data().transNum.toUpperCase(),
                number: doc.data().transNum,
                name: doc.data().customer?.name
                  ? doc.data().customer?.name
                  : "N/A",
                date: getDate(doc.data()),
                originalData: doc.data(),
                amount: doc.data().total,
                system: "POS",
                type: orderType,
              },
            ]);
          });
          //sort by date
          setTransListTableOrg((prevState) => {
            const newList = [
              ...prevState.sort(
                (a, b) =>
                  new Date(
                    b.originalData.date_created
                      ? b.originalData.date_created
                      : b.originalData.date.seconds * 1000
                  ) -
                  new Date(
                    a.originalData.date_created
                      ? a.originalData.date_created
                      : a.originalData.date.seconds * 1000
                  )
              ),
            ];
            setTransList(newList);

            return newList;
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
          .then(() => setTransList((prevState) => [...prevState, ...orders]))
          .catch((e) => console.log("error has occured"));
      } catch {
        console.log("Something occured with woo");
      }
    }
  }, []);

  useEffect(() => {
    setTransListState(transList);
    setTransListTableOrgState(transListTableOrg);
  }, [transList, transListTableOrg]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./assets/images/image_nrJg..png")}
          resizeMode="contain"
          style={styles.logo}
        ></Image>
        <View style={styles.rightSideRow}>
          <TouchableOpacity
            onPress={() => history.push("/pos")}
            activeOpacity={0.8}
            style={styles.backToPOSBtn}
          >
            <Text style={styles.pos}>POS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} activeOpacity={0.8}>
            <View style={styles.iconWithNameGroup}>
              <Image
                source={require("./assets/images/image_bTyU..png")}
                resizeMode="contain"
                style={styles.userIcon}
              ></Image>
              <Text style={styles.username}>{storeDetails.name}</Text>
            </View>
            <Icon
              name="chevron-small-down"
              style={styles.chevronDownIcon}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.bottom, { height: height - 75, paddingTop: 50 }]}>
        <View style={styles.leftMenu}>
          <View style={[styles.menuOptionsContainer, { height: "100%" }]}>
            <MenuBtn
              labelImg={require("./assets/images/dashboardLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 107,
              }}
              active={pathname.includes("dashboard")}
              onPress={() => {
                history.push("/authed/dashboard");
                setSideMenu("");
              }}
            />
            <DropDownMenuBtn
              active={pathname.includes("/authed/product")}
              dropDownOpen={isSideMenu === "product"}
              toggleDropdown={() =>
                setSideMenu((prev) => (prev === "product" ? "" : "product"))
              }
              labelImg={require("./assets/images/menuLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 70,
              }}
              options={[
                {
                  label: "Category Management",
                  link: "/authed/product/categorylist-product",
                  active: pathname.includes("categorylist"),
                },
                {
                  label: "Product Management",
                  link: "/authed/product/productlist-product",
                  active: pathname.includes("productlist-"),
                },
              ]}
            />
            <DropDownMenuBtn
              active={pathname.includes("/authed/report")}
              dropDownOpen={isSideMenu === "report"}
              toggleDropdown={() =>
                setSideMenu((prev) => (prev === "report" ? "" : "report"))
              }
              labelImg={require("./assets/images/reportsLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 87,
              }}
              options={[
                {
                  label: "Invoice Report",
                  link: "/authed/report/invoicereport",
                  active: pathname.includes("invoicereport"),
                },
                {
                  label: "Employees Report",
                  link: "/authed/report/employeesreport",
                  active: pathname.includes("employeesreport"),
                },
                // {
                //   label: "Add Employee",
                //   link: "/authed/report/addemployee",
                //   active: pathname.includes("addemployee"),
                // },
              ]}
            />
            <DropDownMenuBtn
              active={pathname.includes("/authed/settings")}
              dropDownOpen={isSideMenu === "settings"}
              toggleDropdown={() =>
                setSideMenu((prev) => (prev === "settings" ? "" : "settings"))
              }
              labelImg={require("./assets/images/storeSettingsLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 132,
              }}
              options={[
                {
                  label: "General Settings",
                  link: "/authed/settings/generalsettings",
                  active: pathname.includes("generalsettings"),
                },
                {
                  label: "Device Settings",
                  link: "/authed/settings/devicesettings",
                  active: pathname.includes("devicesettings"),
                },
                {
                  label: "Online Store Settings",
                  link: "/authed/settings/onlinestoresettings",
                  active: pathname.includes("onlinestoresettings"),
                },
                {
                  label: "Manage Billing",
                  link: () => Manage(),
                  active: false,
                },
              ]}
            />
            <MenuBtn
              labelImg={require("./assets/images/helpLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 63,
              }}
              active={pathname.includes("help")}
              onPress={() => {
                history.push("/authed/help");
                setSideMenu("");
              }}
            />
          </View>
        </View>
        <View style={styles.rightSide}>
          <View style={{ height: "100%" }}>
            <View style={[styles.page]}>
              {index &&
                index.map((route, key) => (
                  <Route
                    key={key}
                    path={`${match.url}/${route.path}`}
                    component={route.component}
                  />
                ))}
            </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to fill the available screen space
    backgroundColor: "#eef2ff",
  },
  header: {
    height: 75, // Consider if this needs adjustment
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    flex: 1, // Instead of a fixed height, use flex to fill available space
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(238,242,255,1)",
  },
  logo: {
    height: 70,
    width: 222,
    marginRight: 20,
    marginLeft: 20,
  },
  rightSideRow: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 50,
  },
  backToPOSBtn: {
    width: 140,
    height: 32,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  pos: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  userBtn: {
    width: 182,
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWithNameGroup: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userIcon: {
    height: 39,
    width: 40,
    marginRight: 10,
  },
  username: {
    color: "#435869",
    fontSize: 15,
    marginRight: 10,
  },
  chevronDownIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  leftMenu: {
    width: 278,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuOptionsContainer: {
    width: 201,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    marginLeft: 15,
  },
  rightSide: {
    width: 1162,
    height: "100%",
    justifyContent: "flex-end",
  },
  page: {
    width: 1123,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    height: "100%",
  },
});

export default withRouter(BackendPosContainer);
