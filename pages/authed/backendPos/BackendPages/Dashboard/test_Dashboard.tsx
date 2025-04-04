import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  // Button,
} from "react-native";
import TotalRevenueBox from "./components/InfoBoxs/TotalRevenueBox";
import MostOrderedItemsBox from "./components/InfoBoxs/MostOrderedItemsBox";
import PickupOrdersBox from "./components/InfoBoxs/PickupOrdersBox";
import DeliveryOrdersBox from "./components/InfoBoxs/DeliveryOrdersBox";
import InStoreOrdersBox from "./components/InfoBoxs/InStoreOrdersBox";
import CustomersBox from "./components/InfoBoxs/CustomersBox";
import OrderWaitTimeBox from "./components/InfoBoxs/OrderWaitTimeBox";
import { customersList, transListState, userStoreState } from "state/state";
import ParseDate from "components/functional/ParseDate";
import SearchDateTransactions from "components/functional/SearchDateTransactions";
import { TransListStateItem } from "types/global";
import { auth, db } from "state/firebaseConfig";
import Loader from "components/Loader";
import ComponentLoader from "components/ComponentLoader";
// import { auth, db } from "state/firebaseConfig";
// import firebase from "firebase/compat/app";

interface DetailsProps {
  averageWaitTime: {
    shortest: number;
    longest: number;
    average: number;
    mean: number;
  };
  inStoreOrders: {
    orders: number;
    revenue: number;
  };
  deliveryOrders: {
    orders: number;
    revenue: number;
  };
  pickupOrders: {
    orders: number;
    revenue: number;
  };
  totalRevenue: {
    orders: number;
    revenue: number;
  };
  mostOrderProducts: {
    name: string;
    orders: number;
    imageUrl: string;
  }[];
}

