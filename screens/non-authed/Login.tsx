import { View, Text } from "react-native";
import React, { useState } from "react";
import { signIn } from "state/firebaseFunctions";
import { Button } from "@react-native-material/core";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const attemptSignIn = () => {
    if (email && password) {
      signIn(email, password);
    }
  };

  return (
    <div className="w-users-userformpagewrap page-wrapper login">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration={400}
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="section-alt-nav w-nav"
      >
        <div className="padding-global">
          <div className="container-large w-container">
            <div className="alt-nav-component">
              <div
                id="w-node-dae1ef9d-0ebc-e93a-0f27-92678c58f5ea-2bf51074"
                className="alt-nav-item-wrapper"
              >
                <a
                  href="/"
                  className="button is-text text-color-black w-inline-block"
                >
                  <div className="icon-1x1-xsmall w-embed">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6673 9.16658H6.52565L11.184 4.50825L10.0007 3.33325L3.33398 9.99992L10.0007 16.6666L11.1757 15.4916L6.52565 10.8333H16.6673V9.16658Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>Back</div>
                </a>
              </div>
              <a
                href="/"
                className="nav-logo-link w-nav-brand"
                aria-label="home"
              >
                <img
                  src={require('assets/dpos-logo-black.png')}
                  loading="lazy"
                  alt=""
                  className="nav-logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="w-nav-overlay" data-wf-ignore id="w-nav-overlay-0" />
      </div>
      <main className="main-wrapper">
        <section className="section-login">
          <div className="padding-global">
            <div className="max-width-small align-center">
              <div className="w-users-userloginformwrapper login-form-block">
                <form
                  className="login-form"
                  data-wf-user-form-type="login"
                  data-wf-user-form-redirect="/"
                  method="post"
                >
                  <div className="w-users-userformheader login-form-header">
                    <h2 className="heading-style-h4">Log in</h2>
                  </div>
                  <div className="padding-bottom padding-large" />
                  <div className="login-item-wrapper">
                    <label htmlFor="wf-log-in-email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      maxLength={256}
                      onChange={(event) => setEmail(event.target.value)}
                      name="Email"
                      id="wf-log-in-email"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="email"
                    />
                  </div>
                  <div className="padding-bottom padding-small" />
                  <div className="login-item-wrapper">
                    <label htmlFor="wf-log-in-password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      maxLength={256}
                      onChange={(event) => setPassword(event.target.value)}
                      name="Password"
                      id="wf-log-in-password"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="password"
                    />
                  </div>
                  <div className="padding-bottom padding-large" />
                  {/* <button
                    className="w-users-userformbutton button w-button"
                    onClick={attemptSignIn}
                  >
                    Log In
                  </button> */}
                  <Button title="Login" onPress={attemptSignIn} />
                  <div className="padding-bottom padding-small" />
                  <div className="form-footer-wrapper">
                    <div className="w-users-userformfooter form-footer-content-wrapper">
                      <span className="text-size-regular">
                        Don't have an account?
                      </span>
                      <a href="/sign-up" className="form-link">
                        Sign Up
                      </a>
                    </div>
                    <a
                      href="/reset-password"
                      className="form-link text-align-center"
                    >
                      Forgot password
                    </a>
                  </div>
                </form>
                <div
                  style={{ display: "none" }}
                  data-wf-user-form-error="true"
                  className="w-users-userformerrorstate error-message w-form-fail"
                >
                  <div
                    className="user-form-error-msg"
                    wf-login-form-general-error-error="We're having trouble logging you in. Please try again, or contact us if you continue to have problems."
                    wf-login-form-invalid-email_or_password-error="Invalid email or password. Please try again."
                  >
                    We're having trouble logging you in. Please try again, or
                    contact us if you continue to have problems.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="utility-graphic-circle" />
          <div className="utility-graphic-circle-2" />
        </section>
      </main>
    </div>
  );
};

export default Login;
