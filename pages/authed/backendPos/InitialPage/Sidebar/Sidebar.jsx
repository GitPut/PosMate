import React, { useEffect, useRef, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import {
  Dashboard,
  Expense,
  People,
  Places,
  Product,
  Time,
  Users1,
  settings,
  Purchase,
  Quotation,
  Return,
  Transfer,
  Sales1,
  question_mark
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import { Animated, Image, Modal } from "react-native";
import firebase from "firebase/app";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const history = useHistory();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [viewVisible, setviewVisible] = useState(false);

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    history.push(`/authed/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);

  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const resetLoader = () => {
    setviewVisible(true);
    fadeIn();
  };

  const Manage = () => {
    resetLoader();
    firebase
      .functions()
      .httpsCallable("ext-firestore-stripe-payments-createPortalLink")({
        returnUrl: `${window.location.href}`,
        locale: "auto",
      })
      .then((response) => {
        console.log(response.data);
        window.location = response.data.url;
      })
      .catch((error) => {
        alert("Unknown error has occured: ", error);
      });
  };

  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars>
        <div className="sidebar-inner slimscroll"
          style={{ height: '100%' }}
        >
          <div
            id="sidebar-menu"
            className="sidebar-menu"
            onMouseLeave={expandMenu}
            onMouseOver={expandMenuOpen}
            style={{ height: '100%' }}
          >
            <ul>
              <li className={pathname.includes("dashboard") ? "active" : ""}> 
                <Link style={{ textDecoration: 'none' }}
                  to="/authed/dashboard"
                  onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                >
                  <img src={Dashboard} alt="img" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="submenu">
                <a
                  style={{ textDecoration: 'none' }}
                  className={
                    pathname.includes("/authed/product")
                      ? "active subdrop"
                      : "" || isSideMenu == "product"
                        ? "subdrop active"
                        : ""
                  }
                  onClick={() =>
                    toggleSidebar(isSideMenu == "product" ? "" : "product")
                  }
                >
                  <img src={Product} alt="img" />
                  <span> Product </span> <span className="menu-arrow" />
                </a>
                {isSideMenu == "product" ? (
                  <ul className="sidebar-ul">
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        className={
                          pathname.includes("productlist-") ? "active" : ""
                        }
                        to="/authed/product/productlist-product"
                      >
                        Product List
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        className={
                          pathname.includes("addproduct-") ? "active" : ""
                        }
                        to="/authed/product/addproduct-product"
                      >
                        Add Product
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        className={
                          pathname.includes("categorylist-") ? "active" : ""
                        }
                        to="/authed/product/categorylist-product"
                      >
                        Category List
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        className={
                          pathname.includes("addcategory-") ? "active" : ""
                        }
                        to="/authed/product/addcategory-product"
                      >
                        Add Category{" "}
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link style={{ textDecoration: 'none' }}
                  to="#"
                  className={
                    pathname.includes("/authed/report")
                      ? "subdrop active"
                      : "" || isSideMenu == "Report"
                        ? "subdrop active"
                        : ""
                  }
                  onClick={() =>
                    toggleSidebar(isSideMenu == "Report" ? "" : "Report")
                  }
                >
                  <img src={Time} alt="img" />
                  <span> Report</span> <span className="menu-arrow" />
                </Link>
                {isSideMenu == "Report" ? (
                  <ul>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/invoicereport"
                        className={
                          pathname.includes("invoicereport") ? "active" : ""
                        }
                      >
                        Invoice Report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/employeesreport"
                        className={
                          pathname.includes("employeesreport") ? "active" : ""
                        }
                      >
                        Employees Report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/addemployee"
                        className={
                          pathname.includes("addemployee") ? "active" : ""
                        }
                      >
                        Add Employee
                      </Link>
                    </li>
                    {/* <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/editemployee"
                        className={
                          pathname.includes("editemployee") ? "active" : ""
                        }
                      >
                        Edit Employee
                      </Link>
                    </li> */}
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link style={{ textDecoration: 'none' }}
                  to="#"
                  className={
                    pathname.includes("/authed/settings")
                      ? "subdrop active"
                      : "" || isSideMenu == "Settings"
                        ? "subdrop active"
                        : ""
                  }
                  onClick={() =>
                    toggleSidebar(isSideMenu == "Settings" ? "" : "Settings")
                  }
                >
                  <img src={settings} alt="img" />
                  <span> Settings</span> <span className="menu-arrow" />
                </Link>
                {isSideMenu == "Settings" ? (
                  <ul>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/settings/generalsettings"
                        className={
                          pathname.includes("generalsettings") ? "active" : ""
                        }
                      >
                        General Settings
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/settings/devicesettings"
                        className={
                          pathname.includes("devicesettings") ? "active" : ""
                        }
                      >
                        Device Settings
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/settings/onlinestoresettings"
                        className={
                          pathname.includes("onlinestoresettings") ? "active" : ""
                        }
                      >
                        Online Store Settings
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        onClick={Manage}
                      >
                        Manage Billing
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="submenu">
                <Link style={{ textDecoration: 'none' }}
                  to="/authed/help"
                  className={
                    pathname.includes("/authed/help")
                      ? "subdrop active"
                      : "" || isSideMenu == "Help"
                        ? "subdrop active"
                        : ""
                  }
                >
                  <img src={question_mark} alt="img" />
                  <span> Help</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {viewVisible && (
          <Modal visible={true}>
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                position: "absolute",
                opacity: fadeAnim,
                height: "100%",
                width: "100%",
              }}
            >
              <Image
                source={require("assets/loading.gif")}
                style={{ width: 450, height: 450, resizeMode: "contain" }}
              />
            </Animated.View>
          </Modal>
        )}
      </Scrollbars>
    </div>
  );
};

export default withRouter(Sidebar);
