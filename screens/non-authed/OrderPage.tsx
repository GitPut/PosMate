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
import CartItemEditable from "components/CartItemEditable";
import ProductListing from "components/ProductListing";
import { addCartState, cartState, setCartState } from "state/state";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

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
  });
  const [page, setpage] = useState(1);

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
            }
          })
          .catch((e) => console.log("Error has occured with db: ", e));

        setcatalog({
          categories: querySnapshot.docs[0].data().categories,
          products: products,
          docID: querySnapshot.docs[0].id,
        });
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={
          storeDetails.bannerImage ? storeDetails.bannerImage : TemplateImage
        }
        style={{
          height: height,
          width: width,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {page === 1 && (
            <Page1
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
            />
          )}
          {page === 2 && (
            <Page2
              storeDetails={storeDetails}
              setorderDetails={setorderDetails}
              orderDetails={orderDetails}
              setpage={setpage}
              catalog={catalog}
            />
          )}
          {page === 3 && storeDetails && (
            <Elements stripe={loadStripe(storeDetails.stripePublicKey)}>
              <Page3
                storeDetails={storeDetails}
                setorderDetails={setorderDetails}
                orderDetails={orderDetails}
                setpage={setpage}
                catalog={catalog}
              />
            </Elements>
          )}
          {page === 4 && <Page4 />}
        </View>
      </ImageBackground>
    </View>
  );
};

