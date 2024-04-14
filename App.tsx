import React from "react";
import "react-native-gesture-handler";
import RouteManager from "navigation/RouteManager";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
//   timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const App = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <RouteManager />
  </AlertProvider>
);

export default App;
