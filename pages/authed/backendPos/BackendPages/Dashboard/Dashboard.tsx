import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import TotalRevenueBox from "./components/InfoBoxs/TotalRevenueBox";
import MostOrderedItemsBox from "./components/InfoBoxs/MostOrderedItemsBox";
import PickupOrdersBox from "./components/InfoBoxs/PickupOrdersBox";
import DeliveryOrdersBox from "./components/InfoBoxs/DeliveryOrdersBox";
import InStoreOrdersBox from "./components/InfoBoxs/InStoreOrdersBox";
import CustomersBox from "./components/InfoBoxs/CustomersBox";
import OrderWaitTimeBox from "./components/InfoBoxs/OrderWaitTimeBox";
import { customersList, userStoreState } from "state/state";
import { auth, db } from "state/firebaseConfig";
import ComponentLoader from "components/ComponentLoader";
import { UserStoreStateProps } from "types/global";

interface ProductCount {
  [key: string]: number;
}

interface DayStats {
  revenue: number;
  orders: number;
  inStore: number;
  delivery: number;
  pickup: number;
  productCounts: ProductCount;
  totalWaitTime: number;
  waitCount: number;
  averageWaitTime?: number;
  inStoreRevenue: number;
  deliveryRevenue: number;
  pickupRevenue: number;
}

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
  newCustomers: number;
  days: {
    [key: string]: DayStats;
  };
}

