import React from "react";
import { StyleSheet, Image, Pressable, ImageStyle, ImageSourcePropType } from "react-native";

interface MenuBtnProps {
  active: boolean;
  labelImg: ImageSourcePropType;
  labelImgStyle?: ImageStyle | ImageStyle[];
  onPress: () => void;
}

function MenuBtn({ active, labelImg, labelImgStyle, onPress } : MenuBtnProps) {
  return (
    <Pressable
      style={[
        styles.container,
        active && {
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
      onPress={onPress}
    >
      <Image
        source={labelImg}
        resizeMode="contain"
        style={[styles.btnLblImg, labelImgStyle]}
        key={"btnLblImg"}
      />
    </Pressable>
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
    height: 75,
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: 20,
  },
  activeDropDownOption: {
    height: 34,
    width: 179,
  },
  nonActiveDropDownOption: {
    height: 34,
    width: 179,
  },
});

export default MenuBtn;
