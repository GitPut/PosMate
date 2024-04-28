import {
  StyleSheet,
  View,
  Image,
  Animated,
  Modal,
  useWindowDimensions,
} from "react-native";
import DropDownMenuBtn from "./components/DropDownMenuBtn";
import React, { useEffect, useRef, useState } from "react";
import { Route, useHistory, useLocation, withRouter } from "react-router-dom";
import { auth, db } from "state/firebaseConfig";
import { setTransListState, setTransListTableOrgState } from "state/state";
import firebase from "firebase/compat/app";
import MenuBtn from "./components/MenuBtn";
import index from "./authIndex";
import { useAlert } from "react-alert";
import Header from "../../../components/Header/Header";
import { TransListStateItem } from "types/global";
import ParseDate from "components/functional/ParseDate";

function BackendPosContainer(props: { match: { url: string } }) {
  const { match } = props;
  const [transList, setTransList] = useState<TransListStateItem[]>([]);
  const [transListTableOrg, setTransListTableOrg] = useState<
    TransListStateItem[]
  >([]);
  const [isSideMenu, setSideMenu] = useState("");
  const history = useHistory();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [viewVisible, setviewVisible] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { height, width } = useWindowDimensions();
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

  const Manage = () => {
    resetLoader();
    console.log("Awaiting billing portal url");
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.href}`,
        locale: "auto",
      })
      .then((response) => {
        console.log("Redirecting to billing portal");
        window.location = response.data.url;
      })
      .catch((error) => {
        alertP.error("Unknown error has occured: ", error);
      });
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

            const docData = doc.data();

            setTransList((prevState) => [
              ...prevState,
              {
                ...docData,
                id: docData.transNum.toUpperCase(),
                number: docData.transNum,
                name: docData.customer?.name ? docData.customer?.name : "N/A",
                date: docData.date,
                // date: "test",
                originalData: {
                  ...docData,
                  id: docData.id,
                  cart: docData.cart,
                  cartNote: docData.cartNote,
                  customer: docData.customer,
                  date: docData.date,
                  method: docData.method,
                  online: docData.online,
                  isInStoreOrder: docData.isInStoreOrder,
                  transNum: docData.transNum,
                  total: docData.total,
                },
                docID: doc.id,
                amount: docData.total,
                system: "POS",
                type: orderType,
                method: docData.method,
              },
            ]);
            setTransListTableOrg((prevState) => [
              ...prevState,
              {
                ...docData,
                id: docData.transNum.toUpperCase(),
                number: docData.transNum,
                name: docData.customer?.name ? docData.customer?.name : "N/A",
                date: docData.date,
                // date: "test",
                originalData: {
                  ...docData,
                  id: docData.id,
                  cart: docData.cart,
                  cartNote: docData.cartNote,
                  customer: docData.customer,
                  date: docData.date,
                  method: docData.method,
                  online: docData.online,
                  isInStoreOrder: docData.isInStoreOrder,
                  transNum: docData.transNum,
                  total: docData.total,
                },
                docID: doc.id,
                amount: docData.total,
                system: "POS",
                type: orderType,
                method: docData.method,
              },
            ]);
          });
          //sort by date
          setTransListTableOrg((prevState) => {
            const newList = [
              ...prevState.sort((a, b) => {
                const aDate = ParseDate(a.date);
                const bDate = ParseDate(b.date);

                if (aDate && bDate) {
                  return bDate.getTime() - aDate.getTime();
                } else {
                  return 0;
                }
              }),
            ];
            setTransList(newList);

            return newList;
          });
        });
    } catch {
      console.log("Error occured retrieving tranasctions");
    }
  }, []);

  useEffect(() => {
    setTransListState(transList);
    setTransListTableOrgState(transListTableOrg);
  }, [transList, transListTableOrg]);

  return (
    <View style={styles.container}>
      <Header
        onPressLogo={() => {
          history.push("/authed/dashboard");
          setSideMenu("");
        }}
        isPosHeader={true}
      />
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
            <DropDownMenuBtn
              labelImg={require("./assets/images/helpLbl.png")}
              labelImgStyle={{
                height: 18,
                width: 63,
              }}
              active={pathname.includes("help")}
              dropDownOpen={isSideMenu === "help"}
              toggleDropdown={() =>
                setSideMenu((prev) => (prev === "help" ? "" : "help"))
              }
              options={[
                {
                  label: "Getting Started",
                  link: "/authed/help/1",
                  active: pathname.includes("help/1"),
                },
                {
                  label: "Device & Store Settings",
                  link: "/authed/help/2",
                  active: pathname.includes("help/2"),
                },
                {
                  label: "Dashboard & Analytics",
                  link: "/authed/help/3",
                  active: pathname.includes("help/3"),
                },
                {
                  label: "Building Products",
                  link: "/authed/help/4",
                  active: pathname.includes("help/4"),
                },
                {
                  label: "Managing Reports",
                  link: "/authed/help/5",
                  active: pathname.includes("help/5"),
                },
              ]}
            />
          </View>
        </View>
        <View
          style={[
            styles.rightSide,
            pathname.includes("dashboard") && {
              width: width < 1300 ? "73%" : "80%",
              backgroundColor: "grey",
            },
          ]}
        >
          <View style={{ height: "100%" }}>
            <View
              style={[
                !pathname.includes("employeesreport") &&
                  !pathname.includes("editemployee") &&
                  !pathname.includes("onlinestoresettings") &&
                  !pathname.includes("dashboard") &&
                  styles.page,
                pathname.includes("dashboard") && {
                  backgroundColor: "rgba(238, 242, 255, 1)",
                  height: "100%",
                  width: "100%",
                },
              ]}
            >
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
    width: "78%",
    height: "100%",
    justifyContent: "flex-end",
  },
  page: {
    width: "100%",
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
  logoutFromAccount: {
    fontWeight: "700",
    color: "#121212",
  },
  logoutIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 26,
  },
});

export default withRouter(BackendPosContainer);
