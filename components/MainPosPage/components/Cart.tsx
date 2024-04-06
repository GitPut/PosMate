import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import CartItem from "./cartOrder/CartItem";
import UntitledComponent from "./cartOrder/UntitledComponent";
import { MaterialIcons } from "@expo/vector-icons";
import CheckoutBtn from "./Cart/CheckoutBtn";

// Assuming CartItemProps is defined in "./cartOrder/CartItem"
// and StoreDetails and DiscountAmount have been defined somewhere
interface StoreDetails {
  deliveryPrice: number;
  taxRate?: number; // Assuming this exists based on usage in Cart component
  // Add any other relevant fields used within your components
}

interface CartItemProps {
  cartItem: {
    imageUrl?: string;
    quantity?: number;
    name: string;
    price: number | string; // If price is a string, ensure to parse it when doing calculations
    quantityNotChangable?: boolean;
    editableObj?: any; // Specify further if possible
    description?: string;
    extraDetails?: string;
    options: string[]; // Assuming options are an array of strings, adjust if necessary
  };
  index: number;
  removeAction: () => void;
  decreaseAction: () => void;
  increaseAction: () => void;
  style?: any; // You could use React Native's StyleProp<ViewStyle> for better typing
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string; // Add optional if not all customers have addresses
  // Include any other fields relevant to your customers
}

interface CartProps {
  cart: CartItemProps[]; // Adjust based on the actual type
  setCartState: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
  setDiscountAmount: React.Dispatch<React.SetStateAction<string | null>>;
  discountAmount: string;
  storeDetails: StoreDetails; // Define this based on actual usage
  deliveryChecked: boolean;
  cartSub: number;
  width: number;
  setOngoingDelivery: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setPhone: React.Dispatch<React.SetStateAction<string | null>>;
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setupdatingOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setsavedCustomerDetails: React.Dispatch<
    React.SetStateAction<Customer | null>
  >; // Assuming Customer type is defined
  setBuzzCode: React.Dispatch<React.SetStateAction<string | null>>;
  setUnitNumber: React.Dispatch<React.SetStateAction<string | null>>;
  setChangeDue: React.Dispatch<React.SetStateAction<string | null>>;
  changeDue: string | null;
  setCashModal: React.Dispatch<React.SetStateAction<boolean>>;
  ongoingDelivery: boolean;
  updatingOrder: boolean;
  setDeliveryChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setDeliveryModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomersList: React.Dispatch<React.SetStateAction<Customer[]>>;
  customers: Customer[];
  savedCustomerDetails: Customer | null;
  myDeviceDetails: any; // Define more specifically if possible
  name: string;
  phone: string;
  address: string;
  buzzCode: string;
  unitNumber: string;
  cartNote?: string | null;
  setcartNote: React.Dispatch<React.SetStateAction<string | null>>;
}

