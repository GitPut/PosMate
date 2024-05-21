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
    const fetchStats = async () => {
      const userId = auth.currentUser?.uid; // or another method to retrieve the user ID
      const today = new Date();
      const statsDocId = `${today.getFullYear()}-${today.getMonth() + 1}`; // Adjust based on your stats document naming convention

      try {
        const doc = await db
          .collection("users")
          .doc(userId)
          .collection("stats")
          .doc(statsDocId)
          .get();
        if (doc.exists) {
          setDetails(doc.data());
          setloading(false);
        } else {
          console.log("No stats available for this period.");
          setloading(false);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setloading(false);
      }
    };

    fetchStats();
  }, [period]);


 return (
   <View style={styles.container}>
     <ScrollView
       style={{ height: "100%", width: "100%" }}
       contentContainerStyle={{ paddingRight: 30 }}
     >
       {loading ? (
         <ComponentLoader />
       ) : (
         <View style={styles.wrap}>
           <TotalRevenueBox
             style={width < 1300 ? { width: "100%" } : {}}
             details={details.totalRevenue}
           />
           {width > 1300 && (
             <MostOrderedItemsBox details={details.mostOrderProducts} />
           )}
           <OrderWaitTimeBox details={details.averageWaitTime} />
           <PickupOrdersBox details={details.pickupOrders} />
           <DeliveryOrdersBox details={details.deliveryOrders} />
           <InStoreOrdersBox details={details.inStoreOrders} />
         </View>
       )}
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
