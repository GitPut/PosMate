import React, { useEffect, useState } from "react";
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
} from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const history = useHistory();

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
                    {/* <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("subcategorytable-")
                              ? "active"
                              : ""
                          }
                          to="/authed/product/subcategorytable-product"
                        >
                          Sub Category List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addsubcategory-") ? "active" : ""
                          }
                          to="/authed/product/addsubcategory-product"
                        >
                          Add Sub Category{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("brandlist-") ? "active" : ""
                          }
                          to="/authed/product/brandlist-product"
                        >
                          Brand list{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addbrand-") ? "active" : ""
                          }
                          to="/authed/product/addbrand-product"
                        >
                          Add Brand
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("importproduct-") ? "active" : ""
                          }
                          to="/authed/product/importproduct-product"
                        >
                          Import Product
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("printbarcode-") ? "active" : ""
                          }
                          to="/authed/product/printbarcode-product"
                        >
                          Print Barcode
                        </Link>
                      </li> */}
                  </ul>
                ) : (
                  ""
                )}
              </li>
              {/* <li className="submenu">
                  <a
                    style={{ textDecoration: 'none' }} 
                    className={
                      pathname.includes("/authed/sales")
                        ? "active subdrop"
                        : "" || isSideMenu == "sales"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "sales" ? "" : "sales")
                    }
                  >
                    <img src={Sales1} alt="img" />
                    <span> Sales </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "sales" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("saleslist") ? "active" : ""
                          }
                          to="/authed/sales/saleslist"
                        >
                          Sales List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }}  to="/pos">POS</Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/sales/add-sales"
                          className={
                            pathname.includes("add-sales") ? "active" : ""
                          }
                        >
                          New Sales
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("salesreturnlist") ? "active" : ""
                          }
                          to="/authed/sales/salesreturnlist-return"
                        >
                          Sales Return List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addsalesreturn") ? "active" : ""
                          }
                          to="/authed/sales/addsalesreturn-return"
                        >
                          New Sales Return
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    style={{ textDecoration: 'none' }} 
                    className={
                      pathname.includes("/authed/purchase")
                        ? "subdrop active"
                        : "" || isSideMenu == "purchase"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "purchase" ? "" : "purchase")
                    }
                  >
                    {" "}
                    <img src={Purchase} alt="img" /> <span>Purchase</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "purchase" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("purchaselist-") ? "active" : ""
                          }
                          to="/authed/purchase/purchaselist-purchase"
                        >
                          Purchase List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addpurchase-") ? "active" : ""
                          }
                          to="/authed/purchase/addpurchase-purchase"
                        >
                          Add Purchase
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("importpurchase-") ? "active" : ""
                          }
                          to="/authed/purchase/importpurchase-purchase"
                        >
                          Import Purchase
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    style={{ textDecoration: 'none' }} 
                    className={
                      pathname.includes("/authed/expense")
                        ? "subdrop active"
                        : "" || isSideMenu == "expense"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "expense" ? "" : "expense")
                    }
                  >
                    {" "}
                    <img src={Expense} alt="img" /> <span>Expense</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "expense" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("expenselist-") ? "active" : ""
                          }
                          to="/authed/expense/expenselist-expense"
                        >
                          Expense List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addexpense-") ? "active" : ""
                          }
                          to="/authed/expense/addexpense-expense"
                        >
                          Add Expense
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("expensecategory-")
                              ? "active"
                              : ""
                          }
                          to="/authed/expense/expensecategory-expense"
                        >
                          Expense Category
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    
                    className={
                      pathname.includes("/authed/quotation")
                        ? "subdrop active"
                        : "" || isSideMenu == "quotation"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "quotation" ? "" : "quotation"
                      )
                    }
                  >
                    {" "}
                    <img src={Quotation} alt="img" /> <span>Quotation</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "quotation" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("quotationlist-") ? "active" : ""
                          }
                          to="/authed/quotation/quotationlist-quotation"
                        >
                          Quotation List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addquotation-") ? "active" : ""
                          }
                          to="/authed/quotation/addquotation-quotation"
                        >
                          Add Quotation
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    style={{ textDecoration: 'none' }} 
                    className={
                      pathname.includes("/authed/transfer")
                        ? "subdrop active"
                        : "" || isSideMenu == "transfer"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "transfer" ? "" : "transfer")
                    }
                  >
                    {" "}
                    <img src={Transfer} alt="img" /> <span>Transfer</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "transfer" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("transferlist-") ? "active" : ""
                          }
                          to="/authed/transfer/transferlist-transfer"
                        >
                          Transfer List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addtransfer-") ? "active" : ""
                          }
                          to="/authed/transfer/addtransfer-transfer"
                        >
                          Add Transfer
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("importtransfer-") ? "active" : ""
                          }
                          to="/authed/transfer/importtransfer-transfer"
                        >
                          Import Transfer
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    
                    className={
                      pathname.includes("/authed/return")
                        ? "subdrop active"
                        : "" || isSideMenu == "return"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "return" ? "" : "return")
                    }
                  >
                    {" "}
                    <img src={Return} alt="img" /> <span>Return</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "return" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("salesreturnlist-")
                              ? "active"
                              : ""
                          }
                          to="/authed/return/salesreturnlist-return"
                        >
                          Sales Return List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addsalesreturn-") ? "active" : ""
                          }
                          to="/authed/return/addsalesreturn-return"
                        >
                          Add Sales Return
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("purchasereturnlist-")
                              ? "active"
                              : ""
                          }
                          to="/authed/return/purchasereturnlist-return"
                        >
                          Purchase Return List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addpurchasereturn-")
                              ? "active"
                              : ""
                          }
                          to="/authed/return/addpurchasereturn-return"
                        >
                          Add Purchase Return
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a style={{ textDecoration: 'none' }} 
                    
                    className={
                      pathname.includes("/authed/people")
                        ? "subdrop active"
                        : "" || isSideMenu == "people"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "people" ? "" : "people")
                    }
                  >
                    {" "}
                    <img src={People} alt="img" /> <span>People</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "people" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("customerlist-") ? "active" : ""
                          }
                          to="/authed/people/customerlist-people"
                        >
                          Customer List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addcustomer-") ? "active" : ""
                          }
                          to="/authed/people/addcustomer-people"
                        >
                          Add Customer
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("supplierlist-") ? "active" : ""
                          }
                          to="/authed/people/supplierlist-people"
                        >
                          Supplier List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addsupplier-") ? "active" : ""
                          }
                          to="/authed/people/addsupplier-people"
                        >
                          Add Supplier
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("userlist-") ? "active" : ""
                          }
                          to="/authed/people/userlist-people"
                        >
                          User List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("adduser-") ? "active" : ""
                          }
                          to="/authed/people/adduser-people"
                        >
                          Add User
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("storelist-") ? "active" : ""
                          }
                          to="/authed/people/storelist-people"
                        >
                          Store List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("addstore-") ? "active" : ""
                          }
                          to="/authed/people/addstore-people"
                        >
                          Add Store
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className="submenu">
                  <a
                    
                    className={
                      pathname.includes("/authed/places")
                        ? "subdrop active"
                        : "" || isSideMenu == "places"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "places" ? "" : "places")
                    }
                  >
                    {" "}
                    <img src={Places} alt="img" /> <span>Places</span>{" "}
                    <span className="menu-arrow"></span>
                  </a>
                  {isSideMenu == "places" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("newcountry-") ? "active" : ""
                          }
                          to="/authed/places/newcountry-places"
                        >
                          New Country
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("countrylist-") ? "active" : ""
                          }
                          to="/authed/places/countrylist-places"
                        >
                          Country List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("newstate-") ? "active" : ""
                          }
                          to="/authed/places/newstate-places"
                        >
                          New State
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("statelist-") ? "active" : ""
                          }
                          to="/authed/places/statelist-places"
                        >
                          State List
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
              {/* <li className={pathname.includes("components") ? "active" : ""}>
                  <Link style={{ textDecoration: 'none' }} 
                    to="/authed/components"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    {" "}
                    <FeatherIcon icon="layers" />
                    <span>Components</span>
                  </Link>
                </li>
                <li className={pathname.includes("blankpage") ? "active" : ""}>
                  <Link style={{ textDecoration: 'none' }} 
                    to="/authed/blankpage"
                    onClick={() => toggleSidebar(isSideMenu == "" ? "" : "")}
                  >
                    {" "}
                    <FeatherIcon icon="file" />
                    <span>Blank Page</span>
                  </Link>
                </li> */}
              {/* <li className="submenu">
                  <a
                    
                    className={
                      isSideMenu == "error pages" ? "subdrop active" : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "error pages" ? "" : "error pages"
                      )
                    }
                  >
                    {" "}
                    <FeatherIcon icon="alert-octagon" />
                    <span> Error Pages </span> <span className="menu-arrow" />
                  </a>
                  {isSideMenu == "error pages" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }}  to="/error-404">404 Error </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }}  to="/error-500">500 Error </Link>
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
                      pathname.includes("/authed/elements")
                        ? "subdrop active"
                        : "" || isSideMenu == "elements"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "elements" ? "" : "elements")
                    }
                  >
                    <FeatherIcon icon="box" />
                    <span>Elements </span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "elements" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/sweetalerts"
                          className={
                            pathname.includes("sweetalerts") ? "active" : ""
                          }
                        >
                          Sweet Alerts
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/tooltip"
                          className={
                            pathname.includes("tooltip") ? "active" : ""
                          }
                        >
                          Tooltip
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          className={
                            pathname.includes("popover") ? "active" : ""
                          }
                          to="/authed/elements/popover"
                        >
                          Popover
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/ribbon"
                          className={
                            pathname.includes("ribbon") ? "active" : ""
                          }
                        >
                          Ribbon
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/clipboard"
                          className={
                            pathname.includes("clipboard") ? "active" : ""
                          }
                        >
                          Clipboard
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/drag-drop"
                          className={
                            pathname.includes("drag-drop") ? "active" : ""
                          }
                        >
                          Drag &amp; Drop
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/rangeslider"
                          className={
                            pathname.includes("rangeslider") ? "active" : ""
                          }
                          onClick={(e) =>
                            pageRefresh("elements", "rangeslider")
                          }
                        >
                          Range Slider
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/rating"
                          className={
                            pathname.includes("rating") ? "active" : ""
                          }
                        >
                          Rating
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/toastr"
                          className={
                            pathname.includes("toastr") ? "active" : ""
                          }
                        >
                          Toastr
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/text-editor"
                          className={
                            pathname.includes("text-editor") ? "active" : ""
                          }
                        >
                          Text Editor
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/counter"
                          className={
                            pathname.includes("counter") ? "active" : ""
                          }
                        >
                          Counter
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/scrollbar"
                          className={
                            pathname.includes("scrollbar") ? "active" : ""
                          }
                        >
                          Scrollbar
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/spinner"
                          className={
                            pathname.includes("spinner") ? "active" : ""
                          }
                        >
                          Spinner
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/notification"
                          className={
                            pathname.includes("notification") ? "active" : ""
                          }
                        >
                          Notification
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/lightbox"
                          className={
                            pathname.includes("lightbox") ? "active" : ""
                          }
                        >
                          Lightbox
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/stickynote"
                          className={
                            pathname.includes("stickynote") ? "active" : ""
                          }
                        >
                          Sticky Note
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/timeline"
                          className={
                            pathname.includes("timeline") ? "active" : ""
                          }
                        >
                          Timeline
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/elements/form-wizard"
                          className={
                            pathname.includes("form-wizard") ? "active" : ""
                          }
                          onClick={(e) =>
                            pageRefresh("elements", "form-wizard")
                          }
                        >
                          Form Wizard
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
                      pathname.includes("/authed/charts")
                        ? "subdrop active"
                        : "" || isSideMenu == "Charts"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Charts" ? "" : "Charts")
                    }
                  >
                    <FeatherIcon icon="bar-chart-2" />
                    <span> Charts</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Charts" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/charts/chart-apex"
                          className={
                            pathname.includes("chart-apex") ? "active" : ""
                          }
                        >
                          Apex Charts
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/charts/chart-js"
                          className={
                            pathname.includes("chart-js") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-js")}
                        >
                          Chart Js
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/charts/chart-morris"
                          className={
                            pathname.includes("chart-morris") ? "active" : ""
                          }
                        >
                          Morris Charts
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/charts/chart-flot"
                          className={
                            pathname.includes("chart-flot") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-flot")}
                        >
                          Flot Charts
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/charts/chart-peity"
                          className={
                            pathname.includes("chart-peity") ? "active" : ""
                          }
                          onClick={(e) => pageRefresh("charts", "chart-peity")}
                        >
                          Peity Charts
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
                      pathname.includes("/authed/icons")
                        ? "subdrop active"
                        : "" || isSideMenu == "Icons"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Icons" ? "" : "Icons")
                    }
                  >
                    <FeatherIcon icon="award" />
                    <span> Icons</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Icons" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-fontawesome"
                          className={
                            pathname.includes("fontawesome") ? "active" : ""
                          }
                        >
                          Fontawesome Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-feather"
                          className={
                            pathname.includes("feather") ? "active" : ""
                          }
                        >
                          Feather Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-ionic"
                          className={pathname.includes("ionic") ? "active" : ""}
                        >
                          Ionic Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-material"
                          className={
                            pathname.includes("material") ? "active" : ""
                          }
                        >
                          Material Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-pe7"
                          className={
                            pathname.includes("icon-pe7") ? "active" : ""
                          }
                        >
                          Pe7 Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-simpleline"
                          className={
                            pathname.includes("simpleline") ? "active" : ""
                          }
                        >
                          Simpleline Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-themify"
                          className={
                            pathname.includes("themify") ? "active" : ""
                          }
                        >
                          Themify Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-weather"
                          className={
                            pathname.includes("weather") ? "active" : ""
                          }
                        >
                          Weather Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-typicon"
                          className={
                            pathname.includes("typicon") ? "active" : ""
                          }
                        >
                          Typicon Icons
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/icons/icon-flag"
                          className={
                            pathname.includes("icon-flag") ? "active" : ""
                          }
                        >
                          Flag Icons
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
                      pathname.includes("/authed/forms")
                        ? "subdrop active"
                        : "" || isSideMenu == "Forms"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Forms" ? "" : "Forms")
                    }
                  >
                    <FeatherIcon icon="columns" />
                    <span> Forms</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Forms" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-basic-inputs"
                          className={
                            pathname.includes("form-basic-inputs")
                              ? "active"
                              : ""
                          }
                        >
                          Basic Inputs{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-input-groups"
                          className={
                            pathname.includes("form-input-groups")
                              ? "active"
                              : ""
                          }
                        >
                          Input Groups{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-horizontal"
                          className={
                            pathname.includes("horizontal") ? "active" : ""
                          }
                        >
                          Horizontal Form{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-vertical"
                          className={
                            pathname.includes("form-vertical") ? "active" : ""
                          }
                        >
                          {" "}
                          Vertical Form{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-mask"
                          className={
                            pathname.includes("form-mask") ? "active" : ""
                          }
                        >
                          Form Mask{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-validation"
                          className={
                            pathname.includes("validation") ? "active" : ""
                          }
                        >
                          Form Validation{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-select2"
                          className={
                            pathname.includes("form-select2") ? "active" : ""
                          }
                        >
                          Form Select2{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/forms/form-fileupload"
                          className={
                            pathname.includes("fileupload") ? "active" : ""
                          }
                        >
                          File Upload{" "}
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
                      pathname.includes("/authed/table")
                        ? "subdrop active"
                        : "" || isSideMenu == "Table"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Table" ? "" : "Table")
                    }
                  >
                    <FeatherIcon icon="layout" />
                    <span> Table</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Table" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/table/tables-basic"
                          className={
                            pathname.includes("tables-basic") ? "active" : ""
                          }
                        >
                          Basic Tables{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/table/data-tables"
                          className={
                            pathname.includes("data-tables") ? "active" : ""
                          }
                        >
                          Data Table{" "}
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
                      pathname.includes("/authed/application")
                        ? "subdrop active"
                        : "" || isSideMenu == "Application"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "Application" ? "" : "Application"
                      )
                    }
                  >
                    <img src={Product} alt="img" />
                    <span> Application</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Application" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/application/chat"
                          className={pathname.includes("chat") ? "active" : ""}
                        >
                          Chat
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/application/calendar"
                          className={
                            pathname.includes("calendar") ? "active" : ""
                          }
                        >
                          Calendar
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/application/email"
                          className={pathname.includes("email") ? "active" : ""}
                        >
                          Email
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
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
                    {/* <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/purchaseorderreport"
                        className={
                          pathname.includes("purchaseorderreport")
                            ? "active"
                            : ""
                        }
                      >
                        Purchase order report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/inventoryreport"
                        className={
                          pathname.includes("inventoryreport") ? "active" : ""
                        }
                      >
                        Inventory Report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/salesreport"
                        className={
                          pathname.includes("salesreport") ? "active" : ""
                        }
                      >
                        Sales Report
                      </Link>
                    </li> */}
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
                    {/* <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/purchasereport"
                        className={
                          pathname.includes("purchasereport") ? "active" : ""
                        }
                      >
                        Purchase Report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/supplierreport"
                        className={
                          pathname.includes("supplierreport") ? "active" : ""
                        }
                      >
                        Supplier Report
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: 'none' }}
                        to="/authed/report/customerreport"
                        className={
                          pathname.includes("customerreport") ? "active" : ""
                        }
                      >
                        Customer Report
                      </Link>
                    </li> */}
                  </ul>
                ) : (
                  ""
                )}
              </li>
              {/* <li className="submenu">
                  <Link style={{ textDecoration: 'none' }} 
                    to="#"
                    className={
                      pathname.includes("/authed/users")
                        ? "subdrop active"
                        : "" || isSideMenu == "Users"
                        ? "subdrop active"
                        : ""
                    }
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Users" ? "" : "Users")
                    }
                  >
                    <img src={Users1} alt="img" />
                    <span> Users</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Users" ? (
                    <ul>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/users/newuser"
                          className={
                            pathname.includes("newuser") ? "active" : ""
                          }
                        >
                          New User{" "}
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/users/userlists"
                          className={
                            pathname.includes("userlists") ? "active" : ""
                          }
                        >
                          Users List
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li> */}
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
                    {/* <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/settings/emailsettings"
                          className={
                            pathname.includes("emailsettings") ? "active" : ""
                          }
                        >
                          Email Settings
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/settings/paymentsettings"
                          className={
                            pathname.includes("paymentsettings") ? "active" : ""
                          }
                        >
                          Payment Settings
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/settings/currencysettings"
                          className={
                            pathname.includes("currencysettings")
                              ? "active"
                              : ""
                          }
                        >
                          Currency Settings
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/settings/grouppermissions"
                          className={
                            pathname.includes("permission") ? "active" : ""
                          }
                        >
                          Group Permissions
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }} 
                          to="/authed/settings/taxrates"
                          className={
                            pathname.includes("taxrates") ? "active" : ""
                          }
                        >
                          Tax Rates
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
                    pathname.includes("/authed/help")
                      ? "subdrop active"
                      : "" || isSideMenu == "Help"
                        ? "subdrop active"
                        : ""
                  }
                  onClick={() =>
                    toggleSidebar(isSideMenu == "Help" ? "" : "Help")
                  }
                >
                  <img src={settings} alt="img" />
                  <span> Help</span> <span className="menu-arrow" />
                </Link>
                {isSideMenu == "Help" ? (
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
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default withRouter(Sidebar);
