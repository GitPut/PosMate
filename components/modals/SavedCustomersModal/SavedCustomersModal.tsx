import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  customersList,
} from "state/state";
import { Ionicons, Entypo } from "@expo/vector-icons";
import SavedCustomerItem from "./components/SavedCustomerItem";
import Modal from "react-native-modal";
import CustomerDetailsModal from "./CustomerDetailsModal";

const SavedCustomersModal = ({
  setSaveCustomerModal,
  setOngoingDelivery,
  setNameForDelivery,
  setPhoneForDelivery,
  setAddressForDelivery,
  setBuzzCodeForDelivery,
  setUnitNumberForDelivery,
  setDeliveryChecked,
  setsavedCustomerDetails,
  setDeliveryModal,
}) => {
  const [customerSelected, setcustomerSelected] = useState(null);
  const { height, width } = useWindowDimensions();
  const [search, setsearch] = useState("");
  const customers = customersList.use();

  const closeAll = () => {
    setDeliveryModal(false);
    setSaveCustomerModal(false);
  };

  return (
    <Pressable
      onPress={closeAll}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
      activeOpacity={1}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View style={styles.container}>
            <View style={styles.topGroup}>
              <View style={styles.topRow}>
                <Pressable
                  onPress={() => {
                    setSaveCustomerModal(false);
                    setDeliveryModal(true);
                  }}
                >
                  <Entypo name="chevron-left" style={styles.goBackIcon} />
                </Pressable>
                <Pressable onPress={closeAll}>
                  <Ionicons name="md-close" style={styles.closeIcon} />
                </Pressable>
              </View>
              <Text style={styles.savedCustomersTxt}>Saved Customers</Text>
            </View>
            <View style={styles.bottomGroup}>
              <TextInput
                style={styles.searchSavedCustomersBox}
                placeholder="Enter Any Customer Details"
                value={search}
                onChangeText={(val) => setsearch(val)}
              />
              <View style={styles.scrollArea}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={
                    styles.scrollArea_contentContainerStyle
                  }
                >
                  {customers.map((customer) => {
                    const newAddress = customer.address?.label
                      ? customer.address?.label.toLowerCase()
                      : "";
                    const newName = customer.name
                      ? customer.name?.toLowerCase()
                      : "";
                    const lowerCaseSearch = search ? search?.toLowerCase() : "";
                    if (
                      search?.length > 0 &&
                      !newName.includes(lowerCaseSearch) &&
                      !customer.phone
                        ?.toLowerCase()
                        .includes(lowerCaseSearch) &&
                      !newAddress.includes(lowerCaseSearch)
                    )
                      return;
                    return (
                      <Pressable
                        key={customer.id}
                        onPress={() => setcustomerSelected(customer)}
                      >
                        <SavedCustomerItem
                          style={styles.savedCustomerItem}
                          customerName={
                            customer.name ? customer.name : "No Name"
                          }
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
          <Modal
            isVisible={customerSelected}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0}
          >
            <View
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {customerSelected && (
                <CustomerDetailsModal
                  setcustomerSelected={setcustomerSelected}
                  customerSelected={customerSelected}
                  setOngoingDelivery={setOngoingDelivery}
                  setNameForDelivery={setNameForDelivery}
                  setPhoneForDelivery={setPhoneForDelivery}
                  setAddressForDelivery={setAddressForDelivery}
                  setBuzzCodeForDelivery={setBuzzCodeForDelivery}
                  setUnitNumberForDelivery={setUnitNumberForDelivery}
                  setDeliveryChecked={setDeliveryChecked}
                  setsavedCustomerDetails={setsavedCustomerDetails}
                  closeAll={closeAll}
                />
              )}
            </View>
          </Modal>
        </div>
      </Pressable>
    </Pressable>
  );
};

export default SavedCustomersModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "space-around",
    width: 540,
    height: 608,
  },
  topGroup: {
    width: 493,
    height: 59,
    alignItems: "center",
    justifyContent: "space-between",
  },
  topRow: {
    width: 493,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goBackIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  closeIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
  },
  savedCustomersTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  bottomGroup: {
    height: 454,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  searchSavedCustomersBox: {
    width: 439,
    height: 54,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
  },
  scrollArea: {
    height: 325,
    width: 450,
  },
  scrollArea_contentContainerStyle: {
    height: 325,
    width: 439,
    paddingRight: 10,
  },
  savedCustomerItem: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem1: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem2: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem3: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem4: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem5: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
  savedCustomerItem6: {
    height: 50,
    width: 439,
    marginBottom: 15,
  },
});
