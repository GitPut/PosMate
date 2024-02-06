import React, { useEffect, useState } from "react";
import Logo from "assets/dpos-logo.png";
import { useHistory } from "react-router-dom";

const WebHomeHeader = () => {
  const [hidden, sethidden] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.getElementById("w-nav-overlay-0").style.overflow = "hidden";
  }, []);

  return (
    <div
      data-animation="default"
      className="section-nav w-nav"
      data-easing2="ease"
      data-easing="ease"
      data-collapse="medium"
      data-w-id="733f2596-88fd-a010-fc0c-4d8192d2a860"
      role="banner"
      data-duration={400}
    >
      <div className="padding-global max-width-full">
        <div
          className="container-large"
        >
          <div className="nav-component">
            <a
              // href="/"
              aria-current="page"
              className="nav-logo-link w--current"
              aria-label="home"
              onClick={() => history.push("/")}
            >
              <img src={Logo} loading="lazy" alt="" className="nav-logo" />
            </a>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <div className="nav-menu-left">
                <a
                  style={
                    location.pathname === "/"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                  // href="/"
                  aria-current="page"
                  className="nav-link-non w-nav-link-non w--current"
                  onClick={() => history.push("/")}
                >
                  Home
                </a>
                <a
                  // href="/features"
                  onClick={() => history.push("/features")}
                  className="nav-link-non w-nav-link-non"
                  style={
                    location.pathname === "/features"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Features
                </a>
                <a
                  // href="/about-us"
                  onClick={() => history.push("/about-us")}
                  className="nav-link-non w-nav-link-non"
                  style={
                    location.pathname === "/about-us"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  About us
                </a>
                <a
                  // href="/pricing"
                  onClick={() => history.push("/pricing")}
                  className="nav-link-non w-nav-link-non"
                  style={
                    location.pathname === "/pricing"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Pricing
                </a>
                <a
                  // href="/faqs"
                  onClick={() => history.push("/faqs")}
                  className="nav-link-non w-nav-link-non"
                  style={
                    location.pathname === "/faqs"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  FAQs
                </a>
              </div>
              <div className="nav-menu-right">
                <a
                  // href="/contact"
                  onClick={() => history.push("/contact")}
                  className="nav-link-non w-nav-link-non"
                  style={
                    location.pathname === "/contact"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                >
                  Contact sales
                </a>
                <div className="nav-divider-vertical" />
                <button
                  style={
                    location.pathname === "/log-in"
                      ? { backgroundColor: "#175cd3" }
                      : { backgroundColor: "transparent" }
                  }
                  className="nav-link-non is-login"
                  type="button"
                  // onClick={() => (window.location.href = "log-in")}
                  onClick={() => history.push("/log-in")}
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
                // href="/"
                onClick={() => history.push("/")}
                aria-current="page"
                className="nav-link-non w-nav-link-non w--current w--nav-link-non-open"
              >
                Home
              </a>
              <a
                // href="/features"
                onClick={() => history.push("/features")}
                className="nav-link-non w-nav-link-non w--nav-link-non-open"
              >
                Features
              </a>
              <a
                // href="/about-us"
                onClick={() => history.push("/about-us")}
                className="nav-link-non w-nav-link-non w--nav-link-non-open"
              >
                About us
              </a>
              <a
                // href="/pricing"
                onClick={() => history.push("/pricing")}
                className="nav-link-non w-nav-link-non w--nav-link-non-open"
              >
                Pricing
              </a>
              <a
                // href="/faqs"
                onClick={() => history.push("/faqs")}
                className="nav-link-non w-nav-link-non w--nav-link-non-open"
              >
                FAQs
              </a>
            </div>
            <div className="nav-menu-right">
              <a
                // href="/contact"
                onClick={() => history.push("/contact")}
                className="nav-link-non w-nav-link-non w--nav-link-non-open"
              >
                Contact sales
              </a>
              <div className="nav-divider-vertical" />
              <button
                className="nav-link-non is-login"
                data-wf-user-logout="Log out"
                data-wf-user-login="Log in"
                type="button"
                // onClick={() => (window.location.href = "log-in")}
                onClick={() => history.push("/log-in")}
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