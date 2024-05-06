import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import InvoiceItem from "./components/InvoiceItem";
import { myDeviceDetailsState, storeDetailState } from "state/state";
import { Excel as ExcelDownload } from "antd-table-saveas-excel";
import { auth, db } from "state/firebaseConfig";
import ReceiptPrint from "components/functional/ReceiptPrint";
import { useAlert } from "react-alert";
import qz from "qz-tray";
import { TransListStateItem } from "types/global";
import Loader from "components/Loader";
import ComponentLoader from "components/ComponentLoader";

const pageSize = 100; // Number of documents to fetch per page
let lastVisibleDoc: null | object = null; // Track the last visible document to fetch the next page

function InvoiceReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [filteredTransList, setFilteredTransList] = useState<
    TransListStateItem[]
  >([]);
  const [invoices, setInvoices] = useState<TransListStateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setfirstLoad] = useState(false);
  const storeDetails = storeDetailState.use();
  const [baseSelectedRows, setbaseSelectedRows] = useState<string[]>([]);
  const [updateBaseSelectedRows, setupdateBaseSelectedRows] = useState(false);
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "System Type",
      dataIndex: "system",
      key: "system",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  useEffect(() => {
    if (updateBaseSelectedRows === true) {
      if (baseSelectedRows.length >= 1) {
        let data: string[] = [];
        baseSelectedRows.forEach((idx) => {
          //find index of item in transList that matches id of selected row
          let orderIndex;
          let element;
          if (filteredTransList.length > 0) {
            orderIndex = filteredTransList.findIndex((item) => item.id === idx);
            element = filteredTransList[orderIndex];
          } else {
            orderIndex = invoices.findIndex((item) => item.id === idx);
            element = invoices[orderIndex];
          }

          const formatedData = ReceiptPrint(element, storeDetails, true);
          data = data.concat(formatedData.data);
        });
        if (
          myDeviceDetails.sendPrintToUserID &&
          myDeviceDetails.useDifferentDeviceToPrint
        ) {
          console.log("Sending print to different user");
          db.collection("users")
            .doc(auth.currentUser?.uid)
            .collection("devices")
            .doc(myDeviceDetails.sendPrintToUserID.value)
            .collection("printRequests")
            .add({
              printData: data,
            });
        } else {
          qz.websocket
            .connect()
            .then(() => {
              if (!myDeviceDetails.printToPrinter) {
                alertP.error("You must specify a printer in device settings");
                return;
              }
              const config = qz.configs.create(myDeviceDetails.printToPrinter);
              return qz.print(config, data);
            })
            .then(qz.websocket.disconnect)
            .catch(function (err) {
              if (
                err.message.includes(
                  "A printer must be specified before printing"
                )
              ) {
                alertP.error("You must specify a printer in device settings");
              } else if (
                err.message.includes("Unable to establish connection with QZ")
              ) {
                alertP.error(
                  "You do not have Divine POS Helper installed. Please download from general settings"
                );
              } else if (
                err.message.includes("Cannot find printer with name")
              ) {
                alertP.error(
                  "Printer not found. Please check your printer settings."
                );
              } else {
                alertP.error(
                  "An error occured while trying to print. Try refreshing the page and trying again."
                );
              }
            });
        }
      } else {
        alertP.error(
          "Higlight one or multiple receipt then click to print them"
        );
      }
      setupdateBaseSelectedRows(false);
      setbaseSelectedRows([]);
    }
  }, [baseSelectedRows, updateBaseSelectedRows]);

  const SearchDate = () => {
    if (!startDate || !endDate) {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const filteredInvoices: TransListStateItem[] = [];

          querySnapshot.forEach((doc) => {
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
            const organziedData = {
              ...docData,
              id: docData.transNum.toUpperCase(),
              name: docData.customer?.name ? docData.customer?.name : "N/A",
              date: docData.date,
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
            };

            if (CheckCase(organziedData)) {
              filteredInvoices.push(organziedData);
            }
          });

          // Update the state with the filtered list
          setFilteredTransList(filteredInvoices);
        });
    } else {
      const startDateConverted = new Date(startDate);
      startDateConverted.setHours(0, 0, 0, 0); // Set to start of the day
      startDateConverted.setDate(startDateConverted.getDate() + 1); // Add a day to the start date
      const endDateConverted = new Date(endDate);
      endDateConverted.setDate(endDateConverted.getDate() + 1); // Add a day to the end date
      endDateConverted.setHours(23, 59, 59, 999); // Set to end of the day

      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .where("date", ">=", startDateConverted)
        .where("date", "<=", endDateConverted)
        .get()
        .then((querySnapshot) => {
          const filteredInvoices: TransListStateItem[] = [];

          querySnapshot.forEach((doc) => {
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

            filteredInvoices.push({
              ...docData,
              id: docData.transNum.toUpperCase(),
              name: docData.customer?.name ? docData.customer?.name : "N/A",
              date: docData.date,
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
            });
          });

          // Update the state with the filtered list
          setFilteredTransList(filteredInvoices.filter((e) => CheckCase(e)));
        });
    }
  };

  //Printing function
  const DownloadExcel = () => {
    const invoicesToDownload: TransListStateItem[] = [];

    baseSelectedRows.forEach((idx) => {
      let orderIndex;
      let element;
      if (filteredTransList.length > 0) {
        orderIndex = filteredTransList.findIndex((item) => item.id === idx);
        element = filteredTransList[orderIndex];
      } else {
        orderIndex = invoices.findIndex((item) => item.id === idx);
        element = invoices[orderIndex];
      }
      invoicesToDownload.push(element);
    });

    const excelDownload = new ExcelDownload();
    excelDownload
      .addSheet("history")
      .addColumns(columns)
      .addDataSource(invoicesToDownload, {
        str2Percent: true,
      })
      .saveAs("StoreReceipts.xlsx");
  };

  const PrintTotals = (date: Date, dateName: string) => {
    const todayStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
    const todayEnd = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    );

    // Fetch invoices from Firebase and filter them by date range
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("transList")
      .where("date", ">=", todayStart)
      .where("date", "<=", todayEnd)
      .get()
      .then((querySnapshot) => {
        const filteredInvoices: TransListStateItem[] = [];

        querySnapshot.forEach((doc) => {
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

          filteredInvoices.push({
            ...docData,
            id: docData.transNum.toUpperCase(),
            name: docData.customer?.name ? docData.customer?.name : "N/A",
            date: docData.date,
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
          });
        });

        if (filteredInvoices.length === 0) {
          alertP.error(`No sales ${dateName}`);
          return;
        }

        let totalRevenue = 0;
        const totalSales = filteredInvoices.length;

        filteredInvoices.forEach((item) => {
          totalRevenue += parseFloat(item.amount ?? "0");
        });

        const data = [
          "\x1B" + "\x40", // init
          "                                                                              ", // line break
          "\x0A",
          "\x1B" + "\x61" + "\x31", // center align
          storeDetails.name,
          "\x0A",
          storeDetails.address?.label + "\x0A",
          storeDetails.website + "\x0A", // text and line break
          storeDetails.phoneNumber + "\x0A", // text and line break
          date.toDateString() + "\x0A",
          "\x0A",
          `${dateName}s Report` + "\x0A", // text and line break
          "\x0A",
          "\x0A",
          "\x0A",
          "\x1B" + "\x61" + "\x30", // left align
          `${dateName}s Total Revenue: $${totalRevenue.toFixed(2)}`,
          "\x0A",
          `${dateName}s Total Sales: ${totalSales}`,
          "\x0A",
          "\x0A",
          "\x0A",
          "------------------------------------------" + "\x0A",
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x0A", // line break
          "\x1D" + "\x56" + "\x00",
        ];

        if (
          myDeviceDetails.sendPrintToUserID &&
          myDeviceDetails.useDifferentDeviceToPrint
        ) {
          console.log("Sending print to different user");
          db.collection("users")
            .doc(auth.currentUser?.uid)
            .collection("devices")
            .doc(myDeviceDetails.sendPrintToUserID.value)
            .collection("printRequests")
            .add({
              printData: data,
            });
        } else {
          qz.websocket
            .connect()
            .then(function () {
              if (!myDeviceDetails.printToPrinter) return;
              const config = qz.configs.create(myDeviceDetails.printToPrinter);
              return qz.print(config, data);
            })
            .then(qz.websocket.disconnect)
            .catch(function (err) {
              if (
                err.message.includes(
                  "A printer must be specified before printing"
                )
              ) {
                alertP.error("You must specify a printer in device settings");
              } else if (
                err.message.includes("Unable to establish connection with QZ")
              ) {
                alertP.error(
                  "You do not have Divine POS Helper installed. Please download from general settings"
                );
              } else if (
                err.message.includes("Cannot find printer with name")
              ) {
                alertP.error(
                  "Printer not found. Please check your printer settings."
                );
              } else {
                alertP.error(
                  "An error occured while trying to print. Try refreshing the page and trying again."
                );
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
        alertP.error("An error occurred while fetching invoices.");
      });
  };

  const CheckCase = (item: TransListStateItem) => {
    if (search.length > 0) {
      if (item.customer?.address) {
        return item.customer.address.label
          ?.toLowerCase()
          .replace(/\s/g, "")
          .includes(search?.toLowerCase().replace(/\s/g, ""));
      }
      return (
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  };

  const fetchNextPage = () => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true);

    let query = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("transList")
      .orderBy("date", "desc") // Sort by date in descending order
      .limit(pageSize);

    if (lastVisibleDoc) {
      query = query.startAfter(lastVisibleDoc);
    }

    query
      .get()
      .then((querySnapshot) => {
        const newInvoices: TransListStateItem[] = [];

        querySnapshot.forEach((doc) => {
          // Update last visible document
          lastVisibleDoc = doc;
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

          newInvoices.push({
            ...docData,
            id: docData.transNum.toUpperCase(),
            name: docData.customer?.name ? docData.customer?.name : "N/A",
            date: docData.date,
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
          });
        });

        // Update invoices state with new invoices
        setInvoices((prevInvoices) => [...prevInvoices, ...newInvoices]);

        setLoading(false);
        if (!firstLoad) {
          setfirstLoad(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
        setLoading(false);
        if (!firstLoad) {
          setfirstLoad(true);
        }
      });
  };

  useEffect(() => {
    // Initial fetch of the first page
    fetchNextPage();

    // Clean up function
    return () => {
      // Reset variables if the component unmounts
      lastVisibleDoc = null;
    };
  }, []); // Only run this effect once on component mount

  // Function to handle reaching the end of the list
  const handleEndReached = () => {
    fetchNextPage(); // Fetch the next page when the end of the list is reached
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "95%", marginTop: 20, marginBottom: 20 }}>
        <Text style={styles.invoiceReportLbl}>Invoices Report</Text>
      </View>
      <View style={styles.topRow}>
        <View style={styles.centerGroup}>
          <TextInput
            style={styles.searchInvoiceInput}
            placeholder="Enter search filter"
            value={search}
            onChangeText={(val) => setSearch(val)}
          />
          <View style={styles.dateSelectorGroup}>
            <View>
              <Text>From</Text>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: 120,
                  height: 34,
                }}
              />
            </View>
            <View>
              <Text>To</Text>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  width: 120,
                  height: 34,
                }}
                min={startDate} // Ensures that the end date is not before the start date
              />
            </View>
          </View>
          <View style={styles.clearAndSearchBtnGroup}>
            <Pressable
              style={[
                styles.resetFilterBtn,
                filteredTransList.length > 0
                  ? { opacity: 1 }
                  : { opacity: 0.5 },
              ]}
              onPress={() => {
                setStartDate("");
                setEndDate("");
                setSearch("");
                setFilteredTransList([]);
              }}
              disabled={filteredTransList.length === 0}
            >
              <Ionicons name="close" style={styles.clearIcon} />
            </Pressable>
            <Pressable onPress={SearchDate} style={styles.searchFilterBtn}>
              <Ionicons name="search" style={styles.searchIcon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.downloadAndPrintBtnsGroup}>
          <Pressable
            onPress={DownloadExcel}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather name="download" style={styles.downloadIcon} />
          </Pressable>
          <Pressable
            onPress={() => {
              setupdateBaseSelectedRows(true);
            }}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather name="printer" style={styles.printIcon} />
          </Pressable>
        </View>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            PrintTotals(yesterday, "Yesterday");
          }}
        >
          <Text>Print Yesterday</Text>
        </Pressable>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            const today = new Date();
            PrintTotals(today, "Today");
          }}
        >
          <Text>Print Today</Text>
        </Pressable>
      </View>
      <View style={styles.bottomGroup}>
        <View style={styles.invoiceReportHeader}>
          <View style={styles.checkboxCont}>
            <Pressable
              style={styles.checkbox}
              onPress={() => {
                if (
                  (filteredTransList.length === baseSelectedRows.length ||
                    invoices.length === baseSelectedRows.length) &&
                  baseSelectedRows.length > 0
                ) {
                  setbaseSelectedRows([]);
                } else {
                  const newSelectedRows: string[] = [];
                  if (filteredTransList.length > 0) {
                    filteredTransList.forEach((item) => {
                      newSelectedRows.push(item.id);
                    });
                    setbaseSelectedRows(newSelectedRows);
                  } else {
                    invoices.forEach((item) => {
                      newSelectedRows.push(item.id);
                    });
                    setbaseSelectedRows(newSelectedRows);
                  }
                }
              }}
            >
              {(filteredTransList.length === baseSelectedRows.length ||
                invoices.length === baseSelectedRows.length) &&
                baseSelectedRows.length > 0 &&
                "X"}
            </Pressable>
          </View>
          <View style={styles.orderIdCont}>
            <Text style={styles.orderId}>Order ID</Text>
          </View>
          <View style={styles.customerNameCont}>
            <Text style={styles.customerName}>Customer Name</Text>
          </View>
          <View style={styles.dateCont}>
            <Text style={styles.date}>Date</Text>
          </View>
          <View style={styles.totalCont}>
            <Text style={styles.total}>Total</Text>
          </View>
          <View style={styles.systemTypeCont}>
            <Text style={styles.systemType}>System Type</Text>
          </View>
          <View style={styles.orderTypeCont}>
            <Text style={styles.orderType}>Order Type</Text>
          </View>
        </View>
        <View style={styles.scrollArea}>
          {filteredTransList.length > 0 ? (
            <FlatList 
              data={filteredTransList}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              scrollEventThrottle={16}
              renderItem={({ item }) => {
                return (
                  <InvoiceItem
                    item={item}
                    setbaseSelectedRows={setbaseSelectedRows}
                    baseSelectedRows={baseSelectedRows}
                    deleteTransaction={() => {
                      console.log("Deleting transaction: ", item);
                      db.collection("users")
                        .doc(auth.currentUser?.uid)
                        .collection("transList")
                        .doc(item.docID)
                        .delete()
                        .then(() => {
                          console.log("Document successfully deleted!");
                        })
                        .catch((error) => {
                          console.error("Error removing document: ", error);
                        });

                      if (filteredTransList.length > 0) {
                        setFilteredTransList((prev) =>
                          prev.filter((e) => e.id !== item.id)
                        );
                      }
                      setInvoices((prev) =>
                        prev.filter((e) => e.id !== item.id)
                      );
                    }}
                  />
                );
              }}
            />
          ) : (
            <FlatList
              data={invoices}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              scrollEventThrottle={16}
              renderItem={({ item }) => {
                return (
                  <InvoiceItem
                    item={item}
                    setbaseSelectedRows={setbaseSelectedRows}
                    baseSelectedRows={baseSelectedRows}
                    deleteTransaction={() => {
                      console.log("Deleting transaction: ", item);
                      db.collection("users")
                        .doc(auth.currentUser?.uid)
                        .collection("transList")
                        .doc(item.docID)
                        .delete()
                        .then(() => {
                          console.log("Document successfully deleted!");
                        })
                        .catch((error) => {
                          console.error("Error removing document: ", error);
                        });

                      if (filteredTransList.length > 0) {
                        setFilteredTransList((prev) =>
                          prev.filter((e) => e.id !== item.id)
                        );
                      }
                      setInvoices((prev) =>
                        prev.filter((e) => e.id !== item.id)
                      );
                    }}
                  />
                );
              }}
              onEndReached={handleEndReached} // Call handleEndReached when reaching the end of the list
              onEndReachedThreshold={0.1} // Trigger onEndReached when the end is within 10% of the list length
            />
          )}
        </View>
      </View>
      {!firstLoad && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <ComponentLoader />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start to avoid stretching
    width: "100%",
  },
  topRow: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceReportLbl: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  centerGroup: {
    flexDirection: "row",
    width: 649,
    height: 34,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInvoiceInput: {
    width: 240,
    height: 34,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 6,
    padding: 10,
  },
  dateSelectorGroup: {
    flexDirection: "row",
    width: 245,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -20,
  },
  startDateInput: {
    width: 100,
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
  },
  endDateInput: {
    width: 100,
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
  },
  clearAndSearchBtnGroup: {
    flexDirection: "row",
    width: 89,
    height: 34,
    justifyContent: "space-between",
    alignItems: "center",
  },
  resetFilterBtn: {
    width: 34,
    height: 34,
    backgroundColor: "rgba(208,2,27,1)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  searchFilterBtn: {
    width: 34,
    height: 34,
    backgroundColor: "rgba(65,117,5,1)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  downloadAndPrintBtnsGroup: {
    flexDirection: "row",
    width: 89,
    height: 34,
    justifyContent: "space-between",
    alignItems: "center",
  },
  downloadIcon: {
    color: "rgba(74,74,74,1)",
    fontSize: 30,
  },
  printIcon: {
    color: "rgba(74,74,74,1)",
    fontSize: 30,
  },
  bottomGroup: {
    flex: 1, // Take up remaining space
    justifyContent: "flex-start",
    width: "95%",
    marginTop: 15,
  },
  invoiceReportHeader: {
    height: 40,
    backgroundColor: "#E6E6E6",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxCont: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    alignSelf: "stretch",
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  orderIdCont: {
    width: 120,
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  orderId: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  customerNameCont: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  customerName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  dateCont: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  date: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  totalCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  total: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  systemTypeCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  systemType: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  orderTypeCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  orderType: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 15,
  },
  scrollArea: {
    flex: 1, // Take up remaining space
    width: "100%",
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1, // Allow the container to grow as needed
    justifyContent: "flex-start", // Align items to the start
    width: "100%",
  },
  invoiceItem: {
    height: 50,
    alignSelf: "stretch",
  },
});

export default InvoiceReport;