const Page1 = ({ storeDetails, setorderDetails, orderDetails, setpage }) => {
  return (
    <View>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Welcome to {storeDetails.name}</Text>
      </View>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          Would you like to order for Delivery or Pickup
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => setorderDetails({ ...orderDetails, delivery: true })}
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255, 0.7)",
            borderWidth: 1,
            marginBottom: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setorderDetails({ ...orderDetails, delivery: false, address: null })
          }
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255, 0.7)",
            borderWidth: 1,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Pickup</Text>
        </TouchableOpacity>
      </View>
      {orderDetails.delivery && (
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255, 0.7)",
            borderWidth: 1,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16 }}>Please enter delivery address</Text>
          <GooglePlacesAutocomplete
            apiOptions={{
              region: "CA",
            }}
            debounce={800}
            apiKey={GOOGLE_API_KEY}
            // onSelect={handleAddress}
            selectProps={{
              address: orderDetails.address,
              onChange: (address) =>
                setorderDetails({ ...orderDetails, address }),
              defaultValue: orderDetails.address,
              menuPortalTarget: document.body,
              styles: {
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              },
            }}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <div>
                {suggestions.map((suggestion) => (
                  <div
                    className="suggestion"
                    onClick={(event) => {
                      onSelectSuggestion(suggestion, event);
                    }}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => setpage(2)}
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderWidth: 1,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const Page2 = ({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  catalog,
}) => {
  const { height, width } = useWindowDimensions();
  const [section, setsection] = useState(null);
  const [cartSub, setCartSub] = useState(0);
  const [total, setTotal] = useState(0);
  const cart = cartState.use();

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

  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ width: "70%", height: "100%" }}>
          <View style={styles({ height, width }).container}>
            <View
              style={{
                backgroundColor: "rgba(31,35,48,1)",
                width: "23%",
                height: "100%",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Image
                source={Logo}
                style={{ width: 200, height: 160, resizeMode: "contain" }}
              />
              <ScrollView
                contentContainerStyle={{
                  height: "90%",
                  alignItems: "center",
                }}
              >
                {catalog.categories?.map((category, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setsection(category);
                      }}
                      style={{ padding: 10, marginBottom: 20 }}
                    >
                      <Text
                        style={[
                          (section === null &&
                            index === 0 && {
                              color: "white",
                              fontWeight: "700",
                              borderBottomWidth: 1,
                              borderBottomColor: "white",
                            }) ||
                            (section === category && {
                              color: "white",
                              fontWeight: "700",
                              borderBottomWidth: 1,
                              borderBottomColor: "white",
                            }),
                          { fontSize: 16, color: "white" },
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            {catalog.categories?.map((category, index) => {
              let visible;

              if (section === null && index === 0) {
                visible = true;
              } else if (section === category) {
                visible = true;
              } else {
                visible = false;
              }

              return (
                <MenuScreenInnerBlockLocal
                  key={index}
                  category={category}
                  height={height}
                  visible={visible}
                  catalog={catalog}
                />
              );
            })}
          </View>
        </View>
        {/* Cart */}
        <View style={styles({ height, width }).containerCart}>
          <View style={styles({ height, width }).cartHeader}>
            <Text
              style={{
                fontFamily: "archivo-600",
                color: "rgba(255,255,255,1)",
                fontSize: 25,
              }}
            >
              Order
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles({ height, width }).contentContainer}
            style={{ marginBottom: 10 }}
          >
            <View>
              {cart?.length > 0 ? (
                cart?.map((cartItem, index) => (
                  <CartItemEditable
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
                ))
              ) : (
                <View
                  style={{
                    height: height * 0.7,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles({ height, width }).empty}>Empty...</Text>
                  <Text style={styles({ height, width }).fillTheCart}>
                    Fill the Cart!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
            }}
          >
            {orderDetails.delivery &&
              parseFloat(storeDetails.deliveryPrice) && (
                <View
                  style={{
                    alignSelf: "stretch",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                    paddingTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "archivo-600",
                      color: "rgba(74,74,74,1)",
                      fontSize: 16,
                      alignSelf: "flex-start",
                    }}
                  >
                    Delivery
                  </Text>
                  <Text
                    style={[
                      {
                        fontFamily: "archivo-600",
                        color: "rgba(255,255,255,1)",
                        fontSize: 20,
                        alignSelf: "flex-start",
                      },
                      cartSub === 0 && { opacity: 0.5 },
                    ]}
                  >
                    ${parseFloat(storeDetails.deliveryPrice).toFixed(2)}
                  </Text>
                </View>
              )}
            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "archivo-600",
                  color: "rgba(74,74,74,1)",
                  fontSize: 16,
                  alignSelf: "flex-start",
                }}
              >
                Sub Total
              </Text>
              <Text
                style={[
                  {
                    fontFamily: "archivo-600",
                    color: "rgba(255,255,255,1)",
                    fontSize: 20,
                    alignSelf: "flex-start",
                  },
                  cartSub === 0 && { opacity: 0.5 },
                ]}
              >
                ${cartSub.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "archivo-600",
                  color: "rgba(74,74,74,1)",
                  fontSize: 16,
                  alignSelf: "flex-start",
                }}
              >
                Tax
              </Text>
              <Text
                style={[
                  {
                    fontFamily: "archivo-600",
                    color: "rgba(255,255,255,1)",
                    fontSize: 20,
                    alignSelf: "flex-start",
                  },
                  cartSub === 0 && { opacity: 0.5 },
                ]}
              >
                $
                {(
                  cartSub *
                  (storeDetails.taxRate ? storeDetails.taxRate / 100 : 0.13)
                ).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "archivo-600",
                  color: "rgba(74,74,74,1)",
                  fontSize: 16,
                  alignSelf: "flex-start",
                }}
              >
                Total
              </Text>
              <Text
                style={[
                  {
                    fontFamily: "archivo-600",
                    color: "rgba(255,255,255,1)",
                    fontSize: 20,
                    alignSelf: "flex-start",
                  },
                  cartSub === 0 && { opacity: 0.5 },
                ]}
              >
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
            <TouchableOpacity
              style={[
                styles({ height, width }).bigButton,
                cartSub === 0 && { opacity: 0.5 },
              ]}
              disabled={cart.length < 1}
              onPress={() => {
                const today = new Date();
                const transNum = Math.random().toString(36).substr(2, 9);

                if (orderDetails.delivery) {
                  setorderDetails({
                    date: today,
                    transNum: transNum,
                    total: (
                      cartSub *
                      (storeDetails.taxRate
                        ? 1 + storeDetails.taxRate / 100
                        : 1.13)
                    ).toFixed(2),
                    method: "deliveryOrder",
                    online: true,
                    cart: cart,
                    customer: {
                      name: orderDetails.name,
                      phone: orderDetails.phone,
                      address: orderDetails.address,
                    },
                  });
                } else {
                  setorderDetails({
                    date: today,
                    transNum: transNum,
                    total: (
                      cartSub *
                      (storeDetails.taxRate
                        ? 1 + storeDetails.taxRate / 100
                        : 1.13)
                    ).toFixed(2),
                    method: "pickupOrder",
                    online: true,
                    cart: cart,
                    customer: {
                      name: orderDetails.name,
                      phone: orderDetails.phone,
                      address: null,
                    },
                  });
                }
                setpage(3);
              }}
            >
              <Text style={styles({ height, width }).btnTxt}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Cart End */}
      </View>
    </View>
  );
};

