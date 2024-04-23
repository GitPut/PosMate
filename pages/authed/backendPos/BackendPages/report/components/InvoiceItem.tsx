import React from "react";
import { StyleSheet, View, Text, Pressable, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TransListStateItem } from "types/global";
import ParseDate from "components/functional/ParseDate";

interface InvoiceItemProps {
  style?: ViewStyle | ViewStyle[];
  item: TransListStateItem;
  setbaseSelectedRows: (val: ((prev: string[]) => string[]) | string[]) => void;
  baseSelectedRows: string[];
  deleteTransaction: () => void;
}

function InvoiceItem({
  style,
  item,
  setbaseSelectedRows,
  baseSelectedRows,
  deleteTransaction,
}: InvoiceItemProps) {
  const date = ParseDate(item.date);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.checkboxCont1}>
        <Pressable
          style={styles.checkbox2}
          onPress={() => {
            setbaseSelectedRows((prev) => {
              if (prev.includes(item.id!)) {
                return prev.filter((id) => id !== item.id);
              } else {
                return [...prev, item.id];
              }
            });
          }}
        >
          {baseSelectedRows?.includes(item.id) && "X"}
        </Pressable>
      </View>
      <View style={styles.orderIdCont1}>
        <Text style={styles.orderId3}>{item.id}</Text>
      </View>
      <View style={styles.customerNameCont1}>
        <Text style={styles.peterPutros}>{item.name ? item.name : "N/A"}</Text>
      </View>
      <View style={styles.dateCont1}>
        <Text style={styles.may252025}>{date?.toLocaleString()}</Text>
      </View>
      <View style={styles.totalCont1}>
        <Text style={styles.total3}>${item.amount}</Text>
      </View>
      <View style={styles.systemTypeCont1}>
        <Text style={styles.pos}>{item.system}</Text>
      </View>
      <View style={styles.orderTypeCont1}>
        <Text style={styles.pickUp}>{item.type}</Text>
      </View>
      <Pressable
        onPress={deleteTransaction}
        style={{
          height: 30,
          width: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          borderRadius: 5,
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    borderColor: "rgba(133,127,127,1)",
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  checkboxCont1: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    alignSelf: "stretch",
    marginBottom: 5,
  },
  checkbox2: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  orderIdCont1: {
    width: 120,
    alignItems: "flex-start",
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  orderId3: {
    color: "#121212",
    fontSize: 15,
  },
  customerNameCont1: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  peterPutros: {
    color: "#121212",
    fontSize: 15,
  },
  dateCont1: {
    width: 180,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  may252025: {
    color: "#121212",
    fontSize: 15,
  },
  totalCont1: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  total3: {
    color: "#121212",
    fontSize: 15,
  },
  systemTypeCont1: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  pos: {
    color: "#121212",
    fontSize: 15,
  },
  orderTypeCont1: {
    width: 120,
    justifyContent: "center",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  pickUp: {
    color: "#121212",
    fontSize: 15,
  },
});

export default InvoiceItem;
