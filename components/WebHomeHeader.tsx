import { Button } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { auth } from "state/firebaseConfig";
import { sectionState, setsectionState, userStoreState } from "state/state";
import Logo from "assets/dpos-logo.png";
import Icon from "@expo/vector-icons/Entypo";
import { set } from "react-native-reanimated";

const WebHomeHeader = ({ navigation, route, options, back }) => {
  const [hidden, sethidden] = useState(false);

  useEffect(() => {
    document.getElementById("w-nav-overlay-0").style.overflow = "hidden";
  }, []);

  return (
    <div
      data-animation="default"
      className="section-nav w-nav"
      data-easing2="ease"
      fs-scrolldisable-element="smart-nav"
      data-easing="ease"
      data-collapse="medium"
      data-w-id="733f2596-88fd-a010-fc0c-4d8192d2a860"
      role="banner"
      data-duration={400}
    >
      <div className="padding-global max-width-full">
        <div className="container-large">
          <div className="nav-component">
            <a
              href="/"
              aria-current="page"
              className="nav-logo-link w--current"
              //OLD
              // className="nav-logo-link w-nav-brand w--current"
              aria-label="home"
            >
              <img src={Logo} loading="lazy" alt="" className="nav-logo" />
            </a>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <div className="nav-menu-left">
                <a
                  style={
                    route.name === "Home"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                  href="/"
                  aria-current="page"
                  className="nav-link w-nav-link w--current"
                >
                  Home
                </a>
                <a
                  href="/features"
                  className="nav-link w-nav-link"
                  style={
                    route.name === "Features"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Features
                </a>
                <a
                  href="/about-us"
                  className="nav-link w-nav-link"
                  style={
                    route.name === "About Us"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  About us
                </a>
                <a
                  href="/pricing"
                  className="nav-link w-nav-link"
                  style={
                    route.name === "Pricing"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Pricing
                </a>
                <a
                  href="/faqs"
                  className="nav-link w-nav-link"
                  style={
                    route.name === "Faqs"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  FAQs
                </a>
              </div>
              <div className="nav-menu-right">
                <a
                  href="/contact"
                  className="nav-link w-nav-link"
                  style={
                    route.name === "Contact"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Contact sales
                </a>
                <div className="nav-divider-vertical" />
                <button
                  style={
                    route.name === "Login"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                  className="nav-link is-login"
                  type="button"
                  onClick={() => (window.location.href = "log-in")}
                >
                  Log in
                </button>
              </div>
            </nav>
            <div
              className="nav-menu-button w-nav-button"
              style={{ WebkitUserSelect: "text" }}
              aria-label="menu"
              role="button"
              tabIndex={0}
              aria-controls="w-nav-overlay-0"
              aria-haspopup="menu"
              aria-expanded="false"
              onClick={() => {
                if (!hidden) {
                  document.getElementById("w-nav-overlay-0").style.overflow =
                    null;
                  sethidden((prev) => !prev);
                } else {
                  document.getElementById("w-nav-overlay-0").style.overflow =
                    "hidden";
                  sethidden((prev) => !prev);
                }
              }}
            >
              <div className="menu-icon">
                <div className="menu-icon-line-top" />
                <div className="menu-icon-line-middle">
                  <div className="menu-icon-line-middle-inner" />
                </div>
                <div className="menu-icon-line-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-nav-overlay" data-wf-ignore id="w-nav-overlay-0">
        <div
          className="w-nav-overlay"
          data-wf-ignore
          id="w-nav-overlay-0"
          style={{ height: "6808.97px", display: "block" }}
        >
          <nav
            role="navigation"
            className="nav-menu w-nav-menu"
            data-nav-menu-open
            style={{
              transform: "translateY(0px) translateX(0px)",
              transition: "transform 400ms ease 0s",
            }}
          >
            <div className="nav-menu-left">
              <a
                href="/"
                aria-current="page"
                className="nav-link w-nav-link w--current w--nav-link-open"
              >
                Home
              </a>
              <a
                href="/features"
                className="nav-link w-nav-link w--nav-link-open"
              >
                Features
              </a>
              <a
                href="/about-us"
                className="nav-link w-nav-link w--nav-link-open"
              >
                About us
              </a>
              <a
                href="/pricing"
                className="nav-link w-nav-link w--nav-link-open"
              >
                Pricing
              </a>
              <a href="/faqs" className="nav-link w-nav-link w--nav-link-open">
                FAQs
              </a>
            </div>
            <div className="nav-menu-right">
              <a
                href="/contact"
                className="nav-link w-nav-link w--nav-link-open"
              >
                Contact sales
              </a>
              <div className="nav-divider-vertical" />
              <button
                className="nav-link is-login"
                data-wf-user-logout="Log out"
                data-wf-user-login="Log in"
                type="button"
                onClick={() => (window.location.href = "log-in")}
              >
                Log in
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default WebHomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(26,65,133,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    paddingLeft: 50,
    paddingRight: 50,
  },
  half: {
    flexDirection: "row",
    width: "40%",
    height: 42,
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: 25,
    marginLeft: 25,
  },
  logo: {
    width: 120,
    height: 42,
    resizeMode: "contain",
  },
  home: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  features: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  aboutUs: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  pricing: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  faQs: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  half2: {
    flexDirection: "row",
    width: 211,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-around",
    marginRight: 25,
    marginLeft: 25,
  },
  contactSales: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
  rect2: {
    width: 1,
    backgroundColor: "#E6E6E6",
    height: 30,
  },
  login: {
    fontWeight: "600",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "rgba(31,35,48,1)",
//     borderTopRightRadius: 0,
//     borderBottomRightRadius: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     width: "100%",
//     height: 90,
//   },
//   logo: {
//     width: 238,
//     height: 65,
//     margin: 35,
//   },
//   homeTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 20,
//   },
//   pricingTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 20,
//   },
//   demoTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 20,
//   },
//   loginBtn: {
//     width: 150,
//     height: 45,
//     backgroundColor: "rgba(29,128,246,1)",
//     borderRadius: 14,
//     margin: 35,
//     justifyContent: "center",
//   },
//   loginTxt: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 20,
//     alignSelf: "center",
//   },
//   helpIcon: {
//     color: "rgba(255,255,255,1)",
//     fontSize: 40,
//   },
// });
