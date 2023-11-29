import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { userStoreState } from "state/state";
import ProductDisplayBtn from "components/ProductDisplayBtn";
import useWindowDimensions from "components/useWindowDimensions";
import { Button } from "@react-native-material/core";
const wh = Dimensions.get("window").height;
import Logo from "assets/dpos-logo.png";

const MenuScreen = ({ navigation, catalog }) => {
  const { height, width } = useWindowDimensions();
  const [section, setsection] = useState(null);

  const InnerBlock = () => {
    if (catalog.products) {
      if (catalog.products.length > 0) {
        if (!section) {
          const currentProduct = catalog.products.filter(
            (e) =>
              e.catagory === catalog.categories[0] ||
              e.category === catalog.categories[0]
          );
          if (currentProduct.length > 0) {
            return currentProduct.map((product, index) => (
              <ProductDisplayBtn
                product={product}
                productIndex={index}
                key={index}
                navigation={navigation}
              />
            ));
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
        } else {
          const correctProducts = catalog.products.filter(
            (e) => e.catagory === section || e.category === section
          );

          if (correctProducts.length > 0) {
            return correctProducts.map((product, index) => (
              <ProductDisplayBtn
                product={product}
                productIndex={index}
                key={index}
                navigation={navigation}
              />
            ));
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
        }
      }
    }
  };

  const LogoImage = React.memo(
    () => (
      <Image
        source={Logo}
        style={{ width: 200, height: 160, resizeMode: "contain" }}
      />
    ),
    []
  );

  const SectionSelector = () => {
    return (
      <View
        style={{
          backgroundColor: "rgba(31,35,48,1)",
          width: "23%",
          height: "100%",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <LogoImage />
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
                style={{ padding: 10 }}
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
    );
  };

  return (
    <View style={styles({ height, width }).container}>
      <SectionSelector />
      <ScrollView
        style={styles({ height, width }).scrollview}
        contentContainerStyle={styles({ height, width }).wrapper}
      >
        <InnerBlock />
        {/* <Button
          onPress={() => localStorage.removeItem("tutorialComplete")}
          title="Reset help"
        /> */}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = (props) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      //flex: 2,
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
  });
