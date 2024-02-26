import {
  View,
  useWindowDimensions,
  Image,
  Animated,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "state/firebaseConfig";
import { useHistory } from "react-router-dom";
import OnlineOrderHome from "./OnlineOrderPages/OnlineOrderHome";
import OrderCartMain from "./OnlineOrderPages/OrderCartMain";
import OnlineOrderHomeCompleted from "./OnlineOrderPages/OnlineOrderHomeCompleted";
import OnlineOrderHomePickup from "./OnlineOrderPages/OnlineOrderHomePickup";
import OnlineOrderHomeDelivery from "./OnlineOrderPages/OnlineOrderHomeDelivery";
import OnlineOrderHomeCheckout from "./OnlineOrderPages/OnlineOrderHomeCheckout";
import ProductBuilderModalMobile from "./OnlineOrderPagesMobile/components/ProductBuilderModal/ProductBuilderModalMobile";

const OrderPage = () => {
  const history = useHistory();
  const { urlEnding } = useParams();
  const [storeDetails, setstoreDetails] = useState({});
  const [catalog, setcatalog] = useState({
    categories: [],
    products: [],
  });
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const [orderDetails, setorderDetails] = useState({
    delivery: null,
    address: null,
    customer: {
      name: "",
      phoneNumber: "",
      email: "",
      address: null,
    },
  });
  const [page, setpage] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [enterDetailsSection, setenterDetailsSection] = useState(null);

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

        const products = [];

        setstoreDetails({
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
                products.push(element.data());
              });
              // Move logging and operations that depend on 'products' being populated inside the .then() block
              if (products.length > 0) {
                setdata([]);
                const newData = [];
                products.sort(customSort).map((product, index) => {
                  setdata((prev) => {
                    const productsWithCategory = prev.filter(
                      (item) => item.category === product.category
                    );
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
      });
  }, []);

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => (document.getElementById("loader").style.display = "none"));
  };

  const [data, setdata] = useState([]);
  const [showProduct, setshowProduct] = useState(null);
  const xPosProduct = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;

  const fadeInProduct = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(xPosProduct, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(shadowOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fadeOutProduct = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPosProduct, {
      toValue: -1000,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setshowProduct(null));
  };

  useEffect(() => {
    if (showProduct) {
      fadeInProduct();
    }
  }, [showProduct]);

  const screenWidth = useWindowDimensions().width;

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
          display: page === 4 ? null : "none",
        }}
      >
        <OrderCartMain
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
          catalog={{ categories: catalog.categories, products: data }}
          setshowProduct={setshowProduct}
          page={page}
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
          {page === 2 && (
            <OnlineOrderHomePickup
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              page={page}
            />
          )}
          {page === 3 && (
            <OnlineOrderHomeDelivery
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              page={page}
            />
          )}
          {/* {page === 4 && (
        <OrderCartMain
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
          catalog={{ categories: catalog.categories, products: data }}
          setshowProduct={setshowProduct}
        />
      )} */}
          {page === 5 && (
            <OnlineOrderHomeCheckout
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              page={page}
            />
          )}
          {page === 6 && (
            <OnlineOrderHomeCompleted
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              page={page}
            />
          )}
          {page === 1 && (
            <OnlineOrderHome
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              page={page}
            />
          )}
        </View>
      )}
      {showProduct && (
        <div
          style={{
            position: "absolute",
            zIndex: 25,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: 0,
              left: xPosProduct,
              zIndex: 0,
            }}
          >
            <View
              style={[
                width > 1250
                  ? {
                      height: "100%",
                      width: "72%",
                      borderTopRightRadius: 3,
                    }
                  : {
                      height: "100%",
                      width: "100%",
                      borderTopRightRadius: 3,
                    },
              ]}
            >
              <ProductBuilderModalMobile
                product={showProduct}
                goBack={() => fadeOutProduct()}
                imageUrl={showProduct.imageUrl}
              />
            </View>
          </Animated.View>
        </div>
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
