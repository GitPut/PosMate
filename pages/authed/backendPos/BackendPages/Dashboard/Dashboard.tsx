import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Text
} from "react-native";
import TotalRevenueBox from "./components/InfoBoxs/TotalRevenueBox";
import MostOrderedItemsBox from "./components/InfoBoxs/MostOrderedItemsBox";
import PickupOrdersBox from "./components/InfoBoxs/PickupOrdersBox";
import DeliveryOrdersBox from "./components/InfoBoxs/DeliveryOrdersBox";
import InStoreOrdersBox from "./components/InfoBoxs/InStoreOrdersBox";
import CustomersBox from "./components/InfoBoxs/CustomersBox";
import OrderWaitTimeBox from "./components/InfoBoxs/OrderWaitTimeBox";
import {
  customersList,
  transListTableOrgState,
  storeDetailState,
} from "state/state";

function Dashboard() {
  const { width } = useWindowDimensions();
  const transListTableOrg = transListTableOrgState.use();
  const customers = customersList.use();
  // const storeDetails = storeDetailState.use();

  // const Test = async () => {
  //   const orderDetails = {
  //     date: "2024-04-12T19:05:49.111Z",
  //     transNum: "geynchh4d",
  //     total: "38.02",
  //     method: "pickupOrder",
  //     online: true,
  //     cart: [
  //       {
  //         name: "Build Your Own Pizza",
  //         price: 10,
  //         description: "",
  //         options: [
  //           "Size: Small",
  //           "Base Sauce Small: Tomato Sauce",
  //           "Do You Want Half & Half Toppings?: No",
  //           "Toppings Small:\n1 X Pepperoni\n1 X Bacon\n1 X Ham",
  //         ],
  //         extraDetails: "",
  //         editableObj: {
  //           price: "6.67",
  //           category: "Home",
  //           imageUrl:
  //             "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2Fy3tmsgje2?alt=media&token=f8bfa85d-2b9e-40b9-87c3-540ddff11ead",
  //           hasImage: true,
  //           id: "y3tmsgje2",
  //           name: "Build Your Own Pizza",
  //           options: [
  //             {
  //               numOfSelectable: "1",
  //               optionsList: [
  //                 {
  //                   label: "Small",
  //                   selected: true,
  //                   priceIncrease: null,
  //                   id: "pd3hk8mquo",
  //                 },
  //                 {
  //                   selected: false,
  //                   label: "Medium",
  //                   id: "ue6z8coqet",
  //                   priceIncrease: "1.58",
  //                 },
  //                 { label: "Large", id: "l28qi0uanq", priceIncrease: "1.35" },
  //                 { label: "X-Large", priceIncrease: "3.82", id: "g7efrjcac6" },
  //               ],
  //               selectedCaseKey: null,
  //               label: "Size",
  //               optionType: "Row",
  //               isRequired: true,
  //               selectedCaseValue: null,
  //               defaultValue: {
  //                 id: "pd3hk8mquo",
  //                 priceIncrease: null,
  //                 label: "Small",
  //               },
  //               id: "evprm3i4e",
  //             },
  //             {
  //               id: "87wq2vjnm",
  //               optionType: "Quantity Dropdown",
  //               numOfSelectable: null,
  //               selectedCaseValue: null,
  //               label: "Crust Option",
  //               selectedCaseKey: null,
  //               optionsList: [
  //                 {
  //                   label: "Thin Crust",
  //                   priceIncrease: null,
  //                   id: "anizsuxokz",
  //                 },
  //                 {
  //                   id: "sqpdbv4udo",
  //                   label: "Thick Crust",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   label: "Light On Cheese",
  //                   priceIncrease: null,
  //                   id: "2225iu2hrk",
  //                 },
  //                 { id: "s11dycmgxa", priceIncrease: null, label: "No Cheese" },
  //                 { priceIncrease: null, label: "Well Done", id: "sqtngqi9gv" },
  //                 {
  //                   priceIncrease: null,
  //                   label: "Light On Sauce",
  //                   id: "2wjmzqkmti",
  //                 },
  //                 { priceIncrease: null, label: "No Sauce", id: "m5owavh1fp" },
  //                 {
  //                   priceIncrease: null,
  //                   label: "Extra Sauce",
  //                   id: "35frunlgva",
  //                 },
  //               ],
  //             },
  //             {
  //               optionType: "Row",
  //               selectedCaseValue: null,
  //               id: "6clc4a9pr",
  //               selectedCaseKey: null,
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Small" },
  //               ],
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   label: "Tomato Sauce",
  //                   selected: true,
  //                   id: "w9sclu9ra1",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Garlic Sauce",
  //                   id: "wu3kzywi1r",
  //                   selected: false,
  //                 },
  //                 {
  //                   id: "eykmoh2yry",
  //                   priceIncrease: "1.11",
  //                   label: "B.B.Q Sauce",
  //                 },
  //                 {
  //                   id: "ruzwfdh6sn",
  //                   priceIncrease: "1.11",
  //                   label: "Pesto Sauce",
  //                 },
  //                 {
  //                   id: "uc0b0o8cfo",
  //                   priceIncrease: "1.11",
  //                   label: "Alfredo Sauce",
  //                 },
  //               ],
  //               defaultValue: {
  //                 label: "Tomato Sauce",
  //                 id: "w9sclu9ra1",
  //                 selected: true,
  //                 priceIncrease: null,
  //               },
  //               label: "Base Sauce Small",
  //               numOfSelectable: "1",
  //             },
  //             {
  //               optionsList: [
  //                 {
  //                   id: "hboxntclvi",
  //                   selected: false,
  //                   priceIncrease: null,
  //                   label: "Tomato Sauce",
  //                 },
  //                 {
  //                   label: "Garlic Sauce",
  //                   id: "y11wcf2i8k",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   id: "jkmd4l6qdc",
  //                   label: "B.B.Q Sauce",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   label: "Pesto Sauce",
  //                   priceIncrease: "1.58",
  //                   id: "bnz7r08ut5",
  //                 },
  //                 {
  //                   label: "Alfredo Sauce",
  //                   priceIncrease: "1.58",
  //                   id: "mh8i1z8nh0",
  //                 },
  //               ],
  //               selectedCaseValue: null,
  //               numOfSelectable: "1",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Medium", selectedCaseKey: "Size" },
  //               ],
  //               label: "Base Sauce Medium",
  //               optionType: "Row",
  //               selectedCaseKey: null,
  //               defaultValue: {
  //                 label: "Tomato Sauce",
  //                 priceIncrease: null,
  //                 id: "hboxntclvi",
  //                 selected: true,
  //               },
  //               id: "3l33uudc5",
  //             },
  //             {
  //               optionType: "Row",
  //               numOfSelectable: "1",
  //               defaultValue: {
  //                 priceIncrease: null,
  //                 label: "Tomato Sauce",
  //                 id: "5nltsmyk73",
  //                 selected: true,
  //               },
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   selected: false,
  //                   id: "5nltsmyk73",
  //                   label: "Tomato Sauce",
  //                 },
  //                 {
  //                   id: "2jcikqzwsd",
  //                   label: "Garlic Sauce",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   label: "B.B.Q Sauce",
  //                   priceIncrease: "1.99",
  //                   id: "fa602k6qva",
  //                 },
  //                 {
  //                   id: "9xeh3zwea3",
  //                   priceIncrease: "1.99",
  //                   label: "Pesto Sauce",
  //                 },
  //                 {
  //                   label: "Alfredo Sauce",
  //                   priceIncrease: "1.99",
  //                   id: "lle467nhwk",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Large" },
  //               ],
  //               id: "yluagw3vv",
  //               selectedCaseValue: null,
  //               label: "Base Sauce Large",
  //               selectedCaseKey: null,
  //             },
  //             {
  //               numOfSelectable: "1",
  //               label: "Base Sauce Extra Large",
  //               defaultValue: {
  //                 id: "bhe5205uqf",
  //                 priceIncrease: null,
  //                 label: "Tomato Sauce",
  //                 selected: true,
  //               },
  //               optionsList: [
  //                 {
  //                   selected: false,
  //                   priceIncrease: null,
  //                   label: "Tomato Sauce",
  //                   id: "bhe5205uqf",
  //                 },
  //                 {
  //                   id: "bjbo72s6u5",
  //                   priceIncrease: "2.5",
  //                   label: "Garlic Sauce",
  //                 },
  //                 {
  //                   id: "s8aiqx1bq2",
  //                   priceIncrease: "2.5",
  //                   label: "B.B.Q Sauce",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Pesto Sauce",
  //                   id: "xn69z94wia",
  //                 },
  //                 {
  //                   id: "agt4e3ap4v",
  //                   label: "Alfredo Sauce",
  //                   priceIncrease: "2.5",
  //                 },
  //               ],
  //               optionType: "Row",
  //               selectedCaseValue: null,
  //               selectedCaseList: [
  //                 { selectedCaseValue: "X-Large", selectedCaseKey: "Size" },
  //               ],
  //               id: "icnsczb6j",
  //               selectedCaseKey: null,
  //             },
  //             {
  //               isRequired: true,
  //               id: "uuv357vu7",
  //               selectedCaseKey: null,
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   selected: true,
  //                   label: "No",
  //                   id: "njjvurjhfa",
  //                 },
  //                 { label: "Yes", id: "n0thmx74wv", priceIncrease: null },
  //               ],
  //               numOfSelectable: "1",
  //               label: "Do You Want Half & Half Toppings?",
  //               optionType: "Dropdown",
  //               selectedCaseValue: null,
  //               defaultValue: {
  //                 id: "njjvurjhfa",
  //                 label: "No",
  //                 priceIncrease: null,
  //               },
  //             },
  //             {
  //               viewType: "Table",
  //               label: "Toppings Small",
  //               selectedCaseValue: null,
  //               selectedCaseKey: null,
  //               numOfSelectable: "",
  //               optionType: "Table View",
  //               optionsList: [
  //                 {
  //                   id: "yyl1kdotdw",
  //                   label: "Pepperoni",
  //                   priceIncrease: "1.11",
  //                   selectedTimes: 1,
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   id: "dog44sq46c",
  //                   label: "Bacon",
  //                   selectedTimes: 1,
  //                 },
  //                 {
  //                   id: "f8jympp7kh",
  //                   priceIncrease: "1.11",
  //                   label: "Ham",
  //                   selectedTimes: 1,
  //                 },
  //                 {
  //                   id: "texlhg0r0s",
  //                   priceIncrease: "1.11",
  //                   label: "Italian Sausage",
  //                 },
  //                 { label: "Salami", id: "49pvnosj8i", priceIncrease: "1.11" },
  //                 {
  //                   id: "aszkf4a77d",
  //                   priceIncrease: "1.11",
  //                   label: "Ground Beef",
  //                 },
  //                 { label: "Chicken", priceIncrease: "1.11", id: "myi7b40hyn" },
  //                 {
  //                   id: "we4uhontcj",
  //                   label: "Anchovies",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   label: "Bacon Strips",
  //                   priceIncrease: "1.11",
  //                   id: "wn790ugw0m",
  //                 },
  //                 { priceIncrease: "1.11", label: "Tomato", id: "16mw14s76h" },
  //                 {
  //                   id: "f7pb8t2k6e",
  //                   label: "Red Onion",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Green Olives",
  //                   id: "c69u9pl43t",
  //                 },
  //                 {
  //                   id: "alll1ag645",
  //                   priceIncrease: "1.11",
  //                   label: "Mushrooms",
  //                 },
  //                 {
  //                   id: "tz91k1lm2i",
  //                   priceIncrease: "1.11",
  //                   label: "Green Peppers",
  //                 },
  //                 {
  //                   id: "awdvzmqfe6",
  //                   priceIncrease: "1.11",
  //                   label: "Black Olives",
  //                 },
  //                 { label: "Onion", id: "ggjri58urh", priceIncrease: "1.11" },
  //                 {
  //                   label: "Pineapple",
  //                   priceIncrease: "1.11",
  //                   id: "w1ab3pdj0w",
  //                 },
  //                 {
  //                   id: "4c41g8egf7",
  //                   priceIncrease: "1.11",
  //                   label: "Hot Peppers",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   priceIncrease: "1.11",
  //                   id: "7xpxpccfvn",
  //                 },
  //                 {
  //                   id: "s7t7kn62hg",
  //                   priceIncrease: "1.11",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   id: "92qksocpax",
  //                   priceIncrease: "1.11",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { priceIncrease: "1.11", id: "b48lwtpk0p", label: "Spinach" },
  //                 {
  //                   id: "famnzonkwf",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "vkty20sdqk",
  //                   priceIncrease: "1.11",
  //                   label: "Grilled Zucchini",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   id: "r4c4rdux74",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "g80jloc747",
  //                   label: "Fresh Basil",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   id: "mz4mgtu0dm",
  //                   label: "Caramelized Onion",
  //                 },
  //                 {
  //                   id: "toun6vy96l",
  //                   priceIncrease: "1.11",
  //                   label: "Mozzarella",
  //                 },
  //                 { priceIncrease: "1.11", id: "n4a55naow2", label: "Cheddar" },
  //                 { label: "Feta", priceIncrease: "1.11", id: "9in9fmkg0w" },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Parmigiano",
  //                   id: "jd5099btvq",
  //                 },
  //                 {
  //                   label: "Fior Di Latte",
  //                   id: "zj1258kjvo",
  //                   priceIncrease: "1.11",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Small", selectedCaseKey: "Size" },
  //               ],
  //               id: "8nd7jmt4t",
  //             },
  //             {
  //               numOfSelectable: "",
  //               viewType: "Table",
  //               optionType: "Table View",
  //               selectedCaseValue: null,
  //               selectedCaseKey: null,
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Medium" },
  //               ],
  //               optionsList: [
  //                 {
  //                   label: "Pepperoni",
  //                   priceIncrease: "1.58",
  //                   id: "r9ykdhqreb",
  //                 },
  //                 { priceIncrease: "1.58", label: "Bacon", id: "3xeo5vew0p" },
  //                 { priceIncrease: "1.58", id: "jpsszizeve", label: "Ham" },
  //                 {
  //                   label: "Italian Sausage",
  //                   id: "1meqy93ypp",
  //                   priceIncrease: "1.58",
  //                 },
  //                 { label: "Salami", priceIncrease: "1.58", id: "tz9m3yknf8" },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "rxq176n3ew",
  //                   label: "Ground Beef",
  //                 },
  //                 { priceIncrease: "1.58", label: "Chicken", id: "vnc2jq36bk" },
  //                 {
  //                   label: "Anchovies",
  //                   id: "cv9z98m165",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   label: "Bacon Strips",
  //                   priceIncrease: "1.58",
  //                   id: "bmzmcbexz8",
  //                 },
  //                 { id: "1y95dh7aex", priceIncrease: "1.58", label: "Tomato" },
  //                 {
  //                   label: "Red Onion",
  //                   priceIncrease: "1.58",
  //                   id: "5d9e69upuj",
  //                 },
  //                 {
  //                   label: "Green Olives",
  //                   id: "xhde647wfm",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   id: "we8e3p2ng3",
  //                   label: "Mushrooms",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   id: "d5iibleclh",
  //                   label: "Green Peppers",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   label: "Black Olives",
  //                   id: "umuxkurpa2",
  //                   priceIncrease: "1.58",
  //                 },
  //                 { label: "Onion", priceIncrease: "1.58", id: "kogig5bb5p" },
  //                 {
  //                   label: "Pineapple",
  //                   priceIncrease: "1.58",
  //                   id: "14p95sg6ze",
  //                 },
  //                 {
  //                   label: "Hot Peppers",
  //                   id: "wyy4whgtle",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "ze0w08l0t8",
  //                   label: "Artichoke Hearts",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "1.58",
  //                   id: "ro4epic6to",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Fresh Garlic",
  //                   id: "9gyyflsot8",
  //                 },
  //                 { priceIncrease: "1.58", id: "we1iybgqjh", label: "Spinach" },
  //                 {
  //                   id: "6wrk0fpxan",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "1.58",
  //                   id: "sfxvrlf9jj",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.58",
  //                   id: "mun2eeihbf",
  //                 },
  //                 {
  //                   id: "wzl3zw7pdf",
  //                   label: "Fresh Basil",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Caramelized Onion",
  //                   id: "40hhipd2sm",
  //                 },
  //                 {
  //                   label: "Mozzarella",
  //                   id: "z1phb2nxwo",
  //                   priceIncrease: "1.58",
  //                 },
  //                 { priceIncrease: "1.58", label: "Cheddar", id: "h8g8q7210d" },
  //                 { label: "Feta", priceIncrease: "1.58", id: "hpwffra7wz" },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Parmigiano",
  //                   id: "fb2avbx6k7",
  //                 },
  //                 {
  //                   id: "3wujl5buaa",
  //                   priceIncrease: "1.58",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               label: "Toppings Medium",
  //               id: "ubc2sxmxu",
  //             },
  //             {
  //               selectedCaseValue: null,
  //               optionType: "Table View",
  //               viewType: "Table",
  //               id: "egp9cfnqd",
  //               optionsList: [
  //                 {
  //                   id: "glw52vlkuz",
  //                   priceIncrease: "1.99",
  //                   label: "Pepperoni",
  //                 },
  //                 { priceIncrease: "1.99", label: "Bacon", id: "65cdpcs8xg" },
  //                 { id: "ft9a9xw7b7", priceIncrease: "1.99", label: "Ham" },
  //                 {
  //                   id: "k1t4udfnvx",
  //                   priceIncrease: "1.99",
  //                   label: "Italian Sausage",
  //                 },
  //                 { label: "Salami", id: "ckvhun1cf6", priceIncrease: "1.99" },
  //                 {
  //                   label: "Ground Beef",
  //                   priceIncrease: "1.99",
  //                   id: "3kqztf78lf",
  //                 },
  //                 { label: "Chicken", priceIncrease: "1.99", id: "7vwm9wyukh" },
  //                 {
  //                   label: "Anchovies",
  //                   id: "c96182zddk",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Bacon Strips",
  //                   id: "uliw742fgo",
  //                 },
  //                 { label: "Tomato", id: "lgi916923q", priceIncrease: "1.99" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "yb7vs0kqhp",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   id: "thn6turaa1",
  //                   label: "Green Olives",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Mushrooms",
  //                   id: "yqrtk80lar",
  //                 },
  //                 {
  //                   id: "s3tejgvhb6",
  //                   label: "Green Peppers",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   id: "khfsr49q8g",
  //                   priceIncrease: "1.99",
  //                   label: "Black Olives",
  //                 },
  //                 { priceIncrease: "1.99", id: "kt1enfa7zk", label: "Onion" },
  //                 {
  //                   label: "Pineapple",
  //                   priceIncrease: "1.99",
  //                   id: "9kr1wrey2u",
  //                 },
  //                 {
  //                   id: "spxzzis2jz",
  //                   priceIncrease: "1.99",
  //                   label: "Hot Peppers",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   id: "l0ds8pp1yu",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Jalapino Peppers",
  //                   id: "enpg31z6vb",
  //                 },
  //                 {
  //                   label: "Fresh Garlic",
  //                   priceIncrease: "1.99",
  //                   id: "0j8neyc34b",
  //                 },
  //                 { priceIncrease: "1.99", id: "dl60p0csrf", label: "Spinach" },
  //                 {
  //                   id: "gptchbx1w2",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Grilled Zucchini",
  //                   id: "89l8na9pjc",
  //                 },
  //                 {
  //                   id: "21zcxpw2cl",
  //                   priceIncrease: "1.99",
  //                   label: "Fried Eggplant",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Fresh Basil",
  //                   id: "gpj7nq197i",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "re0uaojie7",
  //                   label: "Caramelized Onion",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "l65wffofqa",
  //                   label: "Mozzarella",
  //                 },
  //                 { id: "v0qqr95et7", label: "Cheddar", priceIncrease: "1.99" },
  //                 { id: "oxcradzqgo", label: "Feta", priceIncrease: "1.99" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Parmigiano",
  //                   id: "d9buykldpa",
  //                 },
  //                 {
  //                   label: "Fior Di Latte",
  //                   priceIncrease: "1.99",
  //                   id: "f7aum0r53b",
  //                 },
  //               ],
  //               selectedCaseKey: null,
  //               label: "Toppings Large",
  //               numOfSelectable: "",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Large", selectedCaseKey: "Size" },
  //               ],
  //             },
  //             {
  //               selectedCaseKey: null,
  //               id: "cqbr1xo1t",
  //               selectedCaseValue: null,
  //               viewType: "Table",
  //               optionsList: [
  //                 {
  //                   label: "Pepperoni",
  //                   id: "4n3vviflf1",
  //                   priceIncrease: "2.5",
  //                 },
  //                 { id: "3hfdacwsyl", label: "Bacon", priceIncrease: "2.5" },
  //                 { priceIncrease: "2.5", id: "87tk4xit0q", label: "Ham" },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "o25q9kcag8",
  //                   label: "Italian Sausage",
  //                 },
  //                 { priceIncrease: "2.5", label: "Salami", id: "0z3fd84aai" },
  //                 {
  //                   id: "i0qt5n9ink",
  //                   label: "Ground Beef",
  //                   priceIncrease: "2.5",
  //                 },
  //                 { id: "z0mf1bealb", label: "Chicken", priceIncrease: "2.5" },
  //                 {
  //                   label: "Anchovies",
  //                   id: "ax5q11cz2x",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "abtkitnum3",
  //                   priceIncrease: "2.5",
  //                   label: "Bacon Strips",
  //                 },
  //                 { label: "Tomato", priceIncrease: "2.5", id: "srxinrg90b" },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "p3rng188d2",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   id: "yn53xnpsam",
  //                   label: "Green Olives",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   label: "Mushrooms",
  //                   priceIncrease: "2.5",
  //                   id: "mi133k36cf",
  //                 },
  //                 {
  //                   label: "Green Peppers",
  //                   id: "dna5sftjmu",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Black Olives",
  //                   id: "o2mii64pbc",
  //                 },
  //                 { id: "m3udt9hnun", label: "Onion", priceIncrease: "2.5" },
  //                 {
  //                   id: "ly778uybw0",
  //                   priceIncrease: "2.5",
  //                   label: "Pineapple",
  //                 },
  //                 {
  //                   label: "Hot Peppers",
  //                   priceIncrease: "2.5",
  //                   id: "datgb40sn8",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Artichoke Hearts",
  //                   id: "9inpiaiktn",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "2.5",
  //                   id: "6ne9mbrixu",
  //                 },
  //                 {
  //                   label: "Fresh Garlic",
  //                   priceIncrease: "2.5",
  //                   id: "bkkk0ukgcc",
  //                 },
  //                 { label: "Spinach", id: "6xknr8sqqc", priceIncrease: "2.5" },
  //                 {
  //                   label: "Red Peppers",
  //                   id: "tzvp2wepow",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "ygf1a7ccvp",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "2.5",
  //                   id: "1r9vethzzk",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "tsbppsh0iw",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   id: "wgfzt10qj2",
  //                   priceIncrease: "2.5",
  //                   label: "Caramelized Onion",
  //                 },
  //                 {
  //                   id: "ri3s1sdvk6",
  //                   priceIncrease: "2.5",
  //                   label: "Mozzarella",
  //                 },
  //                 { id: "rql353x3wm", label: "Cheddar", priceIncrease: "2.5" },
  //                 { id: "r9zp5hpv4f", priceIncrease: "2.5", label: "Feta" },
  //                 {
  //                   label: "Parmigiano",
  //                   priceIncrease: "2.5",
  //                   id: "phkmceti21",
  //                 },
  //                 {
  //                   label: "Fior Di Latte",
  //                   priceIncrease: "2.5",
  //                   id: "4dv18igsiv",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "X-Large" },
  //               ],
  //               label: "Toppings Extra Large",
  //               optionType: "Table View",
  //               numOfSelectable: "",
  //             },
  //             {
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Small" },
  //                 {
  //                   selectedCaseValue: "Yes",
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                 },
  //               ],
  //               id: "2j7xln6r9",
  //               selectedCaseKey: null,
  //               optionsList: [
  //                 {
  //                   id: "8hv267o43p",
  //                   priceIncrease: "0.56",
  //                   label: "Pepperoni",
  //                 },
  //                 { label: "Bacon", priceIncrease: "0.56", id: "riuppf7om0" },
  //                 { label: "Ham", priceIncrease: "0.56", id: "52xah5fmau" },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "jhgjna9eny",
  //                   label: "Italian Sausage",
  //                 },
  //                 { priceIncrease: "0.56", id: "eeojtm6cu1", label: "Salami" },
  //                 {
  //                   label: "Ground Beef",
  //                   id: "nspy8qn0bv",
  //                   priceIncrease: "0.56",
  //                 },
  //                 { priceIncrease: "0.56", id: "qzhb3hich7", label: "Chicken" },
  //                 {
  //                   id: "0p6g2yvamd",
  //                   label: "Anchovies",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Bacon Strips",
  //                   id: "xskf9piy77",
  //                 },
  //                 { label: "Tomato", id: "i1e0dfp4gf", priceIncrease: "0.56" },
  //                 {
  //                   label: "Red Onion",
  //                   id: "xyekr37kqg",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "miqi9rkc0i",
  //                   label: "Green Olives",
  //                 },
  //                 {
  //                   label: "Mushrooms",
  //                   priceIncrease: "0.56",
  //                   id: "dk3lt4e7k2",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Green Peppers",
  //                   id: "a37ec5dj9m",
  //                 },
  //                 {
  //                   id: "zjoyi0q2do",
  //                   label: "Black Olives",
  //                   priceIncrease: "0.56",
  //                 },
  //                 { id: "svnrb13vg0", priceIncrease: "0.56", label: "Onion" },
  //                 {
  //                   label: "Pineapple",
  //                   priceIncrease: "0.56",
  //                   id: "20pn48vp8f",
  //                 },
  //                 {
  //                   label: "Hot Peppers",
  //                   id: "al3hug6csi",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Artichoke Hearts",
  //                   id: "wh6y7c0zg7",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "0.56",
  //                   id: "1i3s0jn6mp",
  //                 },
  //                 {
  //                   id: "959zdd9136",
  //                   priceIncrease: "0.56",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", priceIncrease: "0.56", id: "v9w3edu74z" },
  //                 {
  //                   id: "nye1x78fcv",
  //                   priceIncrease: "0.56",
  //                   label: "Red Peppers",
  //                 },
  //                 {
  //                   id: "cfn4502o9k",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   id: "15derffk0r",
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Fresh Basil",
  //                   id: "hpa18p2ztn",
  //                 },
  //                 {
  //                   label: "Caramelized Onion",
  //                   priceIncrease: "0.56",
  //                   id: "7tbg3k2qjd",
  //                 },
  //                 {
  //                   id: "lyyt2izqyi",
  //                   priceIncrease: "0.56",
  //                   label: "Mozzarella",
  //                 },
  //                 { label: "Cheddar", id: "pt2p5s585g", priceIncrease: "0.56" },
  //                 { id: "1re394c2s3", label: "Feta", priceIncrease: "0.56" },
  //                 {
  //                   label: "Parmigiano",
  //                   priceIncrease: "0.56",
  //                   id: "ey6oj9sbyf",
  //                 },
  //                 {
  //                   id: "wo4ngr5sfd",
  //                   priceIncrease: "0.56",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               label: "Half 1 Toppings Small",
  //               optionType: "Table View",
  //               viewType: "Table",
  //               selectedCaseValue: null,
  //               numOfSelectable: "",
  //             },
  //             {
  //               numOfSelectable: "",
  //               label: "Half 1 Toppings Medium",
  //               selectedCaseKey: null,
  //               id: "5at1jevew",
  //               optionType: "Table View",
  //               optionsList: [
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Pepperoni",
  //                   id: "vw14qilubf",
  //                 },
  //                 { label: "Bacon", priceIncrease: "0.79", id: "inadimn3rx" },
  //                 { id: "klcz67fusx", priceIncrease: "0.79", label: "Ham" },
  //                 {
  //                   label: "Italian Sausage",
  //                   id: "otmzifzytw",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { id: "mlli1vxse7", label: "Salami", priceIncrease: "0.79" },
  //                 {
  //                   label: "Ground Beef",
  //                   id: "gmn4lxw9k5",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { label: "Chicken", id: "ip84jymduh", priceIncrease: "0.79" },
  //                 {
  //                   id: "4trhou2e2v",
  //                   priceIncrease: "0.79",
  //                   label: "Anchovies",
  //                 },
  //                 {
  //                   label: "Bacon Strips",
  //                   id: "lijdjq499a",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { label: "Tomato", id: "6sb4aybko2", priceIncrease: "0.79" },
  //                 {
  //                   label: "Red Onion",
  //                   id: "mvtsrbbmoe",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   id: "5akw886yt7",
  //                   priceIncrease: "0.79",
  //                   label: "Green Olives",
  //                 },
  //                 {
  //                   label: "Mushrooms",
  //                   id: "y0zd4owp1f",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   label: "Green Peppers",
  //                   id: "f4fuskqcin",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   id: "b4hhhzsddh",
  //                   label: "Black Olives",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { id: "fn1vev2b86", label: "Onion", priceIncrease: "0.79" },
  //                 {
  //                   label: "Pineapple",
  //                   priceIncrease: "0.79",
  //                   id: "c1o2a785p9",
  //                 },
  //                 {
  //                   id: "u1wx86eugi",
  //                   priceIncrease: "0.79",
  //                   label: "Hot Peppers",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   id: "vtrx0ceefu",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   id: "maf7eyxeyv",
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "jsdthlt2de",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { id: "h18o94z1ui", label: "Spinach", priceIncrease: "0.79" },
  //                 {
  //                   id: "v135hkc46h",
  //                   priceIncrease: "0.79",
  //                   label: "Red Peppers",
  //                 },
  //                 {
  //                   id: "ue8im6ruo2",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "0.79",
  //                   id: "lpvmt1dlfr",
  //                 },
  //                 {
  //                   id: "0ut05e4wsn",
  //                   priceIncrease: "0.79",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   id: "dr9x6vxubr",
  //                   label: "Caramelized Onion",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   id: "1j1ainphzb",
  //                   label: "Mozzarella",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { priceIncrease: "0.79", label: "Cheddar", id: "my2jk5ycxy" },
  //                 { id: "wp2oxwhjtu", priceIncrease: "0.79", label: "Feta" },
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Parmigiano",
  //                   id: "fbrig53lrk",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Fior Di Latte",
  //                   id: "yafrsuo2ny",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Medium", selectedCaseKey: "Size" },
  //                 {
  //                   selectedCaseValue: "Yes",
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                 },
  //               ],
  //               selectedCaseValue: null,
  //               viewType: "Table",
  //             },
  //             {
  //               selectedCaseValue: null,
  //               numOfSelectable: "",
  //               optionsList: [
  //                 { label: "Pepperoni", id: "ruymi5rz6s", priceIncrease: "1" },
  //                 { id: "ubqpzmr8md", priceIncrease: "1", label: "Bacon" },
  //                 { id: "86j3iqv5yf", label: "Ham", priceIncrease: "1" },
  //                 {
  //                   priceIncrease: "1",
  //                   label: "Italian Sausage",
  //                   id: "itxpdib72a",
  //                 },
  //                 { id: "1poh1kjbew", priceIncrease: "1", label: "Salami" },
  //                 {
  //                   label: "Ground Beef",
  //                   priceIncrease: "1",
  //                   id: "r797c41jb8",
  //                 },
  //                 { label: "Chicken", priceIncrease: "1", id: "b43gtcp1j6" },
  //                 { label: "Anchovies", id: "qy76hauo0k", priceIncrease: "1" },
  //                 {
  //                   id: "6t1yrs3i91",
  //                   label: "Bacon Strips",
  //                   priceIncrease: "1",
  //                 },
  //                 { id: "w1sq6uirr1", priceIncrease: "1", label: "Tomato" },
  //                 { id: "2m3thutn4n", priceIncrease: "1", label: "Red Onion" },
  //                 {
  //                   label: "Green Olives",
  //                   id: "61pg688fgj",
  //                   priceIncrease: "1",
  //                 },
  //                 { label: "Mushrooms", priceIncrease: "1", id: "e9u1o0ovsg" },
  //                 {
  //                   label: "Green Peppers",
  //                   id: "32d8yyusfi",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   id: "hfcl1fyciu",
  //                   label: "Black Olives",
  //                   priceIncrease: "1",
  //                 },
  //                 { label: "Onion", id: "p1aovpakj6", priceIncrease: "1" },
  //                 { label: "Pineapple", priceIncrease: "1", id: "lymdbijegp" },
  //                 {
  //                   label: "Hot Peppers",
  //                   priceIncrease: "1",
  //                   id: "2b1ens5zrn",
  //                 },
  //                 {
  //                   priceIncrease: "1",
  //                   label: "Artichoke Hearts",
  //                   id: "10wp7kqxbr",
  //                 },
  //                 {
  //                   priceIncrease: "1",
  //                   id: "53yihkigg3",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   id: "avk7ugsmna",
  //                   priceIncrease: "1",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { id: "goe01d1kfp", priceIncrease: "1", label: "Spinach" },
  //                 {
  //                   id: "67kchb07rx",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   id: "rzjyenw04j",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   id: "xm48a3opir",
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   label: "Fresh Basil",
  //                   id: "4vjgae6eft",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   id: "4719mm27md",
  //                   label: "Caramelized Onion",
  //                   priceIncrease: "1",
  //                 },
  //                 { priceIncrease: "1", label: "Mozzarella", id: "kopzrcfg9y" },
  //                 { priceIncrease: "1", id: "eecdh3evpj", label: "Cheddar" },
  //                 { id: "i5eqwe907l", label: "Feta", priceIncrease: "1" },
  //                 { label: "Parmigiano", id: "uy3xazqknd", priceIncrease: "1" },
  //                 {
  //                   label: "Fior Di Latte",
  //                   id: "scuv7qrxv7",
  //                   priceIncrease: "1",
  //                 },
  //               ],
  //               selectedCaseKey: null,
  //               label: "Half 1 Toppings Large",
  //               id: "d4cexuo98",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Large", selectedCaseKey: "Size" },
  //                 {
  //                   selectedCaseValue: "Yes",
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                 },
  //               ],
  //               viewType: "Table",
  //               optionType: "Table View",
  //             },
  //             {
  //               label: "Half 1 Toppings Extra Large",
  //               selectedCaseKey: null,
  //               numOfSelectable: "",
  //               viewType: "Table",
  //               id: "1g6aokuxa",
  //               optionType: "Table View",
  //               optionsList: [
  //                 {
  //                   id: "ilghofgyhg",
  //                   label: "Pepperoni",
  //                   priceIncrease: "1.25",
  //                 },
  //                 { id: "7h2y017ys3", label: "Bacon", priceIncrease: "1.25" },
  //                 { priceIncrease: "1.25", id: "4rqmp1oca1", label: "Ham" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "ep1st9s1ld",
  //                   label: "Italian Sausage",
  //                 },
  //                 { label: "Salami", priceIncrease: "1.25", id: "j7idd2cqp6" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "23ujalez5e",
  //                   label: "Ground Beef",
  //                 },
  //                 { label: "Chicken", priceIncrease: "1.25", id: "hghfuuz1ex" },
  //                 {
  //                   label: "Anchovies",
  //                   priceIncrease: "1.25",
  //                   id: "tim7uekmby",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Bacon Strips",
  //                   id: "t9dxslsstu",
  //                 },
  //                 { id: "qyg2rorihs", label: "Tomato", priceIncrease: "1.25" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Red Onion",
  //                   id: "qii1e9kr9c",
  //                 },
  //                 {
  //                   label: "Green Olives",
  //                   priceIncrease: "1.25",
  //                   id: "zgz7n3vc8g",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Mushrooms",
  //                   id: "vbjdsievrl",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Green Peppers",
  //                   id: "tbw5l7t6zk",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "mns33lwafz",
  //                   label: "Black Olives",
  //                 },
  //                 { label: "Onion", priceIncrease: "1.25", id: "em6zzc86oi" },
  //                 {
  //                   id: "mmylicuvhh",
  //                   priceIncrease: "1.25",
  //                   label: "Pineapple",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "z3f81aania",
  //                   label: "Hot Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Artichoke Hearts",
  //                   id: "pra7j2vm41",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "ncymcypfl7",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "j024jpkbax",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { id: "xy1r7bbsw5", label: "Spinach", priceIncrease: "1.25" },
  //                 {
  //                   id: "bm94p2bxpm",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "zy8ydu0a5b",
  //                   label: "Grilled Zucchini",
  //                 },
  //                 {
  //                   id: "6lzxa77xz2",
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   id: "cqqmmd9evd",
  //                   priceIncrease: "1.25",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Caramelized Onion",
  //                   id: "91xw3044c7",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Mozzarella",
  //                   id: "oxp8zt0t71",
  //                 },
  //                 { id: "d3fplxxc56", label: "Cheddar", priceIncrease: "1.25" },
  //                 { priceIncrease: "1.25", id: "ubd0g8tovu", label: "Feta" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "315lb5trsf",
  //                   label: "Parmigiano",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Fior Di Latte",
  //                   id: "1ljhfjious",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseValue: "X-Large", selectedCaseKey: "Size" },
  //                 {
  //                   selectedCaseValue: "Yes",
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                 },
  //               ],
  //               selectedCaseValue: null,
  //             },
  //             {
  //               selectedCaseValue: null,
  //               optionType: "Table View",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Small", selectedCaseKey: "Size" },
  //                 {
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                   selectedCaseValue: "Yes",
  //                 },
  //               ],
  //               label: "Half 2 Toppings Small",
  //               optionsList: [
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Pepperoni",
  //                   id: "zqdrosra5w",
  //                 },
  //                 { priceIncrease: "0.56", id: "qoq128mcm4", label: "Bacon" },
  //                 { id: "jz0lsom2vs", label: "Ham", priceIncrease: "0.56" },
  //                 {
  //                   id: "cm10u6ad0r",
  //                   priceIncrease: "0.56",
  //                   label: "Italian Sausage",
  //                 },
  //                 { label: "Salami", id: "k7c0lrtp7b", priceIncrease: "0.56" },
  //                 {
  //                   label: "Ground Beef",
  //                   priceIncrease: "0.56",
  //                   id: "aer4j13z6x",
  //                 },
  //                 { label: "Chicken", id: "taecqp5vg5", priceIncrease: "0.56" },
  //                 {
  //                   id: "r62bfj34b1",
  //                   label: "Anchovies",
  //                   priceIncrease: "0.56",
  //                 },
  //                 {
  //                   id: "bqp11lf9uw",
  //                   priceIncrease: "0.56",
  //                   label: "Bacon Strips",
  //                 },
  //                 { priceIncrease: "0.56", id: "xb6rqz2n13", label: "Tomato" },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "vc5tf0jwwi",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "wmym08c8kr",
  //                   label: "Green Olives",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "06rwnpa86v",
  //                   label: "Mushrooms",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Green Peppers",
  //                   id: "dh62ysr6bs",
  //                 },
  //                 {
  //                   label: "Black Olives",
  //                   id: "hkezc4jymz",
  //                   priceIncrease: "0.56",
  //                 },
  //                 { label: "Onion", id: "g82s8e5ze2", priceIncrease: "0.56" },
  //                 {
  //                   priceIncrease: "0.56",
  //                   label: "Pineapple",
  //                   id: "i5c00zzeks",
  //                 },
  //                 {
  //                   label: "Hot Peppers",
  //                   priceIncrease: "0.56",
  //                   id: "mrl6zta7ce",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   priceIncrease: "0.56",
  //                   id: "oz3bko4fqq",
  //                 },
  //                 {
  //                   id: "xycocu2c4o",
  //                   priceIncrease: "0.56",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   id: "ifna3chqji",
  //                   label: "Fresh Garlic",
  //                   priceIncrease: "0.56",
  //                 },
  //                 { label: "Spinach", priceIncrease: "0.56", id: "x38flc7csv" },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "l02hwuyuby",
  //                   label: "Red Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "f5kae4ezyv",
  //                   label: "Grilled Zucchini",
  //                 },
  //                 {
  //                   id: "q62rpzj758",
  //                   priceIncrease: "0.56",
  //                   label: "Fried Eggplant",
  //                 },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "7ygyv0siaf",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   label: "Caramelized Onion",
  //                   priceIncrease: "0.56",
  //                   id: "jyxvyc8egj",
  //                 },
  //                 {
  //                   label: "Mozzarella",
  //                   priceIncrease: "0.56",
  //                   id: "a3shbne3z3",
  //                 },
  //                 { priceIncrease: "0.56", label: "Cheddar", id: "yni450frnc" },
  //                 { id: "11aq9v54f7", label: "Feta", priceIncrease: "0.56" },
  //                 {
  //                   priceIncrease: "0.56",
  //                   id: "ssekwid6j3",
  //                   label: "Parmigiano",
  //                 },
  //                 {
  //                   id: "pqvdqk9ux7",
  //                   priceIncrease: "0.56",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               viewType: "Table",
  //               selectedCaseKey: null,
  //               numOfSelectable: "",
  //               id: "lz8pvdin4",
  //             },
  //             {
  //               numOfSelectable: "",
  //               viewType: "Table",
  //               optionsList: [
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "77f9nsivu7",
  //                   label: "Pepperoni",
  //                 },
  //                 { id: "kbc57yxa7f", label: "Bacon", priceIncrease: "0.79" },
  //                 { label: "Ham", id: "zvx27dhgc8", priceIncrease: "0.79" },
  //                 {
  //                   id: "osa6n99h2e",
  //                   label: "Italian Sausage",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { priceIncrease: "0.79", label: "Salami", id: "mfr14sgfih" },
  //                 {
  //                   label: "Ground Beef",
  //                   id: "s5ylec0m86",
  //                   priceIncrease: "0.79",
  //                 },
  //                 { label: "Chicken", priceIncrease: "0.79", id: "8i8cps2l4m" },
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Anchovies",
  //                   id: "icq0vr27hp",
  //                 },
  //                 {
  //                   id: "kxqiul8c2e",
  //                   priceIncrease: "0.79",
  //                   label: "Bacon Strips",
  //                 },
  //                 { label: "Tomato", priceIncrease: "0.79", id: "tiej96amgq" },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "fkz7a3sfji",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   label: "Green Olives",
  //                   priceIncrease: "0.79",
  //                   id: "mcir40y08i",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "nkal5gujwm",
  //                   label: "Mushrooms",
  //                 },
  //                 {
  //                   id: "tvspsbuk7t",
  //                   label: "Green Peppers",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   label: "Black Olives",
  //                   priceIncrease: "0.79",
  //                   id: "vqgj0hglm9",
  //                 },
  //                 { priceIncrease: "0.79", id: "i4n2hont6c", label: "Onion" },
  //                 {
  //                   id: "s7yvj28jg6",
  //                   priceIncrease: "0.79",
  //                   label: "Pineapple",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Hot Peppers",
  //                   id: "qzzsqsg46e",
  //                 },
  //                 {
  //                   id: "rsimmpd4pz",
  //                   priceIncrease: "0.79",
  //                   label: "Artichoke Hearts",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "0.79",
  //                   id: "zao7paxop4",
  //                 },
  //                 {
  //                   id: "pk1wik3pvw",
  //                   priceIncrease: "0.79",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", priceIncrease: "0.79", id: "q74u5rsrv5" },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "1hylsqowb3",
  //                   label: "Red Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "de7azxagjz",
  //                   label: "Grilled Zucchini",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   id: "yve8pa0o9j",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   id: "pxtfm0fzlg",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   label: "Caramelized Onion",
  //                   id: "bdkyqhv9nu",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   priceIncrease: "0.79",
  //                   label: "Mozzarella",
  //                   id: "mxr5u4t4fa",
  //                 },
  //                 { label: "Cheddar", priceIncrease: "0.79", id: "97ij38s8v0" },
  //                 { priceIncrease: "0.79", id: "ugpziwflv6", label: "Feta" },
  //                 {
  //                   label: "Parmigiano",
  //                   id: "fg5kkzeci0",
  //                   priceIncrease: "0.79",
  //                 },
  //                 {
  //                   id: "k1wc2yjboe",
  //                   priceIncrease: "0.79",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Medium" },
  //                 {
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                   selectedCaseValue: "Yes",
  //                 },
  //               ],
  //               optionType: "Table View",
  //               label: "Half 2 Toppings Medium",
  //               selectedCaseKey: null,
  //               id: "s5k5hk7ee",
  //               selectedCaseValue: null,
  //             },
  //             {
  //               numOfSelectable: "",
  //               optionType: "Table View",
  //               selectedCaseValue: null,
  //               optionsList: [
  //                 { id: "3xrkw7cjby", priceIncrease: "1", label: "Pepperoni" },
  //                 { id: "3jfdpp8gx7", label: "Bacon", priceIncrease: "1" },
  //                 { id: "90gs77s1ma", priceIncrease: "1", label: "Ham" },
  //                 {
  //                   id: "2mg46mfayc",
  //                   label: "Italian Sausage",
  //                   priceIncrease: "1",
  //                 },
  //                 { label: "Salami", id: "pt8u7uq3ah", priceIncrease: "1" },
  //                 {
  //                   label: "Ground Beef",
  //                   id: "twhrj72rxy",
  //                   priceIncrease: "1",
  //                 },
  //                 { priceIncrease: "1", label: "Chicken", id: "81yeowcus1" },
  //                 { id: "a8xdhaygc8", priceIncrease: "1", label: "Anchovies" },
  //                 {
  //                   id: "l0ax58w8dx",
  //                   label: "Bacon Strips",
  //                   priceIncrease: "1",
  //                 },
  //                 { priceIncrease: "1", label: "Tomato", id: "w27s1pi2iz" },
  //                 { id: "2m0mmgbhyt", priceIncrease: "1", label: "Red Onion" },
  //                 {
  //                   label: "Green Olives",
  //                   id: "4g6iinto9t",
  //                   priceIncrease: "1",
  //                 },
  //                 { priceIncrease: "1", id: "27uc5xg8u4", label: "Mushrooms" },
  //                 {
  //                   label: "Green Peppers",
  //                   priceIncrease: "1",
  //                   id: "jnat0291j7",
  //                 },
  //                 {
  //                   label: "Black Olives",
  //                   priceIncrease: "1",
  //                   id: "6fvv7ger7j",
  //                 },
  //                 { label: "Onion", priceIncrease: "1", id: "mxrbhzilen" },
  //                 { label: "Pineapple", priceIncrease: "1", id: "rssw8xmjs1" },
  //                 {
  //                   priceIncrease: "1",
  //                   label: "Hot Peppers",
  //                   id: "vlzckh3ty8",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   priceIncrease: "1",
  //                   id: "r6mnvjx6wt",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "1",
  //                   id: "g5bbv1am8e",
  //                 },
  //                 {
  //                   priceIncrease: "1",
  //                   id: "1vldy717sx",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", id: "1wp8y12ssk", priceIncrease: "1" },
  //                 {
  //                   id: "c61fwiax1c",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   id: "ob8iw37ij2",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "1",
  //                 },
  //                 {
  //                   priceIncrease: "1",
  //                   id: "1wca88z8js",
  //                   label: "Fried Eggplant",
  //                 },
  //                 {
  //                   id: "hewj3n6aoi",
  //                   priceIncrease: "1",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   priceIncrease: "1",
  //                   label: "Caramelized Onion",
  //                   id: "s1hd1ygokg",
  //                 },
  //                 { id: "r1v550750r", label: "Mozzarella", priceIncrease: "1" },
  //                 { label: "Cheddar", priceIncrease: "1", id: "rqx1f8zmi8" },
  //                 { id: "xrzikb7z1f", label: "Feta", priceIncrease: "1" },
  //                 { priceIncrease: "1", label: "Parmigiano", id: "tqxj3wfzrd" },
  //                 {
  //                   priceIncrease: "1",
  //                   id: "3zfrv7rdvt",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               viewType: "Table",
  //               label: "Half 2 Toppings Large",
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Large" },
  //                 {
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                   selectedCaseValue: "Yes",
  //                 },
  //               ],
  //               id: "ivbf2y99e",
  //               selectedCaseKey: null,
  //             },
  //             {
  //               id: "ox695cyis",
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "X-Large" },
  //                 {
  //                   selectedCaseValue: "Yes",
  //                   selectedCaseKey: "Do You Want Half & Half Toppings?",
  //                 },
  //               ],
  //               optionType: "Table View",
  //               selectedCaseValue: null,
  //               optionsList: [
  //                 {
  //                   id: "josskvd11i",
  //                   priceIncrease: "1.25",
  //                   label: "Pepperoni",
  //                 },
  //                 { label: "Bacon", id: "pg25y7qvad", priceIncrease: "1.25" },
  //                 { id: "uykirza19l", priceIncrease: "1.25", label: "Ham" },
  //                 {
  //                   label: "Italian Sausage",
  //                   priceIncrease: "1.25",
  //                   id: "o4n6mj9y9m",
  //                 },
  //                 { label: "Salami", id: "0y9owsguu0", priceIncrease: "1.25" },
  //                 {
  //                   id: "f0asvrcdl1",
  //                   priceIncrease: "1.25",
  //                   label: "Ground Beef",
  //                 },
  //                 { priceIncrease: "1.25", label: "Chicken", id: "mndfeqt6fw" },
  //                 {
  //                   id: "ub733ksfob",
  //                   priceIncrease: "1.25",
  //                   label: "Anchovies",
  //                 },
  //                 {
  //                   label: "Bacon Strips",
  //                   priceIncrease: "1.25",
  //                   id: "xkltm73ojc",
  //                 },
  //                 { id: "19kx5t9hf9", priceIncrease: "1.25", label: "Tomato" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "44cao1u9eu",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   id: "nrvhourb3a",
  //                   label: "Green Olives",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "5z742pmbqu",
  //                   label: "Mushrooms",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "5klhz066sk",
  //                   label: "Green Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "01bfvwjtq2",
  //                   label: "Black Olives",
  //                 },
  //                 { priceIncrease: "1.25", id: "7j12cm4vz9", label: "Onion" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "lx58vd4p0l",
  //                   label: "Pineapple",
  //                 },
  //                 {
  //                   label: "Hot Peppers",
  //                   id: "e8byulu78o",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   id: "6z5jrj21d3",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "1.25",
  //                   id: "1slz9zantt",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "d80nehz3bm",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", priceIncrease: "1.25", id: "w0f57ap41h" },
  //                 {
  //                   priceIncrease: "1.25",
  //                   label: "Red Peppers",
  //                   id: "00xmawh50v",
  //                 },
  //                 {
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "1.25",
  //                   id: "wodaczf3f1",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.25",
  //                   id: "opo5eumc6r",
  //                 },
  //                 {
  //                   label: "Fresh Basil",
  //                   id: "763dkedtg5",
  //                   priceIncrease: "1.25",
  //                 },
  //                 {
  //                   priceIncrease: "1.25",
  //                   id: "oycxzc56w3",
  //                   label: "Caramelized Onion",
  //                 },
  //                 {
  //                   id: "thd5edoue1",
  //                   priceIncrease: "1.25",
  //                   label: "Mozzarella",
  //                 },
  //                 { id: "7yx8wpjrqw", priceIncrease: "1.25", label: "Cheddar" },
  //                 { id: "qy9ks0gxfl", priceIncrease: "1.25", label: "Feta" },
  //                 {
  //                   label: "Parmigiano",
  //                   priceIncrease: "1.25",
  //                   id: "esfy2k7nf3",
  //                 },
  //                 {
  //                   id: "i2satwlzf5",
  //                   label: "Fior Di Latte",
  //                   priceIncrease: "1.25",
  //                 },
  //               ],
  //               viewType: "Table",
  //               selectedCaseKey: null,
  //               numOfSelectable: "",
  //               label: "Half 2 Toppings Extra Large",
  //             },
  //           ],
  //           rank: 1,
  //           description: "",
  //           index: 3,
  //           total: 10,
  //           extraDetails: "",
  //         },
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2Fy3tmsgje2?alt=media&token=f8bfa85d-2b9e-40b9-87c3-540ddff11ead",
  //       },
  //       {
  //         name: "CREAMY GARLIC DIP",
  //         price: "1.5",
  //         description: "",
  //         options: [],
  //         extraDetails: null,
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2Fa6cq093nw?alt=media&token=2f51fca8-fa16-4e84-847b-5a7ba38d2ae9",
  //       },
  //       {
  //         name: "SPRITE 2L",
  //         price: "3.5",
  //         description: "",
  //         options: [],
  //         extraDetails: null,
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F6kal3y4u7?alt=media&token=3c30976e-b810-4ee6-bad8-f62abb904c70",
  //       },
  //       {
  //         name: "CRUSH ORANGE Can",
  //         price: "1.3",
  //         description: "",
  //         options: [],
  //         extraDetails: null,
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F9sd7f8zkn?alt=media&token=88d3e06a-b253-47ed-a10e-56d4e6b69e17",
  //       },
  //       {
  //         name: "4 CAN POP COMBO",
  //         price: 4.25,
  //         description: "",
  //         options: ["4 Pop:\n1 X Pepsi\n2 X Diet Pepsi\n1 X Coke"],
  //         extraDetails: "",
  //         editableObj: {
  //           price: "4.25",
  //           name: "4 CAN POP COMBO",
  //           imageUrl:
  //             "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F8h3ikbvkh?alt=media&token=daebe48f-a0ce-4436-a9c2-81c4cd5971c9",
  //           hasImage: true,
  //           options: [
  //             {
  //               numOfSelectable: "4",
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   id: "xc1eezcttw",
  //                   label: "Pepsi",
  //                   selectedTimes: 1,
  //                 },
  //                 {
  //                   priceIncrease: null,
  //                   label: "Diet Pepsi",
  //                   id: "8v0xizjs48",
  //                   selectedTimes: 2,
  //                 },
  //                 {
  //                   priceIncrease: null,
  //                   label: "Coke",
  //                   id: "wmj00qrg4r",
  //                   selectedTimes: 1,
  //                 },
  //                 { priceIncrease: null, label: "Diet Coke", id: "onst981h27" },
  //                 { priceIncrease: null, label: "Ice Tea", id: "g2zwt1l8ff" },
  //                 { id: "02hzudest0", label: "Root Beer", priceIncrease: null },
  //                 {
  //                   priceIncrease: null,
  //                   id: "wppovyzmg4",
  //                   label: "Canada Dry",
  //                 },
  //                 {
  //                   label: "Mountain Dew",
  //                   priceIncrease: null,
  //                   id: "pkqqsh4zhj",
  //                 },
  //                 {
  //                   label: "Crush Orange",
  //                   id: "ixd0l7htq9",
  //                   priceIncrease: null,
  //                 },
  //                 { priceIncrease: null, id: "cwh5sudaz0", label: "Dr Pepper" },
  //                 {
  //                   id: "al41m1ea7v",
  //                   priceIncrease: null,
  //                   label: "Cherry Coke",
  //                 },
  //               ],
  //               selectedCaseKey: null,
  //               id: "pjwk8sqtt",
  //               selectedCaseValue: null,
  //               label: "4 Pop",
  //               optionType: "Quantity Dropdown",
  //             },
  //           ],
  //           description: "",
  //           category: "Drinks",
  //           id: "8h3ikbvkh",
  //           index: 32,
  //           total: 4.25,
  //           extraDetails: "",
  //         },
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F8h3ikbvkh?alt=media&token=daebe48f-a0ce-4436-a9c2-81c4cd5971c9",
  //       },
  //       {
  //         name: "Deluxe",
  //         price: 13.1,
  //         description:
  //           "Tomato Sauce, Mozzarella Cheese, Pepperoni, Mushroom, Green Pepper, Italian Sausage, Bacon",
  //         options: [
  //           "Size: Sm",
  //           "Base Sauce Small: Tomato Sauce",
  //           "Extra Toppings Small:\n1 X Pepperoni",
  //         ],
  //         extraDetails: "",
  //         editableObj: {
  //           category: "Specialty",
  //           price: "11.99",
  //           imageUrl:
  //             "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F1wxr6r0cl?alt=media&token=d0553d29-7e18-4284-bcde-905ff91c20e6",
  //           id: "1wxr6r0cl",
  //           options: [
  //             {
  //               id: "evprm3i4e",
  //               label: "Size",
  //               selectedCaseValue: null,
  //               numOfSelectable: null,
  //               optionType: "Dropdown",
  //               isRequired: true,
  //               optionsList: [
  //                 {
  //                   id: "rzaj2u15jb",
  //                   label: "Sm",
  //                   priceIncrease: null,
  //                   selected: true,
  //                 },
  //                 { id: "d4v8ygumiv", priceIncrease: "3", label: "Md" },
  //                 { priceIncrease: "5", label: "Lg", id: "sp9i91dvfu" },
  //                 { id: "5pc4z6jwcb", priceIncrease: "9", label: "X-Lg" },
  //               ],
  //               selectedCaseKey: null,
  //             },
  //             {
  //               label: "Base Sauce Small",
  //               id: "6clc4a9pr",
  //               selectedCaseKey: null,
  //               selectedCaseValue: null,
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   label: "Tomato Sauce",
  //                   id: "8yndqcf0y0",
  //                   selected: true,
  //                 },
  //                 {
  //                   id: "6oimc9m5k1",
  //                   label: "Garlic Sauce",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "B.B.Q Sauce",
  //                   id: "7m7x6ergzd",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Pesto Sauce",
  //                   id: "5ieu0lv709",
  //                 },
  //                 {
  //                   id: "a4pt45l8o1",
  //                   label: "Alfredo Sauce",
  //                   priceIncrease: "1.11",
  //                 },
  //               ],
  //               numOfSelectable: null,
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Sm", selectedCaseKey: "Size" },
  //               ],
  //               optionType: "Dropdown",
  //             },
  //             {
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Md", selectedCaseKey: "Size" },
  //               ],
  //               selectedCaseKey: null,
  //               optionsList: [
  //                 {
  //                   id: "qew7221nmp",
  //                   label: "Tomato Sauce",
  //                   priceIncrease: null,
  //                 },
  //                 {
  //                   label: "Garlic Sauce",
  //                   id: "1rz7rqvly0",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "3e5hezqivz",
  //                   label: "B.B.Q Sauce",
  //                 },
  //                 {
  //                   id: "22raow6b5x",
  //                   label: "Pesto Sauce",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Alfredo Sauce",
  //                   id: "smbxxy6ocy",
  //                 },
  //               ],
  //               label: "Base Sauce Medium",
  //               optionType: "Dropdown",
  //               numOfSelectable: null,
  //               selectedCaseValue: null,
  //               id: "3l33uudc5",
  //             },
  //             {
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Lg" },
  //               ],
  //               label: "Base Sauce Large",
  //               optionsList: [
  //                 {
  //                   label: "Tomato Sauce",
  //                   priceIncrease: null,
  //                   id: "63bacstdws",
  //                 },
  //                 {
  //                   id: "1v70b931tv",
  //                   priceIncrease: "1.99",
  //                   label: "Garlic Sauce",
  //                 },
  //                 {
  //                   id: "23j99wx89y",
  //                   label: "B.B.Q Sauce",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   id: "4p2ugwu8wb",
  //                   priceIncrease: "1.99",
  //                   label: "Pesto Sauce",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Alfredo Sauce",
  //                   id: "bjdrrvglyz",
  //                 },
  //               ],
  //               optionType: "Dropdown",
  //               numOfSelectable: null,
  //               selectedCaseKey: null,
  //               id: "yluagw3vv",
  //               selectedCaseValue: null,
  //             },
  //             {
  //               selectedCaseList: [
  //                 { selectedCaseValue: "X-Lg", selectedCaseKey: "Size" },
  //               ],
  //               optionType: "Dropdown",
  //               optionsList: [
  //                 {
  //                   priceIncrease: null,
  //                   label: "Tomato Sauce",
  //                   id: "1ib4o7kf74",
  //                 },
  //                 {
  //                   label: "Garlic Sauce",
  //                   priceIncrease: "2.5",
  //                   id: "yyfjbtsp7m",
  //                 },
  //                 {
  //                   label: "B.B.Q Sauce",
  //                   priceIncrease: "2.5",
  //                   id: "svl2236bpk",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Pesto Sauce",
  //                   id: "ydoxrv4qgt",
  //                 },
  //                 {
  //                   label: "Alfredo Sauce",
  //                   id: "x7ac99kb0h",
  //                   priceIncrease: "2.5",
  //                 },
  //               ],
  //               selectedCaseValue: null,
  //               numOfSelectable: null,
  //               label: "Base Sauce Extra Large",
  //               selectedCaseKey: null,
  //               id: "icnsczb6j",
  //             },
  //             {
  //               selectedCaseKey: null,
  //               label: "Extra Toppings Small",
  //               selectedCaseValue: null,
  //               numOfSelectable: "",
  //               optionType: "Table View",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Sm", selectedCaseKey: "Size" },
  //               ],
  //               optionsList: [
  //                 {
  //                   id: "jm58ro75f3",
  //                   label: "Pepperoni",
  //                   priceIncrease: "1.11",
  //                   selectedTimes: 1,
  //                 },
  //                 { label: "Bacon", id: "zgxhpdlzpk", priceIncrease: "1.11" },
  //                 { label: "Ham", id: "r4g44m699r", priceIncrease: "1.11" },
  //                 {
  //                   label: "Italian Sausage",
  //                   priceIncrease: "1.11",
  //                   id: "fp1nymruow",
  //                 },
  //                 { id: "vt8zch104o", label: "Salami", priceIncrease: "1.11" },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Ground Beef",
  //                   id: "5woonypky3",
  //                 },
  //                 { id: "yeg6nflh2v", priceIncrease: "1.11", label: "Chicken" },
  //                 {
  //                   label: "Anchovies",
  //                   priceIncrease: "1.11",
  //                   id: "lf7hwt3soa",
  //                 },
  //                 {
  //                   id: "ktivt7awqs",
  //                   priceIncrease: "1.11",
  //                   label: "Bacon Strips",
  //                 },
  //                 { priceIncrease: "1.11", label: "Tomato", id: "z73zgx66cf" },
  //                 {
  //                   label: "Red Onion",
  //                   id: "y7x6drz9ah",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   label: "Green Olives",
  //                   priceIncrease: "1.11",
  //                   id: "r9wz2hjqxf",
  //                 },
  //                 {
  //                   id: "w343lb6vc6",
  //                   label: "Mushrooms",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Green Peppers",
  //                   id: "17aktpvd1f",
  //                 },
  //                 {
  //                   label: "Black Olives",
  //                   priceIncrease: "1.11",
  //                   id: "kd67zfr7ka",
  //                 },
  //                 { label: "Onion", id: "mur7o589hk", priceIncrease: "1.11" },
  //                 {
  //                   priceIncrease: "1.11",
  //                   id: "8cr343a5v1",
  //                   label: "Pineapple",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   label: "Hot Peppers",
  //                   id: "g2ybzt2g5g",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   id: "dayjtezmjs",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "mb9clf949c",
  //                   priceIncrease: "1.11",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   id: "9kusotmxq8",
  //                   priceIncrease: "1.11",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", id: "tj6ge905oy", priceIncrease: "1.11" },
  //                 {
  //                   id: "d22mmfwtso",
  //                   label: "Red Peppers",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "ftcvhbq562",
  //                   label: "Grilled Zucchini",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "pl4i5iszgx",
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   priceIncrease: "1.11",
  //                   id: "hwp9v220n7",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   label: "Caramelized Onion",
  //                   id: "ld18wj1tgn",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   id: "ux71hxqrk7",
  //                   priceIncrease: "1.11",
  //                   label: "Mozzarella",
  //                 },
  //                 { id: "kvl1z4gvxo", label: "Cheddar", priceIncrease: "1.11" },
  //                 { label: "Feta", id: "2zmimerxqf", priceIncrease: "1.11" },
  //                 {
  //                   id: "9q2zxb8sjo",
  //                   label: "Parmigiano",
  //                   priceIncrease: "1.11",
  //                 },
  //                 {
  //                   label: "Fior Di Latte",
  //                   priceIncrease: "1.11",
  //                   id: "nz8b8czxmw",
  //                 },
  //               ],
  //               id: "8nd7jmt4t",
  //               viewType: "Table",
  //             },
  //             {
  //               selectedCaseValue: null,
  //               selectedCaseList: [
  //                 { selectedCaseKey: "Size", selectedCaseValue: "Md" },
  //               ],
  //               numOfSelectable: "",
  //               label: "Extra Toppings Medium",
  //               id: "ubc2sxmxu",
  //               optionsList: [
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Pepperoni",
  //                   id: "0x929c0mn5",
  //                 },
  //                 { label: "Bacon", id: "gskpxhoh55", priceIncrease: "1.58" },
  //                 { id: "9766x8132z", label: "Ham", priceIncrease: "1.58" },
  //                 {
  //                   label: "Italian Sausage",
  //                   priceIncrease: "1.58",
  //                   id: "pofcuqgi2a",
  //                 },
  //                 { label: "Salami", id: "hpj0anedbl", priceIncrease: "1.58" },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "3kzbr0itkk",
  //                   label: "Ground Beef",
  //                 },
  //                 { id: "bhln87tfdp", label: "Chicken", priceIncrease: "1.58" },
  //                 {
  //                   id: "oow5f3n9r3",
  //                   priceIncrease: "1.58",
  //                   label: "Anchovies",
  //                 },
  //                 {
  //                   id: "lk26hmzauq",
  //                   priceIncrease: "1.58",
  //                   label: "Bacon Strips",
  //                 },
  //                 { priceIncrease: "1.58", id: "yql2ka49xv", label: "Tomato" },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "dgggr0e29f",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   id: "i3x5rpbqow",
  //                   label: "Green Olives",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   id: "vcto9vvrnw",
  //                   label: "Mushrooms",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   id: "nd5fks9qdx",
  //                   priceIncrease: "1.58",
  //                   label: "Green Peppers",
  //                 },
  //                 {
  //                   id: "jbym33m6ul",
  //                   label: "Black Olives",
  //                   priceIncrease: "1.58",
  //                 },
  //                 { id: "2opvg0m9s5", label: "Onion", priceIncrease: "1.58" },
  //                 {
  //                   label: "Pineapple",
  //                   id: "uq8onn2637",
  //                   priceIncrease: "1.58",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Hot Peppers",
  //                   id: "vlg8f8idjv",
  //                 },
  //                 {
  //                   id: "7vvklwo0cn",
  //                   priceIncrease: "1.58",
  //                   label: "Artichoke Hearts",
  //                 },
  //                 {
  //                   id: "fj5a4rkmgb",
  //                   priceIncrease: "1.58",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Fresh Garlic",
  //                   id: "fdvwh5b7zk",
  //                 },
  //                 { label: "Spinach", id: "8f4eleocad", priceIncrease: "1.58" },
  //                 {
  //                   id: "f2d2bznjn2",
  //                   priceIncrease: "1.58",
  //                   label: "Red Peppers",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Grilled Zucchini",
  //                   id: "2mocrt50tk",
  //                 },
  //                 {
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.58",
  //                   id: "72dzswrcg8",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   label: "Fresh Basil",
  //                   id: "x17szr9ru4",
  //                 },
  //                 {
  //                   priceIncrease: "1.58",
  //                   id: "rw5yalt1lw",
  //                   label: "Caramelized Onion",
  //                 },
  //                 {
  //                   id: "hsc7findbc",
  //                   priceIncrease: "1.58",
  //                   label: "Mozzarella",
  //                 },
  //                 { label: "Cheddar", id: "c8xwxpputp", priceIncrease: "1.58" },
  //                 { priceIncrease: "1.58", id: "844eehw4gw", label: "Feta" },
  //                 {
  //                   label: "Parmigiano",
  //                   priceIncrease: "1.58",
  //                   id: "s3e0m14fhx",
  //                 },
  //                 {
  //                   label: "Fior Di Latte",
  //                   id: "qbr6oxhrbb",
  //                   priceIncrease: "1.58",
  //                 },
  //               ],
  //               optionType: "Table View",
  //               viewType: "Table",
  //               selectedCaseKey: null,
  //             },
  //             {
  //               optionsList: [
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "87m4mczyg0",
  //                   label: "Pepperoni",
  //                 },
  //                 { id: "sb25ygwigq", priceIncrease: "1.99", label: "Bacon" },
  //                 { label: "Ham", id: "cc2wnaygi9", priceIncrease: "1.99" },
  //                 {
  //                   id: "z8yxl94pa7",
  //                   priceIncrease: "1.99",
  //                   label: "Italian Sausage",
  //                 },
  //                 { priceIncrease: "1.99", label: "Salami", id: "x9eewnrb8t" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Ground Beef",
  //                   id: "72aecjov56",
  //                 },
  //                 { id: "wntdwxmuye", label: "Chicken", priceIncrease: "1.99" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Anchovies",
  //                   id: "2m9t2gpdwe",
  //                 },
  //                 {
  //                   id: "173y2b4l21",
  //                   priceIncrease: "1.99",
  //                   label: "Bacon Strips",
  //                 },
  //                 { label: "Tomato", id: "9oezg2yyd0", priceIncrease: "1.99" },
  //                 {
  //                   id: "30elbi2omn",
  //                   priceIncrease: "1.99",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "qahgv45kib",
  //                   label: "Green Olives",
  //                 },
  //                 {
  //                   label: "Mushrooms",
  //                   id: "rmfrhcnptb",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   id: "lryp0874ek",
  //                   label: "Green Peppers",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "l1c8eqkz8m",
  //                   label: "Black Olives",
  //                 },
  //                 { id: "t0pafh8itz", label: "Onion", priceIncrease: "1.99" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Pineapple",
  //                   id: "ysndpt4tlk",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Hot Peppers",
  //                   id: "0tjgzbyl5n",
  //                 },
  //                 {
  //                   id: "9mcxv3ebjc",
  //                   priceIncrease: "1.99",
  //                   label: "Artichoke Hearts",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "vzf4n1ch3q",
  //                   label: "Jalapino Peppers",
  //                 },
  //                 {
  //                   id: "j307ac0ipi",
  //                   label: "Fresh Garlic",
  //                   priceIncrease: "1.99",
  //                 },
  //                 { label: "Spinach", id: "bf0d3xpetq", priceIncrease: "1.99" },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Red Peppers",
  //                   id: "2b3ogu316r",
  //                 },
  //                 {
  //                   label: "Grilled Zucchini",
  //                   id: "x1whbg6jqn",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   id: "8fyl1lpmy5",
  //                   label: "Fried Eggplant",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   id: "gyxehniz1s",
  //                   label: "Fresh Basil",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   label: "Caramelized Onion",
  //                   id: "mzyxzg9lbz",
  //                 },
  //                 {
  //                   id: "5uy0sbugzf",
  //                   label: "Mozzarella",
  //                   priceIncrease: "1.99",
  //                 },
  //                 { id: "3ac9u7vp60", label: "Cheddar", priceIncrease: "1.99" },
  //                 { label: "Feta", id: "rnh9qi5l7i", priceIncrease: "1.99" },
  //                 {
  //                   id: "rkx0qdyrn5",
  //                   label: "Parmigiano",
  //                   priceIncrease: "1.99",
  //                 },
  //                 {
  //                   priceIncrease: "1.99",
  //                   id: "mxtsuw6ztj",
  //                   label: "Fior Di Latte",
  //                 },
  //               ],
  //               selectedCaseValue: null,
  //               viewType: "Table",
  //               selectedCaseList: [
  //                 { selectedCaseValue: "Lg", selectedCaseKey: "Size" },
  //               ],
  //               label: "Extra Toppings Large",
  //               optionType: "Table View",
  //               selectedCaseKey: null,
  //               id: "egp9cfnqd",
  //               numOfSelectable: "",
  //             },
  //             {
  //               selectedCaseKey: null,
  //               viewType: "Table",
  //               optionType: "Table View",
  //               id: "cqbr1xo1t",
  //               selectedCaseValue: null,
  //               numOfSelectable: "",
  //               optionsList: [
  //                 {
  //                   label: "Pepperoni",
  //                   id: "vilxhhp5vw",
  //                   priceIncrease: "2.5",
  //                 },
  //                 { id: "tcwno9xok9", priceIncrease: "2.5", label: "Bacon" },
  //                 { priceIncrease: "2.5", id: "aj5vxkxtq5", label: "Ham" },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Italian Sausage",
  //                   id: "qqdy2ia6xt",
  //                 },
  //                 { id: "g15nsgkkno", label: "Salami", priceIncrease: "2.5" },
  //                 {
  //                   label: "Ground Beef",
  //                   priceIncrease: "2.5",
  //                   id: "yv99rqbmxk",
  //                 },
  //                 { label: "Chicken", id: "pbfat2dq2h", priceIncrease: "2.5" },
  //                 {
  //                   label: "Anchovies",
  //                   id: "1nrwjx0tv8",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   label: "Bacon Strips",
  //                   priceIncrease: "2.5",
  //                   id: "k2gr3mmdzn",
  //                 },
  //                 { priceIncrease: "2.5", id: "win5apgjz4", label: "Tomato" },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "alkgqj05oo",
  //                   label: "Red Onion",
  //                 },
  //                 {
  //                   id: "qgd96078qf",
  //                   label: "Green Olives",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   label: "Mushrooms",
  //                   id: "aosbrvu2gn",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "5vqw5xsfb7",
  //                   label: "Green Peppers",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "jt27mnqmem",
  //                   label: "Black Olives",
  //                   priceIncrease: "2.5",
  //                 },
  //                 { priceIncrease: "2.5", id: "0aftaz72uk", label: "Onion" },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Pineapple",
  //                   id: "gztseul2ou",
  //                 },
  //                 {
  //                   id: "lcfcw2htzo",
  //                   label: "Hot Peppers",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   label: "Artichoke Hearts",
  //                   id: "a6vl52e3sf",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "ek3qntmiyq",
  //                   label: "Jalapino Peppers",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "rt5j2miss6",
  //                   label: "Fresh Garlic",
  //                 },
  //                 { label: "Spinach", priceIncrease: "2.5", id: "houbxj8h7b" },
  //                 {
  //                   label: "Red Peppers",
  //                   priceIncrease: "2.5",
  //                   id: "gcll2s8qfa",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   label: "Grilled Zucchini",
  //                   id: "v41ga4ua63",
  //                 },
  //                 {
  //                   priceIncrease: "2.5",
  //                   id: "go2rnz0fxh",
  //                   label: "Fried Eggplant",
  //                 },
  //                 {
  //                   id: "lbeeyetbhi",
  //                   priceIncrease: "2.5",
  //                   label: "Fresh Basil",
  //                 },
  //                 {
  //                   label: "Caramelized Onion",
  //                   id: "97hk48cigi",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "ixdtpsocwm",
  //                   priceIncrease: "2.5",
  //                   label: "Mozzarella",
  //                 },
  //                 { id: "tug1dpjehy", priceIncrease: "2.5", label: "Cheddar" },
  //                 { id: "ohc3zhilv1", label: "Feta", priceIncrease: "2.5" },
  //                 {
  //                   id: "pgs16r07yq",
  //                   label: "Parmigiano",
  //                   priceIncrease: "2.5",
  //                 },
  //                 {
  //                   id: "mg8ayunuox",
  //                   label: "Fior Di Latte",
  //                   priceIncrease: "2.5",
  //                 },
  //               ],
  //               selectedCaseList: [
  //                 { selectedCaseValue: "X-Lg", selectedCaseKey: "Size" },
  //               ],
  //               label: "Extra Toppings Extra Large",
  //             },
  //             {
  //               label: "Crust Option",
  //               optionsList: [
  //                 {
  //                   id: "unw8et1t70",
  //                   priceIncrease: null,
  //                   label: "Thin Crust",
  //                 },
  //                 {
  //                   id: "vqtddqw12q",
  //                   priceIncrease: "1",
  //                   label: "Thick Crust",
  //                 },
  //                 {
  //                   id: "1qvtnbcv6w",
  //                   priceIncrease: null,
  //                   label: "Light On Cheese",
  //                 },
  //                 { priceIncrease: null, id: "458m9fwwxg", label: "No Cheese" },
  //                 { priceIncrease: null, label: "Well Done", id: "lmalrgwtae" },
  //                 {
  //                   label: "Light On Sauce",
  //                   priceIncrease: null,
  //                   id: "bdwl11eq6a",
  //                 },
  //                 { label: "No Sauce", priceIncrease: null, id: "ztr6wpxhbm" },
  //                 {
  //                   priceIncrease: null,
  //                   id: "br13qkrqbh",
  //                   label: "Extra Sauce",
  //                 },
  //               ],
  //               id: "87wq2vjnm",
  //               selectedCaseValue: null,
  //               selectedCaseKey: null,
  //               optionType: "Quantity Dropdown",
  //               numOfSelectable: null,
  //             },
  //           ],
  //           hasImage: true,
  //           description:
  //             "Tomato Sauce, Mozzarella Cheese, Pepperoni, Mushroom, Green Pepper, Italian Sausage, Bacon",
  //           name: "Deluxe",
  //           index: 21,
  //           total: 13.1,
  //           extraDetails: "",
  //         },
  //         imageUrl:
  //           "https://firebasestorage.googleapis.com/v0/b/posmate-5fc0a.appspot.com/o/J6rAf2opwnSKAhefbOZW6HJdx1h2%2Fimages%2F1wxr6r0cl?alt=media&token=d0553d29-7e18-4284-bcde-905ff91c20e6",
  //       },
  //     ],
  //     customer: { name: "dassad", phone: "adsdas", email: "", address: null },
  //   };

  //   const response = await fetch(
  //     "http://localhost:5051/posmate-5fc0a/us-central1/processPayment",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         token: null,
  //         amount: null,
  //         currency: null,
  //         storeUID: null,
  //         orderDetails: orderDetails,
  //         storeDetails: storeDetails,
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     const contentType = response.headers.get("content-type");
  //     if (contentType && contentType.indexOf("application/json") !== -1) {
  //       const responseData = await response.json();
  //       if (responseData.success) {
  //         console.log("Payment processed successfully!");
  //       } else {
  //         console.error(
  //           "Payment processing failed. Server message:",
  //           responseData.message
  //         );
  //         alert("Payment processing failed.");
  //       }
  //     } else {
  //       console.error("Non-JSON response received:", await response.text());
  //       alert("Non-JSON response received.");
  //     }
  //   } else {
  //     console.error("Server responded with error:", response.status);
  //     alert("Server responded with error.");
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={Test} style={{backgroundColor: 'red'}}>
        <Text style={{color: 'white'}}>Process Payment</Text>
        </Pressable> */}
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingRight: 30 }}
      >
        <View style={styles.wrap}>
          <TotalRevenueBox
            style={width < 1300 && { width: "100%" }}
            allTransactions={transListTableOrg}
          />
          {width > 1300 && (
            <MostOrderedItemsBox
              style={null}
              allTransactions={transListTableOrg}
            />
          )}
          <View style={{ justifyContent: "space-between" }}>
            <OrderWaitTimeBox allTransactions={transListTableOrg} />
            {width > 1300 && <CustomersBox customers={customers} />}
            {width < 1300 && (
              <MostOrderedItemsBox
                style={{ height: 300 }}
                allTransactions={transListTableOrg}
              />
            )}
          </View>
          {width < 1300 ? (
            <View style={{ justifyContent: "space-between" }}>
              <PickupOrdersBox allTransactions={transListTableOrg} />
              <DeliveryOrdersBox allTransactions={transListTableOrg} />
              <InStoreOrdersBox allTransactions={transListTableOrg} />
            </View>
          ) : (
            <>
              <PickupOrdersBox allTransactions={transListTableOrg} />
              <DeliveryOrdersBox allTransactions={transListTableOrg} />
              <InStoreOrdersBox allTransactions={transListTableOrg} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
});

export default Dashboard;
