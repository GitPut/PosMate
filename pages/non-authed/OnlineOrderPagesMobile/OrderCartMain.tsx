import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  ScrollView,
} from "react-native";
import CategoryBtn from "./components/cartOrder/CategoryBtn";
import ItemContainer from "./components/cartOrder/ItemContainerMobile";
import CartItem from "./components/cartOrder/CartItem";
import UntitledComponent from "./components/cartOrder/UntitledComponent";
import { Entypo, Feather } from "@expo/vector-icons";
import { cartState, setCartState } from "state/state";
import { storage } from "state/firebaseConfig";
import ProductBuilderModal from "./components/ProductBuilderModal/ProductBuilderModalMobile";

function OrderCartMain({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  catalog,
}) {
  const [section, setsection] = useState(
    catalog.categories.length > 0 ? catalog.categories[0] : ""
  );
  const [cartSub, setCartSub] = useState(0);
  const cart = cartState.use();
  // const [productImages, setproductImages] = useState([]);

  // useEffect(() => {
  //   catalog.products.map((product) => {
  //     if (product.hasImage) {
  //       storage
  //         .ref(storeDetails.docID + "/images/" + product.id)
  //         .getDownloadURL()
  //         .then((url) => {
  //           setproductImages((prev) => [...prev, { id: product.id, url: url }]);
  //           console.log("Image url: ", url);
  //         });
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (cart.length > 0) {
      let newVal = 0;
      for (let i = 0; i < cart.length; i++) {
        try {
          if (cart[i].quantity > 1) {
            newVal += parseFloat(cart[i].price) * cart[i].quantity;
            // console.log("Cart item quantity ", cart[i].quantity);
          } else {
            newVal += parseFloat(cart[i].price);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (orderDetails.delivery) {
        setCartSub(newVal + parseFloat(storeDetails.deliveryPrice));
      } else {
        setCartSub(newVal);
      }
    } else {
      setCartSub(0);
    }
  }, [cart]);

  useEffect(() => {
    catalog.products.map((product, index) => {
      if (product.category === section) {
        document.getElementById(product.id).style.display = "flex";
      } else {
        document.getElementById(product.id).style.display = "none";
      }
    });
  }, [section]);

  return (
    <View style={styles.container}>
      <View style={styles.leftMenuBarContainer}>
        <Pressable style={styles.menuBtn}>
          <Entypo name="menu" style={styles.menuIcon}></Entypo>
        </Pressable>
        <Pressable onPress={() => setpage(1)}>
          <Feather name="log-out" style={styles.icon}></Feather>
        </Pressable>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.bannerContainer}>
          <Image
            source={require("./assets/images/image_onW3..png")}
            resizeMode="contain"
            style={styles.logo}
          ></Image>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.lblTxt}>Menu Category</Text>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              {catalog.categories?.map((category, index) => {
                const listOfProductsInCategoryWithImages =
                  catalog.products.filter(
                    (product) =>
                      product.category === category && product.hasImage
                  );

                if (
                  catalog.products.filter(
                    (x) => x.category === category && x.hasImage
                  ).length > 0
                ) {
                  return (
                    <CategoryBtn
                      key={index}
                      category={category}
                      onPress={() => {
                        setsection(category);
                      }}
                      isSelected={section === category}
                      style={styles.activeCategoryBtn}
                      imageUrl={
                        catalog.products[
                          catalog.products.findIndex(
                            (x) => x.category === category && x.hasImage
                          )
                        ]?.imageUrl
                      }
                      // imageUrl={
                      //   productImages[
                      //     productImages.findIndex(
                      //       (x) =>
                      //         x.id === listOfProductsInCategoryWithImages[0].id
                      //     )
                      //   ]?.url
                      // }
                    />
                  );
                } else {
                  return (
                    <CategoryBtn
                      key={index}
                      category={category}
                      onPress={() => {
                        setsection(category);
                      }}
                      isSelected={section === category}
                      style={styles.categoryBtn}
                      imageUrl={null}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.scrollAreaProducts}>
          <ScrollView
            contentContainerStyle={
              styles.scrollAreaProducts_contentContainerStyle
            }
          >
            {catalog.products.map((product, index) => (
              <ItemContainer
                product={product}
                productIndex={index}
                key={index}
                userUid={catalog.docID}
                style={styles.itemContainer}
                // imageUrl={
                //   product.hasImage &&
                //   productImages[
                //     productImages.findIndex((x) => x.id === product.id)
                //   ]?.url
                // }
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.cartContainer}>
        <Text style={styles.myCartTxt}>My Cart</Text>
        {cart.length > 0 ? (
          <View style={styles.cartItems}>
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
          </View>
        ) : (
          <Image
            source={require("./assets/images/noItemsImg.png")}
            style={{ width: 200, height: "35%", resizeMode: "contain" }}
          />
        )}
        <View style={styles.totalsContainer}>
          <View style={styles.topGroupTotalsContainer}>
            <UntitledComponent
              amountValue="N/A"
              amountLbl="Discount"
              style={styles.discountRow}
            />
            {orderDetails.delivery &&
              parseFloat(storeDetails.deliveryPrice) && (
                <UntitledComponent
                  amountValue={`$${parseFloat(
                    storeDetails.deliveryPrice
                  ).toFixed(2)}`}
                  amountLbl="Delivery"
                  style={styles.discountRow}
                />
              )}
            <UntitledComponent
              amountValue={
                orderDetails.delivery &&
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
                (storeDetails.taxRate ? storeDetails.taxRate / 100 : 0.13)
              ).toFixed(2)}`}
              amountLbl="Tax"
              style={styles.taxRow}
            />
          </View>
          <View style={styles.totalRowGroup}>
            <View style={styles.totalRow}>
              <Text style={styles.total2}>Total</Text>
              <Text style={styles.totalValue}>
                $
                {(
                  Math.ceil(
                    cartSub *
                      (storeDetails.taxRate
                        ? 1 + storeDetails.taxRate / 100
                        : 1.13) *
                      10
                  ) / 10
                ).toFixed(2)}
              </Text>
            </View>
            <Pressable style={styles.discountCodeBtn}>
              <Text style={styles.discountCode}>Discount Code</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles.checkoutBtn}
          disabled={cart.length < 1}
          onPress={() => {
            const today = new Date();
            const transNum = Math.random().toString(36).substr(2, 9);

            if (orderDetails.delivery) {
              setorderDetails((prev) => ({
                date: today,
                transNum: transNum,
                total: (
                  cartSub *
                  (storeDetails.taxRate ? 1 + storeDetails.taxRate / 100 : 1.13)
                ).toFixed(2),
                method: "deliveryOrder",
                online: true,
                cart: cart,
                customer: {
                  name: prev.customer.name,
                  phone: prev.customer.phone,
                  address: prev.customer.address,
                  email: prev.customer.email,
                },
                address: prev.address,
              }));
            } else {
              setorderDetails((prev) => ({
                date: today,
                transNum: transNum,
                total: (
                  cartSub *
                  (storeDetails.taxRate ? 1 + storeDetails.taxRate / 100 : 1.13)
                ).toFixed(2),
                method: "pickupOrder",
                online: true,
                cart: cart,
                customer: {
                  name: prev.customer.name,
                  phone: prev.customer.phone,
                  email: prev.customer.email,
                  address: null,
                },
              }));
            }
            setpage(3);
          }}
        >
          <Text style={styles.checkoutLbl}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(238,242,255,1)",
    flexDirection: "row",
    alignItems: "center",
  },
  leftMenuBarContainer: {
    width: "5%",
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignSelf: "stretch",
  },
  menuBtn: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(29,41,78,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  menuIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 30,
  },
  menuContainer: {
    width: "67%",
    alignSelf: "stretch",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bannerContainer: {
    width: "88%",
    height: 150,
    backgroundColor: "rgba(29,41,78,1)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  logo: {
    height: 75,
    width: 250,
    margin: 10,
  },
  categoryContainer: {
    width: "88%",
    height: 178,
    justifyContent: "space-between",
  },
  lblTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 19,
    marginBottom: 10,
  },
  scrollArea: {
    height: 156,
    alignSelf: "stretch",
  },
  scrollArea_contentContainerStyle: {
    width: "88%",
    height: 156,
  },
  activeCategoryBtn: {
    width: 125,
    marginRight: 15,
    height: 150,
  },
  categoryBtn: {
    width: 125,
    marginRight: 18,
    height: 150,
  },
  scrollAreaProducts: {
    width: "88%",
    height: "45%",
    justifyContent: "center",
  },
  scrollAreaProducts_contentContainerStyle: {
    flexWrap: "wrap",
    justifyContent: "space-between", // or 'space-between' if you want equal spacing
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemContainer: {
    height: 160,
    width: 290, // Ensure this width accounts for any margins or padding
    marginBottom: 30,
    // marginRight: 20, // You may need to adjust this based on the number of items per row
  },
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
    height: 86,
    width: "100%",
    marginBottom: 10,
  },
  cartItem2: {
    height: 86,
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
    height: 85,
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
    height: 66,
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
    minWidth: 120,
    minHeight: 32,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  discountCode: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  checkoutBtn: {
    width: 170,
    height: 48,
    backgroundColor: "#1a2951",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
});

export default OrderCartMain;
