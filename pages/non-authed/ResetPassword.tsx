import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import Axios from "axios";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, seterror] = useState(false);
  const history = useHistory();

  return (
    <div className="w-users-userformpagewrap page-wrapper-non reset-password">
      <Helmet>
        <title>Divine POS - Reset Password</title>
        <meta
          name="description"
          content="Reset your Divine POS account password securely and easily."
        />
      </Helmet>
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
                  // href="/"
                  onClick={() => history.push("/log-in")}
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
                href="https://divinepos.com"
                // onClick={() => history.push("/")}
                className="nav-logo-link w-nav-brand"
                aria-label="home"
              >
                <img
                  src={require("assets/dpos-logo-black.png")}
                  alt="Divine-POS-Logo"
                  className="nav-logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="w-nav-overlay" data-wf-ignore id="w-nav-overlay-0" />
      </div>
      <main className="main-wrapper">
        <section className="section-reset">
          <div className="padding-global">
            <div className="max-width-small align-center">
              <div className="w-users-userresetpasswordformwrapper reset-password-form-block">
                <div
                  tabIndex={-1}
                  className="w-users-userformsuccessstate reset-password-success-wrapper w-form-success"
                >
                  <div className="w-users-userformheader reset-password-success-header">
                    <div className="reset-password-icon-wrapper">
                      <div className="reset-password-icon w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 80 80"
                        >
                          <path
                            fill="currentColor"
                            d="M63.333 36.667c3.766 0 7.2-1.3 10-3.4v30.066c0 3.667-3 6.667-6.667 6.667H13.333c-3.667 0-6.667-3-6.667-6.667v-40c0-3.666 3-6.666 6.667-6.666h33.666c-.2 1.066-.333 2.2-.333 3.333 0 4.933 2.167 9.3 5.567 12.367L39.999 40 17.666 26.033c-1.9-1.166-4.333.167-4.333 2.4 0 .967.5 1.867 1.333 2.4l23.567 14.734a3.371 3.371 0 0 0 3.533 0l15.9-9.934c1.8.634 3.667 1.034 5.667 1.034ZM53.333 20c0 5.533 4.466 10 10 10 5.533 0 10-4.467 10-10s-4.467-10-10-10c-5.534 0-10 4.467-10 10Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="padding-bottom padding-large" />
                    <h2 className="heading-style-h4">
                      Password reset
                      <br />
                      email sent
                    </h2>
                  </div>
                  <div className="padding-bottom padding-small" />
                  <p className="text-size-regular text-align-center">
                    If we found an account associated with that email address,
                    we've sent a link to reset your password.
                  </p>
                </div>
                <form
                  className="reset-password-form"
                  method="post"
                  data-wf-user-form-type="resetPassword"
                >
                  <div className="w-users-userformheader reset-password-form-header">
                    <h2 className="heading-style-h4">Reset password</h2>
                  </div>
                  <div className="padding-bottom padding-small" />
                  <p className="text-size-regular">
                    Please enter your new password in the field below. Make sure
                    you are not using your current password.
                  </p>
                  <div className="padding-bottom padding-large" />
                  <div className="reset-password-item-wrapper">
                    <label
                      htmlFor="wf-reset-password-email"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(event) => setEmail(event.target.value)}
                      maxLength={256}
                      name="Email"
                      id="wf-reset-password-email"
                      aria-describedby="wf-reset-password-paragraph"
                      className="form-input is-last w-input"
                      required
                      data-wf-user-form-input-type="email"
                      value={email}
                    />
                  </div>
                  <div className="padding-bottom padding-large" />
                  <input
                    type="submit"
                    defaultValue="Reset password"
                    data-wait="Please wait..."
                    className="w-users-userformbutton button w-button"
                    wf-submit-button-value="Reset password"
                    onClick={() => {
                      event.preventDefault();
                      const data = JSON.stringify({
                        email: email,
                      });

                      const config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: "https://us-central1-posmate-5fc0a.cloudfunctions.net/sendPasswordResetEmail",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: data,
                      };

                      Axios(config)
                        .then(function (response) {
                          console.log(JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                          console.log(error);
                          seterror(true);
                        });
                      setEmail("");
                    }}
                  />
                </form>
                <div
                  style={!error ? { display: "none" } : { display: "inline" }}
                  data-wf-user-form-error="true"
                  className="w-users-userformerrorstate error-message w-form-fail"
                >
                  <div
                    className="user-form-error-msg"
                    wf-reset-pw-form-general-error-error="There was an error resetting your password. Please try again, or contact us if you continue to have problems."
                  >
                    There was an error resetting your password. Please try
                    again, or contact us if you continue to have problems.
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

export default ResetPassword;
