import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "screens/authed/HomeScreen";
import SettingsScreen from "screens/authed/SettingsScreen";
import UpgradeScreen from "screens/authed/UpgradeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { getHeaderTitle } from "@react-navigation/elements";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: 20,
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 3,
        borderTopWidth: 1,
        borderTopColor: "#CCC",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons
              name={
                (route.name === "Home" && "home") ||
                (route.name === "Settings" && "settings-outline") ||
                (route.name === "Upgrade" && "star")
              }
              size={24}
              color={isFocused ? "#3F51B5" : "#222"}
              style={{ paddingBottom: 5 }}
            />
            <Text
              style={{ color: isFocused ? "#3F51B5" : "#222", fontSize: 12 }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MyHeader({ navigation, route, options, back, icon }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <View
      style={{
        flexDirection: "row",
        minHeight: 90,
        width: "100%",
        backgroundColor: "#3F51B5",
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        shadowColor: "#111",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        elevation: 3,
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }} />
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
          {title === "Home" ? "Saved Routes" : title}
        </Text>
      </View>
      {icon ? (
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Ionicons name={icon} size={24} color={"white"} />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
  );
}

function MyTabs() {
  return (
    <>
      <StatusBar style="light" />
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ header: (props) => <MyHeader {...props} /> }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: (props) => <MyHeader {...props} icon="add" /> }}
        />
        <Tab.Screen
          name="Upgrade"
          component={UpgradeScreen}
          options={{ header: (props) => <MyHeader {...props} /> }}
        />
      </Tab.Navigator>
    </>
  );
}

const TabNav = () => {
  return <MyTabs />;
};

export default TabNav;
