import React from "react";
import "react-select2-wrapper/css/select2.css";
import {
  View,
} from "react-native";
import EditStoreDetails from "pages/authed/main/MainPage/settings/EditStoreDetails";

const GenaralSettings = () => {

  return (
    <div className="page-wrapper">
      <div className="content">
        <EditStoreDetails />
      </div>
    </div >
  );


};

export default GenaralSettings;