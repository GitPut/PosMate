import {
  Modal,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "state/firebaseConfig";
import TemplateImage from "assets/template-background.jpg";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useHistory } from "react-router-dom";
import Logo from "assets/dpos-logo.png";
import CartItemEditable from "components/cart/CartItemEditable";
import ProductListing from "components/product/ProductListing";
import { addCartState, cartState, setCartState } from "state/state";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OnlineOrderHome from "./OnlineOrderPages/OnlineOrderHome";
import OrderCartMain from "./OnlineOrderPages/OrderCartMain";

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

  return (
    <View style={{ flex: 1 }}>
      {(page === 1 || page === 3 || page === 4) && (
          <OnlineOrderHome
            storeDetails={storeDetails}
            setorderDetails={setorderDetails}
            orderDetails={orderDetails}
            setpage={setpage}
            page={page}
          />
      )}
      {page === 2 && (
        <OrderCartMain
          storeDetails={storeDetails}
          setorderDetails={setorderDetails}
          orderDetails={orderDetails}
          setpage={setpage}
          catalog={{ categories: catalog.categories, products: data }}
        />
      )}
      <div
        id="loader"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh", // Viewport Height
          width: "100vw", // Viewport Width
          display: "flex",
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

export default OrderPage;