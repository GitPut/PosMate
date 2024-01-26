import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useWindowDimensions from "components/useWindowDimensions";
import Logo from "assets/dpos-logo.png";
import MenuScreenInnerBlock from "components/MenuScreenInnerBlock";
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
        <SectionSelector />
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
    </View>
  );
};

export default MenuScreen;

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
  });
