import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import DropDownOption from "./DropDownOption";

interface DropDownMenuBtnProps {
  active: boolean;
  labelImg: ImageSourcePropType;
  options: {
    label: string;
    link: string | (() => void);
    active: boolean;
  }[];
  labelImgStyle?: ImageStyle | ImageStyle[];
  dropDownOpen: boolean;
  toggleDropdown: () => void;
}

function DropDownMenuBtn({
  active,
  labelImg,
  options,
  labelImgStyle,
  dropDownOpen,
  toggleDropdown,
}: DropDownMenuBtnProps) {
  return (
    <View>
      <Pressable
        style={[
          styles.container,
          (active || dropDownOpen) && {
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 5,
            shadowOpacity: 0.2,
            shadowRadius: 0,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255,1)",
          },
        ]}
        onPress={toggleDropdown}
      >
        <Image
          source={labelImg}
          resizeMode="contain"
          style={[styles.btnLblImg, labelImgStyle]}
        />
        <Entypo
          name={
            !active && !dropDownOpen
              ? "chevron-small-right"
              : dropDownOpen
              ? "chevron-small-up"
              : "chevron-small-down"
          }
          style={styles.dropDownBtnChevronDown}
        />
      </Pressable>
      {dropDownOpen && (
        <View style={styles.dropDownOptionsContainer}>
          {options.map((option, index) => {
            return <DropDownOption key={index} option={option} />;
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: 42,
    width: 201,
  },
  btnLblImg: {
    marginRight: 10,
    marginLeft: 10,
    resizeMode: "contain",
  },
  dropDownBtnChevronDown: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginRight: 10,
    marginLeft: 10,
  },
  dropDownMenuBtn: {
    height: 42,
    width: 201,
  },
  dropDownOptionsContainer: {
    width: 179,
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default DropDownMenuBtn;
