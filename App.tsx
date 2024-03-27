import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "BackHandler is not supported on web and should not be used",
  'shadow* style props are deprecated. Use "boxShadow".',
  "You are loading @emotion/react when it is already loaded.",
  "style.resizeMode is deprecated. Please use props.resizeMode.",
  // Add more patterns here as needed
]);
import React from "react";
import "react-native-gesture-handler";
import RouteManager from "navigation/RouteManager";

const App = () => <RouteManager />;

export default App;
