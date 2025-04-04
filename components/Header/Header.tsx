import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useHistory } from "react-router-dom";
import HeaderLogoutDropdown from "components/Header/HeaderLogoutDropdown";
import Logo from "assets/dpos-logo-black.png";

interface HeaderProps {
  onPressLogo?: () => void;
  isPosHeader?: boolean;
}

const Header = ({ onPressLogo, isPosHeader }: HeaderProps) => {
  const history = useHistory();

  return (
    <View style={styles.header}>
      <Pressable onPress={onPressLogo}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} key={'logo'} />
      </Pressable>
      <View style={styles.rightSideRow}>
        {isPosHeader && (
          <Pressable
            onPress={() => history.push("/pos")}
            style={styles.backToPOSBtn}
          >
            <Text style={styles.pos}>POS</Text>
          </Pressable>
        )}
        <HeaderLogoutDropdown isPosHeader={isPosHeader ? isPosHeader : false} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to fill the available screen space
    backgroundColor: "#eef2ff",
  },
  header: {
    height: 75, // Consider if this needs adjustment
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 100000
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(238,242,255,1)",
  },
  logo: {
    height: 70,
    width: 222,
    marginRight: 20,
    marginLeft: 20,
  },
  rightSideRow: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 50,
  },
  backToPOSBtn: {
    width: 140,
    height: 32,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  pos: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
  userBtn: {
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWithNameGroup: {
    height: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userIcon: {
    height: 39,
    width: 40,
    marginRight: 10,
  },
  username: {
    color: "#435869",
    fontSize: 15,
    marginRight: 10,
  },
  chevronDownIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  leftMenu: {
    width: 278,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuOptionsContainer: {
    width: 201,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    marginLeft: 15,
  },
  rightSide: {
    width: "78%",
    height: "100%",
    justifyContent: "flex-end",
  },
  page: {
    width: "100%",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 45,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    height: "100%",
  },
  logoutFromAccount: {
    fontWeight: "700",
    color: "#121212",
  },
  logoutIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 26,
  },
});
