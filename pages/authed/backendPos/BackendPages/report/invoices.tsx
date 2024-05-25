import React, { useState, useEffect, useCallback } from "react";
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
import { ExcelTransListStateItem, TransListStateItem } from "types/global";
import ComponentLoader from "components/ComponentLoader";
import firebase from "firebase/compat";

const pageSize = 100; // Number of documents to fetch per page
let lastVisibleDoc: firebase.firestore.DocumentSnapshot | null = null; // Track the last visible document to fetch the next page

function InvoiceReport() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTransList, setFilteredTransList] = useState<
    TransListStateItem[]
  >([]);
  const [invoices, setInvoices] = useState<TransListStateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const storeDetails = storeDetailState.use();
  const [baseSelectedRows, setBaseSelectedRows] = useState<string[]>([]);
  const [updateBaseSelectedRows, setUpdateBaseSelectedRows] =
    useState<boolean>(false);
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert();

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "System Type", dataIndex: "system", key: "system" },
    { title: "Type", dataIndex: "type", key: "type" },
  ];

  useEffect(() => {
    if (updateBaseSelectedRows) {
      handlePrintSelectedRows();
    }
  }, [baseSelectedRows, updateBaseSelectedRows]);

  const handlePrintSelectedRows = () => {
    if (baseSelectedRows.length >= 1) {
      let data: string[] = [];
      baseSelectedRows.forEach((idx) => {
        const orderIndex =
          filteredTransList.length > 0
            ? filteredTransList.findIndex((item) => item.id === idx)
            : invoices.findIndex((item) => item.id === idx);
        const element =
          filteredTransList.length > 0
            ? filteredTransList[orderIndex]
            : invoices[orderIndex];
        const formattedData = ReceiptPrint(element, storeDetails, true);
        data = data.concat(formattedData.data);
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
          .add({ printData: data });
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
          .catch((err: Error) => {
            handlePrintError(err);
          });
      }
    } else {
      alertP.error(
        "Highlight one or multiple receipt then click to print them"
      );
    }
    setUpdateBaseSelectedRows(false);
    setBaseSelectedRows([]);
  };

  const handlePrintError = (err: Error) => {
    if (err.message.includes("A printer must be specified before printing")) {
      alertP.error("You must specify a printer in device settings");
    } else if (err.message.includes("Unable to establish connection with QZ")) {
      alertP.error(
        "You do not have Divine POS Helper installed. Please download from general settings"
      );
    } else if (err.message.includes("Cannot find printer with name")) {
      alertP.error("Printer not found. Please check your printer settings.");
    } else {
      alertP.error(
        "An error occurred while trying to print. Try refreshing the page and trying again."
      );
    }
  };

  const searchDate = useCallback(() => {
    let query = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("transList")
      .orderBy("date", "desc");

    if (startDate && endDate) {
      const startDateConverted = new Date(startDate);
      startDateConverted.setHours(0, 0, 0, 0);
      startDateConverted.setDate(startDateConverted.getDate() + 1);
      const endDateConverted = new Date(endDate);
      endDateConverted.setDate(endDateConverted.getDate() + 1);
      endDateConverted.setHours(23, 59, 59, 999);

      query = query
        .where("date", ">=", startDateConverted)
        .where("date", "<=", endDateConverted);
    }

    query.get().then(handleQuerySnapshot);
  }, [startDate, endDate, search]);

  const handleQuerySnapshot = (
    querySnapshot: firebase.firestore.QuerySnapshot
  ) => {
    const filteredInvoices: TransListStateItem[] = [];
    querySnapshot.forEach((doc) => {
      const orderType = getOrderType(doc.data().method);
      const docData = doc.data() as TransListStateItem;
      const organizedData: TransListStateItem = {
        ...docData,
        id: docData.transNum.toUpperCase(),
        name: docData.customer?.name ? docData.customer?.name : "N/A",
        date: docData.date,
        originalData: {
          ...docData,
          id: docData.id,
          cart: docData.cart ?? [],
          cartNote: docData.cartNote ?? "",
          customer: docData.customer ?? { name: "", phone: "" },
          date: docData.date,
          method: docData.method ?? "",
          online: docData.online ?? false,
          isInStoreOrder: docData.isInStoreOrder ?? false,
          transNum: docData.transNum,
          total: docData.total ?? "",
        },
        docID: doc.id,
        amount: docData.total,
        system: "POS",
        type: orderType,
        method: docData.method,
      };

      if (checkCase(organizedData)) {
        filteredInvoices.push(organizedData);
      }
    });

    setFilteredTransList(filteredInvoices);
  };

  const getOrderType = (method: string) => {
    switch (method) {
      case "deliveryOrder":
        return "Delivery";
      case "pickupOrder":
        return "Pickup";
      case "inStoreOrder":
        return "In Store";
      default:
        return "";
    }
  };

  const checkCase = (item: TransListStateItem) => {
    const searchQuery = search.toLowerCase().replace(/\s/g, "");

    return (
      item.id.toLowerCase().includes(searchQuery) ||
      item.name?.toLowerCase().includes(searchQuery) ||
      item.customer?.phone?.includes(searchQuery) ||
      item.customer?.address?.label
        ?.toLowerCase()
        .replace(/\s/g, "")
        .includes(searchQuery)
    );
  };

  const fetchNextPage = useCallback(() => {
    if (loading) return;
    setLoading(true);

    let query = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("transList")
      .orderBy("date", "desc")
      .limit(pageSize);

    if (lastVisibleDoc) {
      query = query.startAfter(lastVisibleDoc);
    }

    query
      .get()
      .then((querySnapshot) => {
        const newInvoices: TransListStateItem[] = [];

        querySnapshot.forEach((doc) => {
          lastVisibleDoc = doc;
          const orderType = getOrderType(doc.data().method);
          const docData = doc.data() as TransListStateItem;

          newInvoices.push({
            ...docData,
            id: docData.transNum.toUpperCase(),
            name: docData.customer?.name ? docData.customer?.name : "N/A",
            date: docData.date,
            originalData: {
              ...docData,
              id: docData.id,
              cart: docData.cart ?? [],
              cartNote: docData.cartNote ?? "",
              customer: docData.customer ?? { name: "", phone: "" },
              date: docData.date,
              method: docData.method ?? "",
              online: docData.online ?? false,
              isInStoreOrder: docData.isInStoreOrder ?? false,
              transNum: docData.transNum,
              total: docData.total ?? "",
            },
            docID: doc.id,
            amount: docData.total,
            system: "POS",
            type: orderType,
            method: docData.method,
          });
        });

        setInvoices((prevInvoices) => [...prevInvoices, ...newInvoices]);
        setLoading(false);
        if (!firstLoad) {
          setFirstLoad(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
        setLoading(false);
        if (!firstLoad) {
          setFirstLoad(true);
        }
      });
  }, [loading, firstLoad]);

  useEffect(() => {
    fetchNextPage();
    return () => {
      lastVisibleDoc = null;
    };
  }, []);

  const handleEndReached = () => {
    fetchNextPage();
  };

  const downloadExcel = () => {
    const invoicesToDownload: ExcelTransListStateItem[] = [];

    baseSelectedRows.forEach((idx) => {
      const orderIndex =
        filteredTransList.length > 0
          ? filteredTransList.findIndex((item) => item.id === idx)
          : invoices.findIndex((item) => item.id === idx);
      const element =
        filteredTransList.length > 0
          ? filteredTransList[orderIndex]
          : invoices[orderIndex];
      invoicesToDownload.push({ ...element, date: element.date.toDate() });
    });

    const excelDownload = new ExcelDownload();
    excelDownload
      .addSheet("history")
      .addColumns(columns)
      .addDataSource(invoicesToDownload, { str2Percent: true })
      .saveAs("StoreReceipts.xlsx");
  };

  const printTotals = (date: Date, dateName: string) => {
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

    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("transList")
      .where("date", ">=", todayStart)
      .where("date", "<=", todayEnd)
      .get()
      .then((querySnapshot) => {
        const filteredInvoices: TransListStateItem[] = [];
        querySnapshot.forEach((doc) => {
          const orderType = getOrderType(doc.data().method);
          const docData = doc.data() as TransListStateItem;
          filteredInvoices.push({
            ...docData,
            id: docData.transNum?.toUpperCase(),
            name: docData.customer?.name ? docData.customer?.name : "N/A",
            date: docData.date,
            originalData: {
              ...docData,
              id: docData.id,
              cart: docData.cart ?? [],
              cartNote: docData.cartNote ?? "",
              customer: docData.customer ?? { name: "", phone: "" },
              date: docData.date,
              method: docData.method ?? "",
              online: docData.online ?? false,
              isInStoreOrder: docData.isInStoreOrder ?? false,
              transNum: docData.transNum,
              total: docData.total ?? "",
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
          storeDetails.website + "\x0A",
          storeDetails.phoneNumber + "\x0A",
          date.toDateString() + "\x0A",
          "\x0A",
          `${dateName}s Report` + "\x0A",
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
          "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
          "\x0A",
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
            .add({ printData: data });
        } else {
          qz.websocket
            .connect()
            .then(() => {
              if (!myDeviceDetails.printToPrinter) return;
              const config = qz.configs.create(myDeviceDetails.printToPrinter);
              return qz.print(config, data);
            })
            .then(qz.websocket.disconnect)
            .catch(handlePrintError);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents: ", error);
        alertP.error("An error occurred while fetching invoices.");
      });
  };

  const deleteTransaction = (item: TransListStateItem) => {
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

    setFilteredTransList((prev) => prev.filter((e) => e.id !== item.id));
    setInvoices((prev) => prev.filter((e) => e.id !== item.id));
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
            <Pressable onPress={searchDate} style={styles.searchFilterBtn}>
              <Ionicons name="search" style={styles.searchIcon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.downloadAndPrintBtnsGroup}>
          <Pressable
            onPress={downloadExcel}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather name="download" style={styles.downloadIcon} />
          </Pressable>
          <Pressable
            onPress={() => {
              setUpdateBaseSelectedRows(true);
            }}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather name="printer" style={styles.printIcon} />
          </Pressable>
        </View>
        <Pressable
          style={styles.printTotalsBtn}
          onPress={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            printTotals(yesterday, "Yesterday");
          }}
        >
          <Text>Print Yesterday</Text>
        </Pressable>
        <Pressable
          style={styles.printTotalsBtn}
          onPress={() => {
            const today = new Date();
            printTotals(today, "Today");
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
                const newSelectedRows: string[] = [];
                if (
                  (filteredTransList.length === baseSelectedRows.length ||
                    invoices.length === baseSelectedRows.length) &&
                  baseSelectedRows.length > 0
                ) {
                  setBaseSelectedRows([]);
                } else {
                  const itemsToSelect =
                    filteredTransList.length > 0 ? filteredTransList : invoices;
                  itemsToSelect.forEach((item) =>
                    newSelectedRows.push(item.id)
                  );
                  setBaseSelectedRows(newSelectedRows);
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
              renderItem={({ item }) => (
                <InvoiceItem
                  item={item}
                  setbaseSelectedRows={setBaseSelectedRows}
                  baseSelectedRows={baseSelectedRows}
                  deleteTransaction={() => deleteTransaction(item)}
                />
              )}
            />
          ) : (
            <FlatList
              data={invoices}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                <InvoiceItem
                  item={item}
                  setbaseSelectedRows={setBaseSelectedRows}
                  baseSelectedRows={baseSelectedRows}
                  deleteTransaction={() => deleteTransaction(item)}
                />
              )}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
            />
          )}
        </View>
      </View>
      {!firstLoad && (
        <View style={styles.loaderContainer}>
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
    justifyContent: "flex-start",
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
    flex: 1,
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
    flex: 1,
    width: "100%",
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  invoiceItem: {
    height: 50,
    alignSelf: "stretch",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  printTotalsBtn: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InvoiceReport;
