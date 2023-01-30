import { Modal, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import { storeDetailState, transListState } from "state/state";
import { updateTransList } from "state/firebaseFunctions";
import ChangeScreen from "./ChangeScreen";

const CompletePaymentPhoneOrder = () => {
  const transList = transListState.use();
  const [changeModal, setChangeModal] = useState(false);
  const [currentOrder, setcurrentOrder] = useState({
    element: null,
    index: null,
  });

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", margin: 25 }}>
        Current Open Orders
      </Text>
      <View style={styles.contentContainer}>
        {transList ? (
          transList?.map((element, index) => {
            if (
              element.id?.substr(element.id?.length - 2, 2) === "-l" &&
              element.completed === false &&
              element.cancelled !== true
            ) {
              const date = element.date
                ? new Date(element.date.seconds * 1000)
                : element.date_created
                ? new Date(element.date_created)
                : null;

              return (
                <View
                  style={{
                    backgroundColor: "grey",
                    padding: 30,
                    margin: 10,
                  }}
                  key={index}
                >
                  <Text>{date.toLocaleString()}</Text>
                  {element.cart?.map((cartItem, index) => (
                    <View style={{ marginBottom: 20 }} key={index}>
                      <Text>Name: {cartItem.name}</Text>
                      <Text>Quantity: {cartItem.quantity}</Text>
                      <Text>Price: {cartItem.price}</Text>
                      {cartItem.options &&
                        cartItem.options?.map((option) => (
                          <Text>{option}</Text>
                        ))}
                    </View>
                  ))}
                  {element.line_items?.map((cartItem, index) => (
                    <View style={{ marginBottom: 20 }} key={index}>
                      <Text>Name: {cartItem.name}</Text>
                      <Text>Quantity: {cartItem.quantity}</Text>
                      <Text>Price: {cartItem.price}</Text>
                      {cartItem.meta_data?.map((meta, index) => {
                        if (index === cartItem.meta_data.length - 1) return;
                        return <Text>{`${meta.key} : ${meta.value}`}</Text>;
                      })}
                    </View>
                  ))}
                  <Text>{element.customer?.name}</Text>
                  <Text>{element.customer?.phone}</Text>
                  <Text>{element.customer?.address}</Text>
                  <Text>
                    Method:{" "}
                    {element.method === "pickupOrder" ? "Pick Up" : "Delivery"}
                  </Text>
                  <Button
                    title="Complete Order"
                    onPress={() => {
                      if (element.method === "pickupOrder") {
                        setChangeModal(true);
                        setcurrentOrder({ element: element, index: index });
                      } else {
                        const localChange = structuredClone(transList);
                        localChange[index].completed = true;
                        updateTransList(localChange);
                      }
                    }}
                    style={{ marginBottom: 10 }}
                  />
                  <Button
                    title="Cancel Order"
                    onPress={() => {
                      const localChange = structuredClone(transList);
                      localChange[index].cancelled = true;
                      updateTransList(localChange);
                    }}
                  />
                </View>
              );
            }
          })
        ) : (
          <Text>No Orders Yet</Text>
        )}
      </View>
      <Modal visible={changeModal}>
        <ChangeScreen
          setChangeModal={setChangeModal}
          setcurrentOrder={setcurrentOrder}
          order={currentOrder.element}
          completeOrder={() => {
            const localChange = structuredClone(transList);
            localChange[currentOrder.index].completed = true;
            updateTransList(localChange);
            setChangeModal(false);
          }}
        />
      </Modal>
    </View>
  );
};

export default CompletePaymentPhoneOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});