const Dashboard: React.FC = () => {
  const { width } = useWindowDimensions();
  const catalog = userStoreState.use();
  const customers = customersList.use();
  const [period, setPeriod] = useState<string>("Today");
  const [details, setDetails] = useState<DetailsProps>({
    averageWaitTime: { shortest: 0, longest: 0, average: 0, mean: 0 },
    inStoreOrders: { orders: 0, revenue: 0 },
    deliveryOrders: { orders: 0, revenue: 0 },
    pickupOrders: { orders: 0, revenue: 0 },
    totalRevenue: { orders: 0, revenue: 0 },
    mostOrderProducts: [],
    newCustomers: 0,
    days: {},
  });
  const [loading, setLoading] = useState<boolean>(true);

  const getDateRange = (
    period: string
  ): { start: string; end: string } | null => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearEnd = new Date(today.getFullYear(), 11, 31);

    switch (period) {
      case "Today":
        return {
          start: today.toISOString().split("T")[0],
          end: today.toISOString().split("T")[0],
        };
      case "This Week":
        return {
          start: weekStart.toISOString().split("T")[0],
          end: weekEnd.toISOString().split("T")[0],
        };
      case "This Month":
        return {
          start: monthStart.toISOString().split("T")[0],
          end: monthEnd.toISOString().split("T")[0],
        };
      case "This Year":
        return {
          start: yearStart.toISOString().split("T")[0],
          end: yearEnd.toISOString().split("T")[0],
        };
      case "All Time":
        return {
          start: "1970-01-01",
          end: today.toISOString().split("T")[0],
        };
      default:
        return null;
    }
  };

  const calculateDetails = (
    days: { [key: string]: DayStats },
    statsData: DetailsProps,
    catalog: UserStoreStateProps
  ): DetailsProps => {
    let shortest = 0;
    let longest = 0;
    let totalWaitTime = 0;
    let waitCount = 0;
    let totalOrders = 0;
    let totalRevenue = 0;
    const inStoreOrders = { orders: 0, revenue: 0 };
    const deliveryOrders = { orders: 0, revenue: 0 };
    const pickupOrders = { orders: 0, revenue: 0 };
    const mostOrderedItems: ProductCount = {};

    Object.keys(days).forEach((date) => {
      const dayStats = days[date];
      totalOrders += dayStats.orders;
      totalRevenue += dayStats.revenue;

      inStoreOrders.orders += dayStats.inStore;
      inStoreOrders.revenue += dayStats.inStoreRevenue;
      deliveryOrders.orders += dayStats.delivery;
      deliveryOrders.revenue += dayStats.deliveryRevenue;
      pickupOrders.orders += dayStats.pickup;
      pickupOrders.revenue += dayStats.pickupRevenue;

      totalWaitTime += dayStats.totalWaitTime;
      waitCount += dayStats.waitCount;

      Object.keys(dayStats.productCounts).forEach((itemName) => {
        mostOrderedItems[itemName] =
          (mostOrderedItems[itemName] || 0) + dayStats.productCounts[itemName];
      });

      const averageWaitTime = dayStats.averageWaitTime ?? 0;

      if (averageWaitTime < shortest) {
        shortest = averageWaitTime;
      }

      if (averageWaitTime > longest) {
        longest = averageWaitTime;
      }
    });

    const sortedItems = Object.entries(mostOrderedItems).sort(
      (a, b) => b[1] - a[1]
    );
    const mostOrderProducts = sortedItems.slice(0, 3).map((item) => ({
      name: item[0],
      orders: item[1],
      imageUrl:
        catalog.products.find((product) => product.name === item[0])
          ?.imageUrl ?? "https://via.placeholder.com/50",
    }));

    return {
      averageWaitTime: {
        shortest,
        longest,
        average: totalWaitTime / waitCount || 0,
        mean: totalWaitTime / totalOrders || 0,
      },
      inStoreOrders,
      deliveryOrders,
      pickupOrders,
      totalRevenue: {
        orders: totalOrders,
        revenue: totalRevenue,
      },
      mostOrderProducts,
      newCustomers: customers.length,
      days,
    };
  };

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const userId = auth.currentUser?.uid;
      const statsRef = db
        .collection("users")
        .doc(userId)
        .collection("stats")
        .doc("monthly");

      try {
        const statsDoc = await statsRef.get();
        if (statsDoc.exists) {
          const statsData = statsDoc.data() as DetailsProps;
          const { start, end } = getDateRange(period) ?? {};

          // Filter statsData.days based on the selected period
          if (start && end) {
            const filteredDays = Object.keys(statsData.days)
              .filter((date) => date >= start && date <= end)
              .reduce((obj, key) => {
                obj[key] = statsData.days[key];
                return obj;
              }, {} as { [key: string]: DayStats });

            // Calculate the details from the filtered days
            const newDetails = calculateDetails(
              filteredDays,
              statsData,
              catalog
            );
            setDetails((prevDetails) => ({
              ...prevDetails,
              ...newDetails,
              days: statsData.days,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
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
              period={period}
              setperiod={setPeriod}
              details={details}
            />
            {width > 1300 && (
              <MostOrderedItemsBox
                style={{}}
                period={period}
                setperiod={setPeriod}
                details={details.mostOrderProducts}
              />
            )}
            <View style={{ justifyContent: "space-between" }}>
              <OrderWaitTimeBox
                period={period}
                setperiod={setPeriod}
                details={details.averageWaitTime}
              />
              {width > 1300 && (
                <CustomersBox
                  customers={customers}
                  period={period}
                  setperiod={setPeriod}
                />
              )}
              {width < 1300 && (
                <MostOrderedItemsBox
                  style={{ height: 300 }}
                  period={period}
                  setperiod={setPeriod}
                  details={details.mostOrderProducts}
                />
              )}
            </View>
            {width < 1300 ? (
              <View style={{ justifyContent: "space-between" }}>
                <PickupOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.pickupOrders}
                />
                <DeliveryOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.deliveryOrders}
                />
                <InStoreOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.inStoreOrders}
                />
              </View>
            ) : (
              <>
                <PickupOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.pickupOrders}
                />
                <DeliveryOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.deliveryOrders}
                />
                <InStoreOrdersBox
                  period={period}
                  setperiod={setPeriod}
                  details={details.inStoreOrders}
                />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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
