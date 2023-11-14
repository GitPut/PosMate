import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { signUp } from "state/firebaseFunctions";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setname] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [error, seterror] = useState(false); 

  const attemptSignUp = () => {
    if (email && password) {
      signUp(email, password, name, phoneNumber).catch((error) => {
        console.log(error);
        seterror(error.message);
      });
    }
  };

  return (
    <div className="w-users-userformpagewrap page-wrapper-non signup">
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
                  src={require("assets/dpos-logo-black.png")}
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
        <section className="section-signup">
          <div className="padding-global">
            <div className="max-width-small align-center">
              <div className="w-users-usersignupformwrapper signup-form-block">
                <div
                  tabIndex={-1}
                  className="w-users-userformsuccessstate signup-success-state-wrapper w-form-success"
                >
                  <div className="w-users-userformheader signup-success-header">
                    <div className="signup-success-icon w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 80 80"
                      >
                        <path
                          fill="currentColor"
                          d="m76.667 40-8.133-9.3 1.133-12.3-12.033-2.733L51.334 5 40.001 9.867 28.667 5l-6.3 10.633-12.033 2.7 1.133 12.334L3.334 40l8.133 9.3-1.133 12.333 12.033 2.734L28.667 75l11.334-4.9 11.333 4.867 6.3-10.634L69.667 61.6l-1.133-12.3 8.133-9.3Zm-45.4 13.367-7.933-8a3.32 3.32 0 0 1 0-4.7l.233-.234a3.36 3.36 0 0 1 4.734 0l5.366 5.4 17.167-17.2a3.36 3.36 0 0 1 4.733 0l.234.234c1.3 1.3 1.3 3.4 0 4.7l-19.734 19.8c-1.366 1.3-3.466 1.3-4.8 0Z"
                        />
                      </svg>
                    </div>
                    <div className="padding-bottom padding-large" />
                    <h2 className="heading-style-h4">Account activated</h2>
                  </div>
                  <div className="padding-bottom padding-small" />
                  <p className="text-size-regular text-align-center">
                    Your account was created successfully. You will be
                    redirected shortly.
                  </p>
                  <div className="padding-bottom padding-large" />
                  <div
                    data-wf-user-form-redirect
                    className="signup-link-wrapper"
                  >
                    <a href="/" className="form-link is-solo">
                      If nothing happens, click here.
                    </a>
                  </div>
                </div>
                <div className="padding-bottom padding-large" />
                <div className="padding-bottom padding-large" />
                <div className="padding-bottom padding-large" />
                <form
                  className="signup-form"
                  method="post"
                  data-wf-user-form-type="signup"
                >
                  <div className="w-users-userformheader signup-form-header">
                    <h2 className="heading-style-h4">Sign up</h2>
                  </div>
                  <div className="padding-bottom padding-large" />
                  <div className="signup-item-wrapper">
                    <label htmlFor="wf-sign-up-name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-input is-last w-input"
                      maxLength={256}
                      data-name="field"
                      data-wf-user-field="wf-user-field-name"
                      id="wf-sign-up-name"
                      required
                      onChange={(event) => setname(event.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="padding-bottom padding-small" />
                  <div className="signup-item-wrapper">
                    <label htmlFor="wf-sign-up-password" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="wf-sign-up-phoneNumber"
                      maxLength={256}
                      name="Company Name"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="Phone Number"
                      onChange={(event) => setphoneNumber(event.target.value)}
                      value={phoneNumber}
                    />
                  </div>
                  <div className="padding-bottom padding-small" />
                  <div className="signup-item-wrapper">
                    <label htmlFor="wf-sign-up-email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="wf-sign-up-email"
                      maxLength={256}
                      name="Email"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="email"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="padding-bottom padding-small" />
                  <div className="signup-item-wrapper">
                    <label htmlFor="wf-sign-up-password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="wf-sign-up-password"
                      maxLength={256}
                      name="Password"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="password"
                      onChange={(event) => setPassword(event.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="padding-bottom padding-large" />
                  <label className="w-checkbox signup-form-checkbox is-2-lines">
                    <input
                      type="checkbox"
                      name="Checkbox"
                      id="wf-sign-up-accept-privacy"
                      data-name="Checkbox"
                      required
                      data-wf-user-field="wf-user-field-accept-privacy"
                      style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                    />
                    <span
                      className="signup-checkbox-label w-form-label"
                      htmlFor="Checkbox"
                    >
                      By creating an account, I agree to Divine Pos's{" "}
                      <a href="/legal" className="form-link is-small">
                        terms of service
                      </a>
                    </span>
                  </label>
                  <div className="padding-bottom padding-small" />
                  <div className="padding-bottom padding-large" />
                  <Button
                    title="Sign Up"
                    className="w-users-userformbutton button w-button"
                    onPress={attemptSignUp}
                  />
                  <div className="padding-bottom padding-small" />
                  <div className="form-footer-wrapper">
                    <div className="w-users-userformfooter form-footer-content-wrapper">
                      <span className="text-size-regular">
                        Already have an account?
                      </span>
                      <a href="/log-in" className="form-link">
                        Log In
                      </a>
                    </div>
                  </div>
                </form>
                <Modal visible={error} transparent={true}>
                  <TouchableOpacity
                    onPress={() => seterror(false)}
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      data-wf-user-form-error="true"
                      className=" error-message "
                    >
                      <div className="user-form-error-msg">
                        There was an error signing you up. Please try again, or
                        contact us if you continue to have problems. ({error})
                      </div>
                    </div>
                  </TouchableOpacity>
                </Modal>
                <div
                  tabIndex={-1}
                  className="w-users-usersignupverificationmessage signup-verification-wrapper w-form-verification"
                  data-wf-user-form-verification="true"
                >
                  <div className="w-users-userformheader signup-verification-header">
                    <div className="signup-validation-icon-wrapper">
                      <div className="signup-validation-icon w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 80 80"
                        >
                          <path
                            fill="currentColor"
                            d="M63.335 36.667c3.766 0 7.2-1.3 10-3.4v30.066c0 3.667-3 6.667-6.667 6.667H13.335c-3.667 0-6.667-3-6.667-6.667v-40c0-3.666 3-6.666 6.667-6.666H47c-.2 1.066-.333 2.2-.333 3.333 0 4.933 2.167 9.3 5.567 12.367L40 40 17.668 26.033c-1.9-1.166-4.333.167-4.333 2.4 0 .967.5 1.867 1.333 2.4l23.567 14.734a3.372 3.372 0 0 0 3.533 0l15.9-9.934c1.8.634 3.667 1.034 5.667 1.034ZM53.335 20c0 5.533 4.466 10 10 10 5.533 0 10-4.467 10-10s-4.467-10-10-10c-5.534 0-10 4.467-10 10Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="padding-bottom padding-large" />
                    <h2 className="heading-style-h4">Verification required</h2>
                  </div>
                  <div className="padding-bottom padding-small" />
                  <p className="text-size-regular text-align-center">
                    Account verification required. Please check your email to
                    find your unique verification link.
                  </p>
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

export default Signup;
