import {
  View,
  useWindowDimensions,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "state/firebaseConfig";
import { useHistory } from "react-router-dom";
import OnlineOrderHome from "./OnlineOrderPages/Home";
import OrderCartMain from "./OnlineOrderPages/Order";
import OnlineOrderHomeCompleted from "./OnlineOrderPages/Completed";
import OnlineOrderHomePickup from "./OnlineOrderPages/Pickup";
import OnlineOrderHomeDelivery from "./OnlineOrderPages/Delivery";
import OnlineOrderHomeCheckout from "./OnlineOrderPages/Checkout";
import {
  OrderDetailsState,
  setProductBuilderState,
  setStoreDetailState,
} from "state/state";
import { ProductProp, UserStoreStateProps } from "types/global";

const OrderPage = () => {
  const history = useHistory();
  const { urlEnding } = useParams();
  const [catalog, setcatalog] = useState<UserStoreStateProps>({
    categories: [],
    products: [],
  });
  const orderDetails = OrderDetailsState.use();
  const page = orderDetails.page;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [data, setdata] = useState<ProductProp[]>([]);
  const screenWidth = useWindowDimensions().width;

  const customSort = (a, b) => {
    // Handle cases where one or both items don't have a rank
    const rankA = a.rank || Number.MAX_SAFE_INTEGER;
    const rankB = b.rank || Number.MAX_SAFE_INTEGER;

    // Compare based on ranks
    return rankA - rankB;
  };

  useEffect(() => {
    db.collection("public")
      .where("urlEnding", "==", urlEnding.toLowerCase())
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No existing online store");
          //send them to a 404 page
          history.push("/404");
        }

        if (!querySnapshot.docs[0].data().onlineStoreActive) {
          console.log("Store is not active");
          //send them to a 404 page
          history.push("/404");
        }

        const products: ProductProp[] = [];

        setProductBuilderState({
          product: null,
          itemIndex: null,
          imageUrl: "",
          isOnlineOrder: true,
          isOpen: false,
        });

        setStoreDetailState({
          ...querySnapshot.docs[0].data().storeDetails,
          docID: querySnapshot.docs[0].id,
          stripePublicKey: querySnapshot.docs[0].data().stripePublicKey,
        });

        querySnapshot.docs[0].ref
          .collection("products")
          .get()
          .then((docs) => {
            if (!docs.empty) {
              docs.forEach((element) => {
                const productData = element.data();
                products.push({
                  ...productData,
                  name: productData.name,
                  price: productData.price,
                  description: productData.description,
                  options: productData.options,
                  id: productData.id,
                });
              });
              // Move logging and operations that depend on 'products' being populated inside the .then() block
              if (products.length > 0) {
                setdata([]);
                products.sort(customSort).map((product, index) => {
                  setdata((prev) => {
                    const productsWithCategory: ProductProp[] = [];

                    prev.forEach((item) => {
                      if (item.category === product.category) {
                        productsWithCategory.push(item);
                      }
                    });

                    if (productsWithCategory.length > 0) {
                      const indexOfLastItem = prev.indexOf(
                        productsWithCategory[productsWithCategory.length - 1]
                      );
                      prev.splice(indexOfLastItem + 1, 0, {
                        ...product,
                        index: index + 1,
                      });
                      return prev;
                    }

                    return [
                      ...prev,
                      {
                        ...product,
                        index: index + 1,
                      },
                    ];
                  });
                });
              }
            }
          })
          .catch((e) => console.log("Error has occurred with db: ", e));

        setcatalog({
          categories: querySnapshot.docs[0].data().categories,
          products: products,
          docID: querySnapshot.docs[0].id,
        });

        fadeOut();
      })
      .catch((e) => {
        console.log("Error has occurred");
      });
  }, []);

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      const loader = document.getElementById("loader");
      if (!loader) return;
      loader.style.display = "none";
    });
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(30,30,30,1)",
      }}
    >
      <View style={styles.backgroundContainer}>
        <View style={styles.plantImgContainer}>
          <Image
            source={require("./OnlineOrderPages/assets/images/image_JqcD..png")}
            resizeMode="contain"
            style={[styles.plantImg, screenWidth < 1000 && { width: 100 }]}
          />
          <View style={styles.wingImgContainer}>
            <Image
              source={
                screenWidth > 1000
                  ? require("./OnlineOrderPages/assets/images/image_BSgk..png")
                  : require("./OnlineOrderPages/assets/images/sidewings.png")
              }
              resizeMode="contain"
              style={[
                styles.wingImg,
                screenWidth < 1000 && {
                  width: 200,
                  position: "absolute",
                  right: 0,
                  bottom: "15%",
                },
              ]}
            />
            <View style={styles.pizzaImgContainer}>
              <Image
                source={require("./OnlineOrderPages/assets/images/image_DrUG..png")}
                resizeMode="contain"
                style={[
                  styles.pizzaImg,
                  screenWidth < 1000 && {
                    height: 350,
                    width: 200,
                    right: 0,
                    top: 0,
                    position: "absolute",
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          display: page === 4 ? undefined : "none",
        }}
      >
        <OrderCartMain
          catalog={{ categories: catalog.categories, products: data }}
        />
      </View>
      {(page === 1 || page === 2 || page === 3 || page === 5 || page === 6) && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
          }}
        >
          {page === 2 && <OnlineOrderHomePickup />}
          {page === 3 && <OnlineOrderHomeDelivery />}
          {page === 5 && <OnlineOrderHomeCheckout />}
          {page === 6 && <OnlineOrderHomeCompleted />}
          {page === 1 && <OnlineOrderHome />}
        </View>
      )}
      <div
        id="loader"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%", // Viewport Height
          width: "100%", // Viewport Width
          alignItems: "center", // This will center the content vertically
          justifyContent: "center", // This will center the content horizontally
        }}
      >
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            position: "absolute",
            opacity: fadeAnim,
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            source={require("assets/loading.gif")}
            style={{ width: 450, height: 450, resizeMode: "contain" }}
          />
        </Animated.View>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(30,30,30,1)",
  },
  backgroundContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
  },
  plantImgContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  plantImg: {
    height: 520,
    width: 200,
  },
  wingImgContainer: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wingImg: {
    height: 200,
    width: "50%",
  },
  pizzaImgContainer: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  pizzaImg: {
    height: 1000,
    width: 401,
  },
});

export default OrderPage;