const MenuScreenInnerBlockLocal = ({ category, height, visible, catalog }) => {
  // Custom sorting function
  const customSort = (a, b) => {
    // Handle cases where one or both items don't have a rank
    const rankA = a.rank || Number.MAX_SAFE_INTEGER;
    const rankB = b.rank || Number.MAX_SAFE_INTEGER;

    // Compare based on ranks
    return rankA - rankB;
  };

  if (catalog.products?.length > 0) {
    const renderItem = ({ item, index }) => (
      <ProductDisplayBtnLocal
        product={item}
        productIndex={index}
        key={index}
        userUid={catalog.docID}
      />
    ); // Defined outside the render method
    const keyExtractor = (item) => item.id; // Defined outside the render method
    const getItemLayout = (data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    }); // Defined outside the render method

    return (
      <div
        style={visible === false ? { display: "none" } : { display: "block" }}
      >
        <FlatList
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
          data={catalog.products
            .filter((product) => {
              const isVisible = product.category === category;
              return isVisible;
            })
            .sort(customSort)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      </div>
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
          height: height * 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "archivo-500",
            color: "rgba(74,74,74,1)",
            fontSize: 20,
          }}
        >
          This category has no products...
        </Text>
      </View>
    );
  }
};

const ProductDisplayBtnLocal = ({ product, productIndex, userUid }) => {
  const [showProductScreen, setshowProductScreen] = useState(false);
  const xPos = useRef(new Animated.Value(-1000)).current;
  const shadowOpacity = useRef(new Animated.Value(0)).current;
  const [productImage, setproductImage] = useState();
  const cart = cartState.use();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (product.hasImage) {
      storage
        .ref(userUid + "/images/" + product.id)
        .getDownloadURL()
        .then((url) => {
          setproductImage(url);
        });
    }
  }, []);

  const fadeIn = () => {
    // Will change xPos value to 0 in 3 seconds
    setshowProductScreen(true);
    Animated.timing(xPos, {
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

  const fadeOut = () => {
    // Will change xPos value to 0 in 3 seconds
    Animated.timing(shadowOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(xPos, {
      toValue: -1000,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setshowProductScreen(false));
  };

  return (
    <TouchableOpacity
      key={productIndex}
      onPress={() => {
        if (product.options.length > 0) {
          // navigation.navigate("Product Listing", { product: product });
          // setshowProductScreen(true);
          fadeIn();
        } else {
          addCartState(
            {
              name: product.name,
              price: product.price,
              description: product.description,
              options: [],
              extraDetails: null,
            },
            cart
          );
        }
      }}
      style={[styles({ height, width }).touchable]}
    >
      <div
        style={{
          height: "200px",
          width: "200px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${productImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "archivo-500",
              color: "rgba(255,255,255,1)",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {product.name}
          </Text>
        </View>
      </div>
      {showProductScreen && (
        <Modal transparent={true}>
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
              position: "absolute",
              height: "100%",
              width: "100%",
              bottom: 0,
              left: xPos,
              zIndex: 0,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "70%",
                borderTopRightRadius: 3,
              }}
            >
              <ProductListing
                product={product}
                // itemIndex={productIndex}
                goBack={() => fadeOut()}
              />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              height: "100%",
              width: "30%",
              padding: 20,
              shadowColor: "rgba(0,0,0,1)",
              shadowOffset: {
                width: -3,
                height: 3,
              },
              elevation: 30,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              position: "absolute",
              opacity: shadowOpacity,
              right: 0,
              bottom: 0,
            }}
          />
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const Page3 = ({
  storeDetails,
  setorderDetails,
  orderDetails,
  setpage,
  catalog,
}) => {
  const { height, width } = useWindowDimensions();

  const stripe = useStripe();
  const elements = useElements();

  const [currency, setCurrency] = useState("cad"); // Default to CAD

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Error creating token:", error);
    } else {
      console.log("Token:", token);

      // Send the token, amount, and currency to your Firebase Function to process the payment
      const response = await fetch(
        "https://us-central1-posmate-5fc0a.cloudfunctions.net/processPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token.id,
            amount: orderDetails.total,
            currency,
            storeUID: storeDetails.docID,
            orderDetails: orderDetails,
          }),
        }
      );

      try {
        const responseData = await response.json();

        if (response.ok && responseData.success) {
          console.log("Payment processed successfully!");
          setpage(4);
        } else {
          console.error(
            "Payment processing failed. Server message:",
            responseData.message
          );
        }
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      }
    }
  };

  return (
    <View style={{ backgroundColor: "white", padding: 20 }}>
      <Text>Details</Text>
      <TextInput
        style={styles({ height, width }).textInput}
        placeholder="Name"
        value={orderDetails.customer.name}
        onChangeText={(text) =>
          setorderDetails({
            ...orderDetails,
            customer: { ...orderDetails.customer, name: text },
          })
        }
      />
      <TextInput
        style={styles({ height, width }).textInput}
        placeholder="Phone Number"
        value={orderDetails.customer.phone}
        onChangeText={(text) =>
          setorderDetails({
            ...orderDetails,
            customer: { ...orderDetails.customer, phone: text },
          })
        }
      />
      <TextInput
        style={styles({ height, width }).textInput}
        placeholder="Email"
        value={orderDetails.customer.email}
        onChangeText={(text) =>
          setorderDetails({
            ...orderDetails,
            customer: { ...orderDetails.customer, email: text },
          })
        }
      />
      <TextInput
        style={styles({ height, width }).textInput}
        placeholder="Notes"
        value={orderDetails.customer.note}
        onChangeText={(text) =>
          setorderDetails({
            ...orderDetails,
            customer: { ...orderDetails.customer, note: text },
          })
        }
      />
      <CardElement />
      <TouchableOpacity
        onPress={() => setpage(2)}
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderWidth: 1,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!stripe}
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderWidth: 1,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Page4 = () => {
  return (
    <View>
      <Text>Thank you for your order</Text>
    </View>
  );
};

export default OrderPage;

const styles = (props) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      height: "100%",
      width: props.width * 0.7,
      flexDirection: "row",
    },
    wrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingLeft: 50,
      paddingRight: 50,
    },
    scrollview: {
      width: "100%",
    },
    containerCart: {
      height: "100%",
      width: "30%",
      padding: 20,
      backgroundColor: "rgba(31,35,48,1)",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 2,
      shadowColor: "rgba(0,0,0,1)",
      shadowOffset: {
        width: -3,
        height: 3,
      },
      elevation: 30,
      shadowOpacity: 0.92,
      shadowRadius: 5,
    },
    contentContainer: {
      height: "100%",
      justifyContent: "space-between",
      width: "100%",
    },
    totalContainer: {
      height: "14%",
      paddingTop: 10,
    },
    cartHeader: {
      height: "6%",
      justifyContent: "space-between",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(41,44,56,1)",
      borderRadius: 15,
      width: 50,
      height: 50,
      margin: 10,
    },
    cashButton: {
      backgroundColor: "rgba(51,81,243,1)",
      borderRadius: 30,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      width: "49.5%",
      height: 55,
      alignItems: "center",
      justifyContent: "center",
    },
    cardButton: {
      backgroundColor: "rgba(51,81,243,1)",
      borderRadius: 30,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      width: "49.5%",
      height: 55,
      alignItems: "center",
      justifyContent: "center",
    },
    btnTxt: {
      fontSize: 20,
      color: "white",
    },
    totalTxt: {
      fontSize: 16,
      marginBottom: 5,
      color: "rgba(255,255,255,1)",
      fontWeight: "600",
    },
    totalTxtPrice: {
      fontSize: 16,
      marginBottom: 5,
      color: "rgba(255,255,255,1)",
      fontWeight: "600",
    },
    bigButton: {
      backgroundColor: "rgba(51,81,243,1)",
      borderRadius: 30,
      width: "98%",
      height: 55,
      alignItems: "center",
      justifyContent: "center",
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
      marginTop: 20,
    },
    fillTheCart: {
      fontFamily: "archivo-500",
      color: "rgba(74,74,74,1)",
      fontSize: 20,
    },
    touchable: {
      margin: 15,
      width: 200,
      height: 200,
      backgroundColor: "rgba(125,126,132,1)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    textInput: {
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
  });
