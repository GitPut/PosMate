import { View, Text } from "react-native";
import React from "react";
import Logo from "assets/dpos-logo.png";

const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="padding-global">
        <div className="container-large">
          <div className="footer-component">
            <div className="padding-bottom padding-xxlarge" />
            <div className="footer-content">
              <div
                id="w-node-b7a98846-3fbb-6bdf-6352-414eabb9ad7f-abb9ad79"
                className="footer-menu"
              >
                <div
                  id="w-node-_751bf445-5a04-0b5b-bc0b-f61a063847ca-abb9ad79"
                  className="footer-column is-logo"
                >
                  <a href="/" className="footer-logo-link w-inline-block">
                    <img
                      src={Logo}
                      loading="lazy"
                      alt="Logo link"
                      className="footer-logo"
                    />
                  </a>
                </div>
                <div
                  id="w-node-b7a98846-3fbb-6bdf-6352-414eabb9ad80-abb9ad79"
                  className="footer-column"
                >
                  <div className="text-size-regular text-weight-semibold text-color-white">
                    Pages
                  </div>
                  <div className="padding-bottom padding-medium" />
                  <div className="footer-list">
                    <a href="/" className="footer-link w-inline-block">
                      <div>Home</div>
                    </a>
                    <a href="/features" className="footer-link w-inline-block">
                      <div>Features</div>
                      <div className="footer-label">New</div>
                    </a>
                    <a href="/pricing" className="footer-link w-inline-block">
                      <div>Pricing</div>
                    </a>
                  </div>
                </div>
                <div
                  id="w-node-b7a98846-3fbb-6bdf-6352-414eabb9ad8f-abb9ad79"
                  className="footer-column"
                >
                  <div className="text-size-regular text-weight-semibold text-color-white">
                    Company
                  </div>
                  <div className="padding-bottom padding-medium" />
                  <div className="footer-list">
                    <a href="/about-us" className="footer-link w-inline-block">
                      <div>About us</div>
                    </a>
                    <a href="/faqs" className="footer-link w-inline-block">
                      <div>FAQs</div>
                    </a>
                    <a
                      href="/latest-updates"
                      className="footer-link w-inline-block"
                    >
                      <div>Changelog</div>
                    </a>
                    <a
                      href="/contact"
                      aria-current="page"
                      className="footer-link w-inline-block w--current"
                    >
                      <div>Contact sales</div>
                    </a>
                  </div>
                </div>
                <div
                  id="w-node-b7a98846-3fbb-6bdf-6352-414eabb9ad9c-abb9ad79"
                  className="footer-column"
                >
                  <div className="text-size-regular text-weight-semibold text-color-white">
                    Account
                  </div>
                  <div className="padding-bottom padding-medium" />
                  <div className="footer-list">
                    <a href="/log-in" className="footer-link w-inline-block">
                      <div>Log in</div>
                    </a>
                    <a href="/sign-up" className="footer-link w-inline-block">
                      <div>Sign up</div>
                    </a>
                    <a
                      href="/reset-password"
                      className="footer-link w-inline-block"
                    >
                      <div>Reset password</div>
                    </a>
                  </div>
                </div>
                <div
                  id="w-node-_7352c6ad-fddc-dd58-80b3-bea4e3fb461f-abb9ad79"
                  className="footer-column"
                >
                  <div className="text-size-regular text-weight-semibold text-color-white">
                    Need Tech Support?
                  </div>
                  <div className="padding-bottom padding-medium" />
                  <div className="footer-list">
                    <a
                      href="tel:(226) 600-5925"
                      className="footer-link w-inline-block"
                    >
                      <div>Call Support</div>
                    </a>
                    <a
                      href="mailTo:Contact@MictonWebDesign.com"
                      className="footer-link w-inline-block"
                    >
                      <div>Email Support</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="padding-bottom padding-xxlarge" />
            <div className="footer-bottom">
              <div className="text-size-small text-color-neutral-400">
                © Divine Pos 2023
              </div>
              <div className="footer-bottom-link-wrapper">
                <a
                  href="/legal"
                  className="text-size-small text-color-neutral-400"
                >
                  Terms of service
                </a>
                <a
                  href="/legal"
                  className="text-size-small text-color-neutral-400"
                >
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