function Dashboard() {
  const { width } = useWindowDimensions();
  const [transList, settransList] = useState<TransListStateItem[]>([]);
  const catalog = userStoreState.use();
  const customers = customersList.use();
  const [period, setperiod] = useState("Today");
  const [details, setdetails] = useState<DetailsProps>({
    averageWaitTime: { shortest: 0, longest: 0, average: 0, mean: 0 },
    inStoreOrders: { orders: 0, revenue: 0 },
    deliveryOrders: { orders: 0, revenue: 0 },
    pickupOrders: { orders: 0, revenue: 0 },
    totalRevenue: { orders: 0, revenue: 0 },
    mostOrderProducts: [],
    // newCustomers: 0,
  });
  const [prevPeriod, setprevPeriod] = useState("Today");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (period !== "All Time" && prevPeriod === "All Time") {
      // console.log("fetching this year transactions");
      const today = new Date();
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear(), 11, 31);

      // Fetch invoices from Firebase and filter them by date range
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .where("date", ">=", yearStart)
        .where("date", "<=", yearEnd)
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
          // console.log("Filtered invoices:", filteredInvoices);
          settransList(filteredInvoices);
          setprevPeriod(period);
          setloading(false);
        });
    } else {
      // console.log("fetching all transactions");
      // Fetch invoices from Firebase and filter them by date range
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
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
          // console.log("Filtered invoices:", filteredInvoices);
          settransList(filteredInvoices);
          setprevPeriod(period);
          setloading(false);
        });
    }
  }, [period]);

  // async function updateDateFieldToTimestamp() {
  //   const userDocRef = db.collection("users").doc(auth.currentUser?.uid);
  //   const transListRef = userDocRef.collection("transList");

  //   try {
  //     const querySnapshot = await transListRef.get();

  //     const batch = db.batch(); // Create a batched write

  //     querySnapshot.forEach((doc) => {
  //       const dateString = doc.data().date;
  //       const date = ParseDate(dateString);
  //       if (!date) return;
  //       const timestamp = firebase.firestore.Timestamp.fromDate(date);

  //       const docRef = transListRef.doc(doc.id);
  //       batch.update(docRef, { date: timestamp });
  //     });

  //     // Commit the batched write
  //     await batch.commit();

  //     console.log("Date fields updated successfully to Firestore timestamps.");
  //   } catch (error) {
  //     console.error("Error updating date fields:", error);
  //   }
  // }

  const getDateRange = (period: string) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(weekStart.getDate() + 6));
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearEnd = new Date(today.getFullYear(), 11, 31);

    switch (period) {
      case "Today":
        return {
          start: new Date().toDateString(),
          end: new Date().toDateString(),
        };
      case "This Week":
        return {
          start: weekStart.toDateString(),
          end: weekEnd.toDateString(),
        };
      case "This Month":
        return {
          start: monthStart.toDateString(),
          end: monthEnd.toDateString(),
        };
      case "This Year":
        return {
          start: yearStart.toDateString(),
          end: yearEnd.toDateString(),
        };
      default:
        // Assuming you want to default to "All Time" with no filtering.
        return null;
    }
  };

  const calculateDetails = (filtered: TransListStateItem[]) => {
    let shortest = 0;
    let longest = 0;
    let average = 0;
    let mean = 0;
    let total = 0;
    let totalOrders = 0;

    const inStoreOrders = { orders: 0, revenue: 0 };
    const deliveryOrders = { orders: 0, revenue: 0 };
    const pickupOrders = { orders: 0, revenue: 0 };
    const totalRevenue = { orders: 0, revenue: 0 };

    const mostOrderedItems: Record<string, number> = {};

    filtered?.forEach((transaction) => {
      //get time between date and dateCompleted
      const date = ParseDate(transaction.date);

      if (transaction.method === "inStoreOrder") {
        inStoreOrders.revenue += parseFloat(transaction.total ?? "0");
        inStoreOrders.orders += 1;
      }
      if (transaction.method === "deliveryOrder") {
        deliveryOrders.revenue += parseFloat(transaction.total ?? "0");
        deliveryOrders.orders += 1;
      }
      if (transaction.method === "pickupOrder") {
        pickupOrders.revenue += parseFloat(transaction.total ?? "0");
        pickupOrders.orders += 1;
      }
      totalRevenue.revenue += parseFloat(transaction.total ?? "0");
      totalRevenue.orders += 1;

      transaction.cart?.forEach((item) => {
        if (mostOrderedItems[item.name]) {
          mostOrderedItems[item.name] += 1;
        } else {
          mostOrderedItems[item.name] = 1;
        }
      });

      if (transaction.originalData?.dateCompleted) {
        const dateCompleted = ParseDate(
          transaction.originalData?.dateCompleted
        );

        const diff = Number(dateCompleted) - Number(date);
        const minutes = Math.floor(diff / 60000);
        total += minutes;
        totalOrders += 1;
        if (shortest === 0 || minutes < shortest) {
          shortest = minutes;
        }
        if (longest === 0 || minutes > longest) {
          longest = minutes;
        }
      }
    });

    average = total / totalOrders;
    mean = total / totalOrders;

    const sortedItems = Object.entries(mostOrderedItems).sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );

    const mostOrderProducts = sortedItems.slice(0, 3).map((item) => {
      return {
        name: item[0],
        orders: item[1] as number, // Explicitly typing orders as number
        imageUrl:
          catalog.products[
            catalog.products.findIndex((product) => product.name === item[0])
          ]?.imageUrl ?? "https://via.placeholder.com/50",
      };
    });

    return {
      averageWaitTime: { shortest, longest, average, mean },
      inStoreOrders,
      deliveryOrders,
      pickupOrders,
      totalRevenue,
      mostOrderProducts,
    };
  };

  useEffect(() => {
    const { start, end } = getDateRange(period) ?? {};

    const filtered =
      start && end
        ? SearchDateTransactions({
            startDate: start,
            endDate: end,
            transactions: transList,
          })
        : transList;

    const newDetails = calculateDetails(filtered ?? []);

    setdetails((prev) => ({
      ...prev,
      ...newDetails,
    }));
  }, [period, customers, transList]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: "100%", width: "100%" }}
        contentContainerStyle={{ paddingRight: 30 }}
      >
        <View style={styles.wrap}>
          {/* <Button
            title="Update Date Fields"
            onPress={updateDateFieldToTimestamp}
          /> */}
          <TotalRevenueBox
            style={width < 1300 ? { width: "100%" } : {}}
            allTransactions={transList}
            period={period}
            setperiod={setperiod}
            details={details.totalRevenue}
          />
          {width > 1300 && (
            <MostOrderedItemsBox
              style={{}}
              period={period}
              setperiod={setperiod}
              details={details.mostOrderProducts}
            />
          )}
          <View style={{ justifyContent: "space-between" }}>
            <OrderWaitTimeBox
              period={period}
              setperiod={setperiod}
              details={details.averageWaitTime}
            />
            {width > 1300 && (
              <CustomersBox
                customers={customers}
                period={period}
                setperiod={setperiod}
              />
            )}
            {width < 1300 && (
              <MostOrderedItemsBox
                style={{ height: 300 }}
                period={period}
                setperiod={setperiod}
                details={details.mostOrderProducts}
              />
            )}
          </View>
          {width < 1300 ? (
            <View style={{ justifyContent: "space-between" }}>
              <PickupOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.pickupOrders}
              />
              <DeliveryOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.deliveryOrders}
              />
              <InStoreOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.inStoreOrders}
              />
            </View>
          ) : (
            <>
              <PickupOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.pickupOrders}
              />
              <DeliveryOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.deliveryOrders}
              />
              <InStoreOrdersBox
                period={period}
                setperiod={setperiod}
                details={details.inStoreOrders}
              />
            </>
          )}
        </View>
      </ScrollView>
      {loading && (
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
