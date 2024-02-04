import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Feather, AntDesign } from "@expo/vector-icons";

const CartItem = ({
  cartItem,
  index,
  isPrev,
  removeAction,
  editAction,
  decreaseAction,
  increaseAction,
}) => {
  const [isOpen, setisOpen] = useState(false);

  if (isOpen) {
    return (
      <TouchableOpacity
        onPress={() => setisOpen(false)}
        style={styles.openItemContainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.closedLeftContainer}>
            <Text style={styles.productNameTxt}>{cartItem.name}</Text>
            <Text style={styles.productPriceTxt}>
              ${parseFloat(cartItem.price).toFixed(2)}
            </Text>
          </View>
          <View style={styles.closedRightContainer}>
            <TouchableOpacity
              onPress={() => {
                if (cartItem.quantity < 2 || !cartItem.quantity) {
                  removeAction();
                } else {
                  decreaseAction();
                }
              }}
            >
              <Entypo name="squared-minus" style={styles.openCloseIcon} />
            </TouchableOpacity>
            <Text style={styles.productIndexTxt}>
              {cartItem.quantity ? cartItem.quantity : 1}
            </Text>
            <TouchableOpacity onPress={increaseAction}>
              <Entypo name="squared-plus" style={styles.openCloseIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.optionsContainer}>
            {cartItem.options &&
              cartItem.options.map((option) => (
                <Text style={styles.optionTxt}>{option}</Text>
              ))}
            {cartItem.description && (
              <Text style={styles.optionTxt}>
                Description: {cartItem.description}
              </Text>
            )}
            {cartItem.extraDetails && (
              <Text style={styles.optionTxt}>
                Written Note: {cartItem.extraDetails}
              </Text>
            )}
          </View>
          {!isPrev && (
            <TouchableOpacity style={styles.editContainer} onPress={editAction}>
              <Feather name="edit" style={styles.editIcon} />
              <Text style={styles.editTxt}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => cartItem.options.length > 0 && setisOpen(true)}
        style={styles.closedItemContainer}
        activeOpacity={0.8}
      >
        <View style={styles.closedLeftContainer}>
          <Text style={styles.productNameTxt}>{cartItem.name}</Text>
          <Text style={styles.productPriceTxt}>
            ${parseFloat(cartItem.price).toFixed(2)}
          </Text>
        </View>
        {!cartItem.quantityNotChangable ? (
          <View style={styles.closedRightContainer}>
            <TouchableOpacity
              onPress={() => {
                if (cartItem.quantity < 2 || !cartItem.quantity) {
                  removeAction();
                } else {
                  decreaseAction();
                }
              }}
            >
              <Entypo name="squared-minus" style={styles.openCloseIcon} />
            </TouchableOpacity>
            <Text style={styles.productIndexTxt}>
              {cartItem.quantity ? cartItem.quantity : 1}
            </Text>
            <TouchableOpacity onPress={increaseAction}>
              <Entypo name="squared-plus" style={styles.openCloseIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              removeAction();
            }}
          >
            <AntDesign
              name="closesquare"
              style={{ color: "#b1b1b1", fontSize: 30 }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  halfRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  toppingsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 25,
  },
  touchable: {
    margin: 25,
    width: 300,
  },
  modalContainer: {
    padding: 50,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.57,
    shadowRadius: 10,
    width: "35%",
  },
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 25,
    marginBottom: 25,
  },
  nameGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  personIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginRight: 10,
  },
  customerNameTxt: {
    fontFamily: "archivo-500",
    color: "#121212",
    fontSize: 15,
  },
  moreInfoIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  innerTxt: {
    fontSize: 13,
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: "600",
  },
  empty: {
    fontFamily: "archivo-600",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    opacity: 0.44,
  },
  fillTheCart: {
    fontFamily: "archivo-500",
    color: "rgba(74,74,74,1)",
    fontSize: 20,
  },
  openItemContainer: {
    backgroundColor: "#f5f5f5",
    borderColor: "#64c74c",
    borderLeftWidth: 2,
    width: "100%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  optionsContainer: {
    justifyContent: "space-between",
    margin: 13,
    marginLeft: 19,
  },
  optionTxt: {
    fontFamily: "archivo-500",
    color: "grey",
    marginTop: 5,
  },
  editContainer: {
    width: 61,
    height: 38,
    flexDirection: "row",
    margin: 13,
    marginLeft: 19,
    alignItems: "center",
    justifyContent: "space-between",
  },
  editIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 25,
  },
  editTxt: {
    fontFamily: "archivo-600",
    color: "rgba(74,74,74,1)",
  },
  closedItemContainer: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closedLeftContainer: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  openCloseIcon: {
    color: "#b1b1b1",
    fontSize: 30,
    marginRight: 15,
  },
  productIndexTxt: {
    fontFamily: "archivo-600",
    color: "#75767e",
    fontSize: 16,
    marginRight: 15,
  },
  productNameTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
    marginRight: 50,
  },
  closedRightContainer: {
    flexDirection: "row",
    width: "25%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPriceTxt: {
    fontFamily: "archivo-600",
    color: "#63646e",
    fontSize: 16,
  },
  productRemoveIcon: {
    color: "#9f9f9e",
    fontSize: 27,
  },
});

export default CartItem;
