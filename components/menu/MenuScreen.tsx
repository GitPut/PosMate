import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useWindowDimensions from "components/functional/useWindowDimensions";
import Logo from "assets/dpos-logo.png";
import MenuScreenInnerBlock from "components/product/MenuScreenInnerBlock";
import { userStoreState } from "state/state";

const MenuScreen = () => {
  const { height, width } = useWindowDimensions();
  const [section, setsection] = useState(null);
  const catalog = userStoreState.use();

  const SectionSelector = () => {
    return (
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
    );
  };

  return (
    <View style={styles({ height, width }).container}>
      <View
        style={{
          backgroundColor: "rgba(31,35,48,1)",
          width: width < 1400 ? "28%" : "25%",
          height: "100%",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Image
          source={Logo}
          style={{ width: 200, height: 160, resizeMode: "contain" }}
        />
        {catalog.categories.length > 0 ? (
          <SectionSelector />
        ) : (
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              height: "70%",
              width: "90%",
            }}
          >
            <Text>You have no categories yet...</Text>
          </View>
        )}
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
          <MenuScreenInnerBlock
            key={index}
            category={category}
            height={height}
            visible={visible}
          />
        );
      })}
      {!catalog.categories.length > 0 && (
        <View
          style={{
            height: "100%",
            width: "75%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              height: "50%",
              width: "50%",
            }}
          >
            <Text>You have no categories yet...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MenuScreen;

const styles = (props) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      height: "100%",
      width: props.width < 1400 ? props.width * 0.65 : props.width * 0.7,
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
