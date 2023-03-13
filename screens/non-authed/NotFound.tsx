import { View, Text } from "react-native";
import React from "react";
import Footer from "components/Footer";

const NotFound = () => {
  return (
    <div className="page-wrapper-non">
      <main className="main-wrapper">
        <div className="_404-component">
          <div className="utility-page-form-block is-404 w-form">
            <h3 className="heading-style-h2 text-color-white">404 Not Found</h3>
            <div className="padding-bottom padding-medium" />
            <div className="text-size-large text-color-white">
              The page you are looking for doesn't exist or has been moved
            </div>
            <div className="padding-bottom padding-xlarge" />
            <a href="/" className="button is-secondary w-button">
              Back to Homepage
            </a>
          </div>
          <div className="graphic-circle" />
          <div className="graphic-circle-3" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
