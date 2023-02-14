// import Main from "./WebHomeFiles/index.html";
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialButtonViolet from "components/MaterialButtonViolet";
import FeatureItem from "components/FeatureItem";
import MaterialButtonPrimary from "components/MaterialButtonPrimary";
import PlanItem from "components/PlanItem";
import { LinearGradient } from "expo-linear-gradient";
import useWindowDimensions from "components/useWindowDimensions";
import Card from "components/Card";
import img1 from "assets/backend.png";
import Footer from "components/Footer";

const WebHome = () => {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <div className="section-wrapper">
          <header className="section-home-hero">
            <div className="padding-global">
              <div className="container-medium">
                <div className="padding-bottom padding-xxhuge" />
                <div className="home-hero-section-title">
                  <div className="home-hero-header-component">
                    <div className="padding-bottom padding-small hide-mobile-portrait" />
                    <h1 className="heading-style-h1 text-color-white">
                      Divine POS is a powerful point-of-sale software
                    </h1>
                    <div className="padding-bottom padding-medium" />
                    <div className="max-width-large align-center">
                      <p className="text-size-large text-color-white">
                        We are the ideal solution for businesses looking for a
                        cost-effective and efficient way to manage their
                        operations. With its user-friendly interface and
                        advanced features, Divine POS streamlines the sales
                        process and provides real-time data and analytics to
                        help businesses make informed decisions.
                      </p>
                    </div>
                    <div className="padding-bottom padding-xlarge" />
                    <div className="button-wrapper is-center">
                      <a
                        href="/sign-up"
                        className="button is-secondary w-button"
                      >
                        Get started
                      </a>
                      <a
                        href="/features"
                        className="button is-tertiary w-button"
                      >
                        Find out more
                      </a>
                    </div>
                  </div>
                  <div className="padding-bottom padding-xxlarge" />
                  </div>
                <div className="padding-bottom padding-xhuge" />
              </div>
            </div>
            <div className="graphic-circle" />
          </header>
          <div className="section-home-dashboard">
            <div className="graphic-circle-2" />
            <div className="background-bottom-half" />
            <div className="padding-global"></div>
          </div>
        </div>
        <section className="section-why-us section-featured-blog background-color-neutral-50">
          <div className="padding-global">
            <div className="container-medium">
              <div className="padding-section-large">
                <div className="why-us-component">
                  <div className="max-width-xlarge">
                    <div className="why-us-heading-component">
                      <div className="tagline">Why us</div>
                      <div className="padding-bottom padding-small" />
                      <h2 className="heading-style-h2">
                        Key benefits of using Divine Pos
                      </h2>
                      <div className="padding-bottom padding-medium" />
                      <p className="text-size-large">
                        We’re more than a productivity tool. Customize Divine
                        Pos to work the way you do. There are no limitations.
                      </p>
                    </div>
                  </div>
                  <div className="padding-bottom padding-huge" />
                  <div className="why-us-item-wrapper">
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="M11.332 21c-.35 0-.62-.31-.57-.66l.9-6.34h-3.5c-.88 0-.33-.75-.31-.78 1.26-2.23 3.15-5.53 5.65-9.93a.577.577 0 0 1 1.07.37l-.9 6.34h3.51c.4 0 .62.19.4.66-3.29 5.74-5.2 9.09-5.75 10.05-.1.18-.29.29-.5.29Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        User-friendly interface
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS has an intuitive and easy-to-use interface,
                        making it simple for employees to learn and use quickly.
                      </div>
                    </div>
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="M17 2c-.55 0-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1Zm2 18H5V10h14v10Zm-8-7c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm-4 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm-4 4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm-4 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        Advanced features
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS offers a wide range of advanced features,
                        including inventory management, sales tracking, customer
                        relationship management, and reporting.
                      </div>
                    </div>
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="M16.332 11c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1h5.18c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        Cloud-based architecture
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS is cloud-based, meaning businesses can access
                        it from anywhere with an internet connection. This
                        enables remote access and flexibility to work from
                        anywhere.
                      </div>
                    </div>
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m4.851 17.764 5.3-5.3 3.25 3.25c.41.41 1.07.39 1.45-.04l7.17-8.07c.35-.39.33-.99-.04-1.37a1 1 0 0 0-1.45.04l-6.39 7.18-3.29-3.29a.996.996 0 0 0-1.41 0l-6.09 6.1a.996.996 0 0 0 0 1.41l.09.09c.39.39 1.03.39 1.41 0Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        Cost-effective
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS is available for rent, making it an
                        affordable option for businesses looking to upgrade
                        their point-of-sale software without breaking the bank.
                      </div>
                    </div>
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="M16 1H8a2.5 2.5 0 0 0-2.5 2.5v17A2.5 2.5 0 0 0 8 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 16 1Zm-4 21c-.83 0-1.5-.67-1.5-1.5S11.17 19 12 19s1.5.67 1.5 1.5S12.83 22 12 22Zm4.5-4h-9V4h9v14Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        Excellent customer support
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS offers excellent customer support to help
                        businesses resolve any issues or answer any questions
                        they may have.
                      </div>
                    </div>
                    <div className="why-us-item-content">
                      <div className="featured-icon">
                        <div className="icon-1x1-small w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="M19.332 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1h-8V3c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-1.11 0-1.99.9-1.99 2l-.01 14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 15c0 .55-.45 1-1 1h-12c-.55 0-1-.45-1-1V9h14v10Zm-12-8h2v2h-2v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="padding-bottom padding-medium" />
                      <div className="text-size-medium text-weight-semibold text-color-neutral-800">
                        Customizable
                      </div>
                      <div className="padding-bottom padding-xsmall" />
                      <div className="text-size-small text-color-neutral-600">
                        Divine POS is customizable, allowing businesses to
                        tailor it to their specific needs and preferences. This
                        flexibility makes it an ideal solution for businesses of
                        all sizes and industries.
                      </div>
                    </div>
                  </div>
                  <div className="padding-bottom padding-huge" />
                  <div className="max-width-medium text-align-center">
                    <div className="why-us-cta">
                      <div className="why-us-bottom-text-content">
                        <h3 className="heading-style-h5 text-weight-semibold">
                          Ready to take your business to the next level?
                        </h3>
                        <div className="text-size-regular">
                          Choose Divine POS and experience the benefits of a
                          powerful, user-friendly, and cost-effective
                          point-of-sale solution. With our advanced features,
                          cloud-based architecture, and excellent customer
                          support, Divine POS is the perfect tool to help you
                          streamline your operations and make data-driven
                          decisions. Don't wait any longer, contact us today to
                          learn more and get started!
                        </div>
                      </div>
                      <div className="padding-bottom padding-large" />
                      <a
                        href="/pricing"
                        className="button is-tertiary-black is-small w-button"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-featured-blog background-color-neutral-50">
          <div className="padding-global">
            <div className="container-large" />
          </div>
        </div>
        <section className="section-cta">
          <div className="padding-global">
            <div className="container-large">
              <div className="cta-component">
                <div className="cta-content">
                  <h2 className="heading-style-h5 text-color-white">
                    Try Divine Pos today
                  </h2>
                  <div className="padding-bottom padding-xsmall" />
                  <div className="text-size-regular text-color-white">
                    Try our free demo now and see how easy yet powerful Divine
                    Pos is to use
                  </div>
                </div>
                <a href="/sign-up" className="button is-tertiary w-button">
                  Go to demo
                </a>
              </div>
            </div>
            <div className="cta-background" />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default WebHome;

const styles = StyleSheet.create({
  // main: { flex: 1, backgroundColor: "white" },
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  welcomeContainer: {
    height: 416,
    margin: 50,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainerWelcome: {
    width: 518,
    height: 377,
    justifyContent: "space-around",
  },
  h1: {
    fontWeight: "700",
    color: "rgba(9,52,103,1)",
    fontSize: 40,
  },
  p1: {
    color: "rgba(9,52,103,1)",
    fontSize: 30,
    width: 518,
    height: 171,
  },
  demoBtn: {
    height: 57,
    width: 154,
  },
  heroImg1: {
    width: 478,
    height: 316,
  },
  aboutContainer: {
    height: 523,
    margin: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  aboutUsH1: {
    fontWeight: "700",
    color: "rgba(9,52,103,1)",
    fontSize: 40,
    textAlign: "center",
  },
  aboutUsBody: {
    color: "rgba(9,52,103,1)",
    fontSize: 25,
    width: 1132,
  },
  featureContainer: {
    height: 368,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 50,
    alignSelf: "stretch",
  },
  featureItem1: {
    height: 276,
    width: 295,
  },
  featureItem2: {
    height: 276,
    width: 295,
  },
  featureItem3: {
    height: 276,
    width: 295,
  },
  featureItem4: {
    height: 276,
    width: 295,
  },
  pricingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 50,
    alignSelf: "stretch",
  },
  startDemoContainer: {
    width: 450,
    height: "100%",
    justifyContent: "space-between",
  },
  demoH1: {
    fontWeight: "700",
    color: "rgba(37,35,35,1)",
    fontSize: 25,
  },
  demoBodyTxt: {
    color: "rgba(37,35,35,1)",
    fontSize: 25,
    width: 346,
    height: 154,
  },
  demoBtn2: {
    height: 52,
    width: 188,
    marginTop: 25,
  },
  copyrightTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
  },
  btnContainer: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 52,
    marginRight: 25,
  },
  getStarted: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  btnContainer2: {
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 52,
  },
  btnContainer3: {
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 52,
  },
  findOut: {
    fontWeight: "700",
    color: "white",
    fontSize: 16,
  },
  whyUs: {
    fontWeight: "700",
    color: "#175cd3",
    fontSize: 18,
    marginBottom: 15,
    paddingTop: 450,
  },
  keyB: {
    fontWeight: "600",
    color: "#121212",
    fontSize: 60,
    width: 620,
    height: 163,
    textAlign: "center",
    lineHeight: 70,
    marginBottom: 15,
  },
  section2Container: {
    justifyContent: "center",
    alignItems: "center",
    height: 1000,
  },
  p2: {
    fontWeight: "500",
    color: "#6c737f",
    fontSize: 20,
    width: 756,
    height: 67,
    lineHeight: 30,
    textAlign: "center",
  },
  footerContainer: {
    backgroundColor: "#1f2a37",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 70,
    marginTop: 100,
  },
  innerContainer: {
    width: "80%",
    height: 50,
    borderColor: "rgba(56,66,80,1)",
    borderTopWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  divinePos2023: {
    color: "#9da4ae",
  },
  freeTrialContainer: {
    backgroundColor: "#1470ef",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: 160,
    paddingRight: 50,
    paddingLeft: 50,
    alignSelf: "center",
    marginTop: 200,
  },
  tryDivinePosToday: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
  },
});
