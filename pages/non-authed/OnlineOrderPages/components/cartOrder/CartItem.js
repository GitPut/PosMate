import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

function CartItem(props) {
  return (
    <View style={[styles.container, props?.style]}>
      <View style={styles.topRowWithImgContainer}>
        <Image
          source={require("../../assets/images/image_t93e..png")}
          resizeMode="contain"
          style={styles.cartItemImg}
        ></Image>
        <View style={styles.group}>
          <View style={styles.topRowTxt}>
            <Text style={styles.cartItemQuantity}>1</Text>
            <View style={styles.xPlusNameGroup}>
              <Text style={styles.txtX}>x</Text>
              <Text style={styles.veggiePizza}>Veggie Pizza</Text>
            </View>
            <Text style={styles.cartItemPrice}>$10</Text>
          </View>
          <View style={styles.bottomBtnRow}>
            <TouchableOpacity style={styles.cartItemIncreaseBtn}>
              <Entypo name="plus" style={styles.plusIcon}></Entypo>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartItemDecreaseBtn}>
              <Entypo name="minus" style={styles.minusIcon}></Entypo>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartItemEditBtn}>
              <MaterialCommunityIcons
                name="pencil"
                style={styles.pencilIcon}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(238,242,255,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  topRowWithImgContainer: {
    width: 280,
    height: 61,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cartItemImg: {
    height: 61,
    width: 65,
  },
  group: {
    width: 207,
    height: 33,
    alignItems: "flex-end",
  },
  topRowTxt: {
    width: 206,
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },
  cartItemQuantity: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  xPlusNameGroup: {
    width: 138,
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  txtX: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 20,
    marginRight: 3,
  },
  veggiePizza: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
  },
  cartItemPrice: {
    fontWeight: "700",
    color: "#00c93b",
    fontSize: 18,
  },
  bottomBtnRow: {
    width: 77,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cartItemIncreaseBtn: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  plusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
  },
  cartItemDecreaseBtn: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  minusIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
  },
  cartItemEditBtn: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 9,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  pencilIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 12,
  },
});

export default CartItem;
