import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import InvoiceItem from "./components/InvoiceItem";
import { myDeviceDetailsState, setTransListTableOrgState, storeDetailState, transListState, transListTableOrgState } from "state/state";
import { Excel as ExcelDownload } from "antd-table-saveas-excel";
import { auth, db } from "state/firebaseConfig";
import ReceiptPrint from "components/functional/ReceiptPrint";
import { useAlert } from "react-alert";
import qz from "qz-tray";

function InvoiceReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const transListTableOrg = transListTableOrgState.use(); // Assumed this is your original transactions list
  const [filteredTransList, setFilteredTransList] = useState(transListTableOrg);
  const storeDetails = storeDetailState.use();
  const [baseSelectedRows, setbaseSelectedRows] = useState([])
  const [updateBaseSelectedRows, setupdateBaseSelectedRows] = useState(false)
  const transList = transListState.use()
  const myDeviceDetails = myDeviceDetailsState.use();
  const alertP = useAlert()

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
    setFilteredTransList(transListTableOrg)
  }, [transListTableOrg])


  useEffect(() => {
    console.log('Selected rows from base: ', baseSelectedRows)
    if (updateBaseSelectedRows === true) {
      if (baseSelectedRows.length >= 1) {
        let data = [];
        baseSelectedRows.forEach((idx) => {
          //find index of item in transList that matches id of selected row
          const orderIndex = transListTableOrg.findIndex((item) => item.id === idx)

          const element =
            transList[
            orderIndex
            ];
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
            .then(function () {
              const config = qz.configs.create(myDeviceDetails.printToPrinter);
              return qz.print(config, data);
            })
            .then(qz.websocket.disconnect)
            .catch(function (err) {
              if (
                err.message.includes("A printer must be specified before printing")
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
      setupdateBaseSelectedRows(false)
      setbaseSelectedRows([])
    }
  }, [baseSelectedRows, updateBaseSelectedRows])

  const SearchDate = () => {
    if (!startDate || !endDate) {
      console.log('Start or end date not provided');
      return;
    }

    const startDateConverted = new Date(startDate);
    startDateConverted.setHours(0, 0, 0, 0); // Set to start of the day
    startDateConverted.setDate(startDateConverted.getDate() + 1); // Add a day to the start date
    const endDateConverted = new Date(endDate);
    endDateConverted.setDate(endDateConverted.getDate() + 1); // Add a day to the end date
    endDateConverted.setHours(23, 59, 59, 999); // Set to end of the day

    // Filter the list based on the date range
    const filtered = transListTableOrg.filter((item) => {
      let itemDate

      if (item.date) {
        itemDate = new Date(`${item.date.slice(0, 10)}T00:00`);
      }
      // else if (item.originalData.date_created) {
      //   itemDate = new Date(item.originalData.date_created);
      // } else if (item.originalData.date) {
      //   itemDate = new Date(item.originalData.date.seconds * 1000);
      // }
      else {
        return false;
      }

      // Check if the item's date is within the start and end dates
      return (
        itemDate >= startDateConverted &&
        itemDate <= endDateConverted
      );
    }).sort((a, b) => {
      return new Date(`${b.date.slice(0, 10)}T00:00`) - new Date(`${a.date.slice(0, 10)}T00:00`);
    }
    );

    // Update the state with the filtered list
    setFilteredTransList(filtered);
  };

  //Printing function
  const DownloadExcel = () => {
    const invoicesToDownload = []

    baseSelectedRows.forEach((idx) => {
      const orderIndex = transListTableOrg.findIndex((item) => item.id === idx)
      const element = transList[orderIndex];
      invoicesToDownload.push(element)
    });

    const excelDownload = new ExcelDownload();
    excelDownload
      .addSheet("history")
      .addColumns(columns)
      .addDataSource(invoicesToDownload, {
        str2Percent: true
      })
      .saveAs("StoreReceipts.xlsx");
  };

  const PrintTotals = (date, dateName) => {
    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

    const filtered = transListTableOrg.filter((item) => {
      let itemDate = item.date
        ? new Date(`${item.date.slice(0, 10)}T00:00`) : null
      // console.log('Item Date: ', itemDate)

      return (
        itemDate >= todayStart &&
        itemDate <= todayEnd
      );
    }
    );

    if (filtered.length === 0) {
      alertP.error(`No sales ${dateName}`);
      return;
    }

    let todayTotal = 0;
    let salesTotal = filtered.length;

    filtered.forEach((item) => {
      todayTotal += parseFloat(item.amount);
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
      `${dateName}s Total Revenue: $${todayTotal.toFixed(2)}`,
      "\x0A",
      `${dateName}s Total Sales: ${salesTotal}`,
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
      "\x1D" + "\x56" + "\x00"
    ]

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
          const config = qz.configs.create(myDeviceDetails.printToPrinter);
          return qz.print(config, data);
        })
        .then(qz.websocket.disconnect)
        .catch(function (err) {
          if (
            err.message.includes("A printer must be specified before printing")
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
  }

  const CheckCase = (item) => {
    if (search.length > 0) {
      if (item.customer?.address) {
        return item.customer.address.label?.toLowerCase().replace(/\s/g, '').includes(search?.toLowerCase().replace(/\s/g, ''))
      }
      return item.id.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())
    }
    return true
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '95%', marginTop: 20, marginBottom: 20 }}>
        <Text style={styles.invoiceReportLbl}>Invoices Report</Text>
      </View>
      <View style={styles.topRow}>
        <View style={styles.centerGroup}>
          <TextInput style={styles.searchInvoiceInput} placeholder="Enter search filter" value={search} onChangeText={val => setSearch(val)} />
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
            <Pressable style={styles.resetFilterBtn}
              onPress={() => {
                setStartDate('')
                setEndDate('')
                setSearch('')
                setFilteredTransList(transListTableOrg)
              }}
            >
              <Ionicons
                name="close"
                style={styles.clearIcon}
              />
            </Pressable>
            <Pressable onPress={SearchDate} style={styles.searchFilterBtn}>
              <Ionicons
                name="search"
                style={styles.searchIcon}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.downloadAndPrintBtnsGroup}>
          <Pressable
            onPress={DownloadExcel}
            activeOpacity={0.8}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather
              name="download"
              style={styles.downloadIcon}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setupdateBaseSelectedRows(true)
            }}
            activeOpacity={0.8}
            disabled={baseSelectedRows.length === 0}
          >
            <Feather name="printer" style={styles.printIcon} />
          </Pressable>
        </View>
        <Pressable style={{
          padding: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
          onPress={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            PrintTotals(yesterday, 'Yesterday')
          }}
        >
          <Text>Print Yesterday</Text>
        </Pressable>
        <Pressable style={{
          padding: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
          onPress={() => {
            const today = new Date();
            PrintTotals(today, 'Today')
          }}
        >
          <Text>Print Today</Text>
        </Pressable>
      </View>
      <View style={styles.bottomGroup}>
        <View style={styles.invoiceReportHeader}>
          <View style={styles.checkboxCont}>
            <Pressable
              activeOpacity={0.8}
              style={styles.checkbox}
              onPress={() => {
                if (baseSelectedRows.length === filteredTransList.filter(e => CheckCase(e)).length) {
                  setbaseSelectedRows([])
                } else {
                  const newSelectedRows = []
                  filteredTransList.forEach((item) => {
                    if (!CheckCase(item)) {
                      return
                    }
                    newSelectedRows.push(item.id)
                  })
                  setbaseSelectedRows(newSelectedRows)
                }
              }}
            >
              {(baseSelectedRows.length === filteredTransList.filter(e => CheckCase(e)).length && filteredTransList.filter(e => CheckCase(e)).length > 0) && "X"}
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
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            {filteredTransList.map((item, index) => {
              if (!CheckCase(item)) {
                return null
              }

              return (
                <InvoiceItem
                  key={index}
                  style={styles.invoiceItem}
                  item={item}
                  setbaseSelectedRows={setbaseSelectedRows}
                  baseSelectedRows={baseSelectedRows}
                  deleteTransaction={() => {
                    console.log("Deleting transaction: ", item)
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

                    setTransListTableOrgState(
                      transListTableOrg.filter((e) => e.id !== item.id)
                    )

                  }}
                />
              )
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start to avoid stretching
    width: '100%',
  },
  topRow: {
    width: '95%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceReportLbl: {
    fontWeight: '700',
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
    padding: 10
  },
  dateSelectorGroup: {
    flexDirection: "row",
    width: 245,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -20
  },
  startDateInput: {
    width: 100,
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10
  },
  endDateInput: {
    width: 100,
    height: 34,
    backgroundColor: "#f6f6fb",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10
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
    justifyContent: "center"
  },
  clearIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30
  },
  searchFilterBtn: {
    width: 34,
    height: 34,
    backgroundColor: "rgba(65,117,5,1)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  searchIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30
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
    fontSize: 30
  },
  printIcon: {
    color: "rgba(74,74,74,1)",
    fontSize: 30
  },
  bottomGroup: {
    flex: 1, // Take up remaining space
    justifyContent: "flex-start",
    width: '95%',
    marginTop: 15
  },
  invoiceReportHeader: {
    height: 40,
    backgroundColor: "#E6E6E6",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  checkboxCont: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    alignSelf: "stretch"
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderIdCont: {
    width: 120,
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  orderId: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  customerNameCont: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  customerName: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  dateCont: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  date: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  totalCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  total: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  systemTypeCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  systemType: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  orderTypeCont: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  orderType: {
    fontWeight: '700',
    color: "#121212",
    fontSize: 15
  },
  scrollArea: {
    flex: 1, // Take up remaining space
    width: '100%',
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1, // Allow the container to grow as needed
    justifyContent: "flex-start", // Align items to the start
    width: '100%',
  },
  invoiceItem: {
    height: 50,
    alignSelf: "stretch"
  },
});

export default InvoiceReport;