const Cart: React.FC<CartProps> = ({
  cart,
  setCartState,
  setDiscountAmount,
  discountAmount,
  storeDetails,
  deliveryChecked,
  cartSub,
  width,
  setOngoingDelivery,
  setName,
  setPhone,
  setAddress,
  setupdatingOrder,
  setsavedCustomerDetails,
  setBuzzCode,
  setUnitNumber,
  setChangeDue,
  changeDue,
  setCashModal,
  ongoingDelivery,
  updatingOrder,
  setDeliveryChecked,
  setDeliveryModal,
  setCustomersList,
  customers,
  savedCustomerDetails,
  myDeviceDetails,
  name,
  phone,
  address,
  buzzCode,
  unitNumber,
  cartNote,
  setcartNote,
}) => {
  return (
    <View
      style={[
        styles.cartContainer,
        width > 1300 ? { width: "30%" } : { width: "37%" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Text style={styles.myCartTxt}>My Cart</Text>
        {cart.length > 0 ? (
          <Pressable
            style={{
              borderRadius: 10,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1a2951",
            }}
            onPress={() => {
              setCartState([]);
              setDiscountAmount(null);
            }}
          >
            <MaterialIcons name="clear" style={{ color: "white" }} size={30} />
          </Pressable>
        ) : (
          <View style={{ height: 40, width: 40 }} />
        )}
      </View>
      <View style={styles.cartItems}>
        {cart.length > 0 ? (
          <ScrollView
            horizontal={false}
            contentContainerStyle={styles.cartItems_contentContainerStyle}
          >
            {cart?.map((cartItem, index) => (
              <CartItem
                style={styles.cartItem1}
                key={index}
                cartItem={cartItem}
                index={index}
                removeAction={() => {
                  console.log("Removing");
                  const local = structuredClone(cart);
                  local.splice(index, 1);
                  setCartState(local);
                }}
                decreaseAction={() => {
                  const local = structuredClone(cart);
                  local[index].quantity--;
                  setCartState(local);
                }}
                increaseAction={() => {
                  const local = structuredClone(cart);
                  if (local[index].quantity) {
                    local[index].quantity++;
                  } else {
                    local[index].quantity = 2;
                  }
                  setCartState(local);
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/noItemsImg.png")}
              style={{
                width: 200,
                height: "80%",
                resizeMode: "contain",
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.totalsContainer}>
        <View style={styles.topGroupTotalsContainer}>
          <View>
            <TextInput
              placeholder="Write a note..."
              style={{
                height: 80,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              multiline={true}
              value={cartNote}
              onChangeText={(text) => setcartNote(text)}
            />
            <View>
              <UntitledComponent
                amountValue={
                  discountAmount
                    ? discountAmount.includes("%")
                      ? discountAmount
                      : `$${discountAmount}`
                    : "N/A"
                }
                amountLbl="Discount"
                style={styles.discountRow}
              />
              {discountAmount && (
                <Pressable
                  style={{
                    borderRadius: 30,
                    height: 22,
                    width: 22,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    position: "absolute",
                    right: -35,
                  }}
                  onPress={() => {
                    setDiscountAmount(null);
                  }}
                >
                  <MaterialIcons
                    name="clear"
                    style={{ color: "white" }}
                    size={20}
                  />
                </Pressable>
              )}
            </View>
          </View>
          {deliveryChecked && parseFloat(storeDetails.deliveryPrice) && (
            <UntitledComponent
              amountValue={`$${parseFloat(storeDetails.deliveryPrice).toFixed(
                2
              )}`}
              amountLbl="Delivery"
              style={styles.discountRow}
            />
          )}
          <UntitledComponent
            amountValue={
              deliveryChecked &&
              parseFloat(storeDetails.deliveryPrice) &&
              cartSub > 0
                ? `$${(
                    cartSub - parseFloat(storeDetails.deliveryPrice)
                  ).toFixed(2)}`
                : `$${cartSub.toFixed(2)}`
            }
            amountLbl="Subtotal"
            style={styles.subtotalRow}
          />
          <UntitledComponent
            amountValue={`$${(
              cartSub *
              (storeDetails.taxRate >= 0 ? storeDetails.taxRate / 100 : 0.13)
            ).toFixed(2)}`}
            amountLbl={`Tax (${
              storeDetails.taxRate >= 0 ? storeDetails.taxRate : 13
            }%)`}
            style={styles.taxRow}
          />
        </View>
        <View style={styles.totalRowGroup}>
          <View style={styles.totalRow}>
            <Text style={styles.total2}>Total</Text>
            <Text style={styles.totalValue}>
              $
              {cartSub > 0
                ? (
                    parseFloat(
                      deliveryChecked &&
                        parseFloat(storeDetails.deliveryPrice) &&
                        cartSub > 0
                        ? (
                            cartSub - parseFloat(storeDetails.deliveryPrice)
                          ).toFixed(2)
                        : cartSub.toFixed(2)
                    ) +
                    parseFloat(
                      (
                        cartSub *
                        (storeDetails.taxRate >= 0
                          ? parseFloat(storeDetails.taxRate) / 100
                          : 0.13)
                      ).toFixed(2)
                    )
                  ).toFixed(2)
                : "0.00"}
            </Text>
          </View>
        </View>
      </View>
      <CheckoutBtn
        updatingOrder={updatingOrder}
        cart={cart}
        setCartState={setCartState}
        setOngoingDelivery={setOngoingDelivery}
        setName={setName}
        setPhone={setPhone}
        setAddress={setAddress}
        setDeliveryChecked={setDeliveryChecked}
        setupdatingOrder={setupdatingOrder}
        setsavedCustomerDetails={setsavedCustomerDetails}
        setDiscountAmount={setDiscountAmount}
        setBuzzCode={setBuzzCode}
        setUnitNumber={setUnitNumber}
        setCashModal={setCashModal}
        ongoingDelivery={ongoingDelivery}
        deliveryChecked={deliveryChecked}
        storeDetails={storeDetails}
        discountAmount={discountAmount}
        setChangeDue={setChangeDue}
        changeDue={changeDue}
        setDeliveryModal={setDeliveryModal}
        setCustomersList={setCustomersList}
        customers={customers}
        savedCustomerDetails={savedCustomerDetails}
        myDeviceDetails={myDeviceDetails}
        name={name}
        phone={phone}
        address={address}
        buzzCode={buzzCode}
        unitNumber={unitNumber}
        cartNote={cartNote}
        setcartNote={setcartNote}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    width: "28%",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  myCartTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 24,
    width: "90%",
    height: 29,
  },
  cartItems: {
    width: "90%",
    height: "40%",
  },
  cartItems_contentContainerStyle: {
    height: "100%",
    width: "100%",
  },
  cartItem1: {
    width: "100%",
    marginBottom: 10,
  },
  cartItem2: {
    width: "100%",
    marginBottom: 10,
  },
  cartItem3: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem4: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem5: {
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  totalsContainer: {
    width: "90%",
    height: 250,
    backgroundColor: "rgba(238,242,255,1)",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topGroupTotalsContainer: {
    width: 280,
    height: 120,
    justifyContent: "space-between",
  },
  discountRow: {
    height: 18,
    alignSelf: "stretch",
  },
  subtotalRow: {
    height: 18,
    alignSelf: "stretch",
  },
  taxRow: {
    height: 18,
    alignSelf: "stretch",
  },
  totalRowGroup: {
    width: 280,
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalRow: {
    flexDirection: "row",
    height: 18,
    alignSelf: "stretch",
    justifyContent: "space-between",
  },
  total2: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  totalValue: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 18,
  },
  discountCodeBtn: {
    minWidth: 140,
    minHeight: 35,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  discountCode: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
});
