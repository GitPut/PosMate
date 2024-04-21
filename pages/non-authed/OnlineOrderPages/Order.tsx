import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import {
  OrderDetailsState,
  ProductBuilderState,
  cartState,
  setOrderDetailsState,
  storeDetailState,
} from "state/state";
import Modal from "react-native-modal-web";
import ProductBuilderModal from "components/MainPosPage/components/ProductBuilderModal/ProductBuilderModal";
import ProductsSection from "components/MainPosPage/components/ProductsSection";
import CategorySection from "components/MainPosPage/components/CategorySection";
import Cart from "components/MainPosPage/components/Cart";
import { posHomeState, updatePosHomeState } from "state/posHomeState";
import CartMobile from "components/MainPosPage/phoneComponents/CartMobile";
import { UserStoreStateProps } from "types/global";

function OrderCartMain({ catalog }: { catalog: UserStoreStateProps }) {
  const orderDetails = OrderDetailsState.use();
  const storeDetails = storeDetailState.use();
  const page = orderDetails.page;
  const [cartSub, setCartSub] = useState(0);
  const cart = cartState.use();
  const [cartOpen, setcartOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  const ProductBuilderProps = ProductBuilderState.use();
  const { section } = posHomeState.use();

  useEffect(() => {
    if (page === 4) {
      if (catalog.categories.length > 0) {
        updatePosHomeState({ section: catalog.categories[0] });
      }
    }
  }, [page]);

  useEffect(() => {
    if (cart.length > 0) {
      let newVal = 0;
      for (let i = 0; i < cart.length; i++) {
        try {
          if (cart[i].quantity ?? 0 > 1) {
            newVal +=
              parseFloat(cart[i].price) * parseFloat(cart[i].quantity ?? "0");
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
    catalog.products.map((product) => {
      const element = document.getElementById(product.id);
      if (!element) return;
      if (product.category === section) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
    });
  }, [section]);

  return (
    <View style={styles.container}>
      {width > 1250 && (
        <View style={styles.leftMenuBarContainer}>
          <Pressable style={styles.menuBtn}>
            <Entypo name="menu" style={styles.menuIcon}></Entypo>
          </Pressable>
          <Pressable onPress={() => setOrderDetailsState({ page: 1 })}>
            <Feather name="log-out" style={styles.icon}></Feather>
          </Pressable>
        </View>
      )}
      <View
        style={[
          styles.menuContainer,
          width > 1300 ? { width: "65%" } : { width: "58%" },
          width < 1000 && { width: "100%" },
        ]}
      >
        {width < 1000 && (
          <View
            style={{
              flexDirection: "row",
              width: "88%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => {
                setOrderDetailsState({ page: 1 });
              }}
              style={{
                backgroundColor: "#1D294E",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                width: 34,
                height: 34,
              }}
            >
              <Feather name="log-out" style={{ color: "white" }} size={20} />
            </Pressable>
            <Pressable
              onPress={() => {
                setcartOpen(true);
              }}
              style={{
                backgroundColor: "#1D294E",
                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
                width: 58,
                height: 34,
                flexDirection: "row",
                padding: 5,
              }}
            >
              <Feather
                name="shopping-cart"
                style={{ color: "white" }}
                size={20}
              />
              <Text style={{ color: "white", fontSize: 20 }}>
                {cart.length}
              </Text>
            </Pressable>
          </View>
        )}
        <CategorySection catalog={catalog} section={section} />
        <ProductsSection catalog={catalog} />
      </View>
      {width > 1000 ? (
        <Cart />
      ) : (
        <CartMobile
          cartOpen={cartOpen}
          setcartOpen={setcartOpen}
          cartSub={cartSub}
        />
      )}
      <Modal
        isVisible={ProductBuilderProps.isOpen ? true : false}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0}
        style={{
          margin: 0,
        }}
      >
        <View
          style={{
            height: height,
            width: width,
            flexDirection: "row",
          }}
        >
          <View
            style={[
              width > 1400
                ? {
                    height: "100%",
                    width: "70%",
                    borderTopRightRadius: 3,
                  }
                : {
                    height: "100%",
                    width: "100%",
                    borderTopRightRadius: 3,
                  },
            ]}
          >
            {ProductBuilderProps.product && <ProductBuilderModal />}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
    height: "56%",
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
    width: "100%",
    marginBottom: 10,
  },
  cartItem2: {
    width: "100%",
    marginBottom: 10,
  },
  cartItem3: {
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
