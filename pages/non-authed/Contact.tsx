import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-native-material/core";
import Footer from "components/non-authed/Footer";
import firebase from "firebase/app";
import Axios from "axios";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const Contact = () => {
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [email, setemail] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [country, setcountry] = useState("");
  const [anythingElse, setanythingElse] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
   const history = useHistory();

  return (
    <div className="page-wrapper-non">
      <Helmet>
        <title>Divine POS - Contact</title>
        <meta
          name="description"
          content="Contact Divine POS for support, inquiries, or partnership opportunities."
        />
      </Helmet>
      <main className="main-wrapper">
        <section className="section-contact">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-medium">
                <div className="w-layout-grid contact-component">
                  <div className="contact-content">
                    <div className="max-width-large tablet-full">
                      <div className="contact-title-component">
                        <div className="contact-title-wrapper">
                          <div className="tagline text-color-white">
                            Contact us
                          </div>
                          <div className="padding-bottom padding-small" />
                          <h1 className="heading-style-h3 text-color-white">
                            Contact our sales team
                          </h1>
                          <div className="padding-bottom padding-medium" />
                          <p className="text-size-medium text-color-white">
                            Wondering if Divine Pos is the right tool for your
                            business? Chat with our team to see if there’s a
                            fit.
                          </p>
                        </div>
                        <div className="padding-vertical padding-xxlarge">
                          <div className="divider-bar" />
                        </div>
                        <div className="contact-benefit-wrapper">
                          <div className="contact-benefit-item">
                            <div className="icon-1x1-small w-embed">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2 .55 0 1-.45 1-1v-4.81c0-3.83 2.95-7.18 6.78-7.29a7.007 7.007 0 0 1 7.22 7V19h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62Z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M9 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM15 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47Z"
                                />
                              </svg>
                            </div>
                            <div className="padding-bottom padding-small" />
                            <div className="text-size-regular text-weight-semibold">
                              Support
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <p className="text-size-small">
                              Need a hand using Divine Pos or managing your
                              account? Chat with a real, live human and get all
                              the answers you need.
                            </p>
                            <br />
                            <p className="text-size-small">
                              Call (226) 600-5925
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-content-form">
                    <div className="contact-form-block w-form">
                      <form
                        id="wf-form-Contact-Form"
                        name="wf-form-Contact-Form"
                        data-name="Contact Form"
                        method="get"
                        className="contact-form"
                        aria-label="Contact Form"
                      >
                        <h2 className="heading-style-h6 text-weight-semibold">
                          Contact our sales team
                        </h2>
                        <div className="padding-bottom padding-large" />
                        <div className="contact-input-group">
                          <div className="contact-item-wrapper">
                            <label
                              htmlFor="name"
                              className="contact-field-label"
                            >
                              First name *
                            </label>
                            <div className="padding-bottom padding-xsmall" />
                            <input
                              type="text"
                              className="form-input is-small is-last w-input"
                              maxLength={256}
                              name="First-name"
                              data-name="First name"
                              placeholder="John"
                              id="First-name"
                              required
                              value={first}
                              onChange={(event) => setfirst(event.target.value)}
                            />
                          </div>
                          <div className="contact-item-wrapper">
                            <label
                              htmlFor="name-2"
                              className="contact-field-label"
                            >
                              Last name *
                            </label>
                            <div className="padding-bottom padding-xsmall" />
                            <input
                              type="text"
                              className="form-input is-small is-last w-input"
                              maxLength={256}
                              name="Last-name"
                              data-name="Last name"
                              placeholder="Doe"
                              id="Last-name-2"
                              required
                              value={last}
                              onChange={(event) => setlast(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="contact-item-wrapper">
                          <label htmlFor="name" className="contact-field-label">
                            Work email *
                          </label>
                          <div className="padding-bottom padding-xsmall" />
                          <input
                            type="email"
                            className="form-input is-small is-last w-input"
                            maxLength={256}
                            name="Work-email"
                            data-name="Work email"
                            placeholder="john@gmail.com"
                            id="Work-email"
                            required
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                          />
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="contact-item-wrapper">
                          <label htmlFor="name" className="contact-field-label">
                            Company name *
                          </label>
                          <div className="padding-bottom padding-xsmall" />
                          <input
                            type="text"
                            className="form-input is-small is-last w-input"
                            maxLength={256}
                            name="Company-name"
                            data-name="Company name"
                            placeholder="Divine Pos Inc."
                            id="Company-name"
                            required
                            value={companyName}
                            onChange={(event) =>
                              setcompanyName(event.target.value)
                            }
                          />
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="contact-item-wrapper">
                          <label htmlFor="name" className="contact-field-label">
                            Country or region*
                          </label>
                          <div className="padding-bottom padding-xsmall" />
                          <input
                            type="text"
                            className="form-input is-small is-last w-input"
                            maxLength={256}
                            name="Region"
                            data-name="Region"
                            placeholder="Name of country/region"
                            id="Region"
                            required
                            value={country}
                            onChange={(event) => setcountry(event.target.value)}
                          />
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="contact-item-wrapper">
                          <label htmlFor="name-5">Anyting else?</label>
                          <div className="padding-bottom padding-xsmall" />
                          <input
                            type="text"
                            className="form-input is-small is-last w-input"
                            maxLength={256}
                            name="Notes"
                            data-name="Notes"
                            placeholder="How are you looking to use Divine Pos?"
                            id="Notes"
                            required
                            value={anythingElse}
                            onChange={(event) =>
                              setanythingElse(event.target.value)
                            }
                          />
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="text-size-regular">
                          By submitting this form, I acknowledge receipt of the
                          <a
                            // href="/legal"
                            onClick={() => history.push("/legal")}
                            className="form-link">
                            Privacy Policy.
                          </a>
                        </div>
                        <div className="padding-bottom padding-xsmall" />
                        <div className="text-size-regular">
                          Fields marked with an asterisk ( * ) are required.
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <input
                          type="submit"
                          defaultValue="Submit"
                          data-wait="Please wait..."
                          className="button w-button"
                          onClick={() => {
                            if (
                              !first ||
                              !last ||
                              !email ||
                              !companyName ||
                              !country
                            ) {
                              seterror(true);
                              return;
                            }
                            event.preventDefault();
                            setsuccess(false);
                            seterror(false);
                            var data = JSON.stringify({
                              email: email,
                              name: "",
                              message: `Hello ${first} ${last} with the company ${companyName} in the country ${country}, wants more information. Here are the notes: ${anythingElse}`,
                            });

                            var config = {
                              method: "post",
                              maxBodyLength: Infinity,
                              url: "https://us-central1-posmate-5fc0a.cloudfunctions.net/sendEmail",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              data: data,
                            };

                            Axios(config)
                              .then(function (response) {
                                console.log(JSON.stringify(response.data));
                                setsuccess(true);
                              })
                              .catch(function (error) {
                                console.log(error);
                                seterror(true);
                              });
                            setfirst("");
                            setlast("");
                            setemail("");
                            setcountry("");
                            setcompanyName("");
                            setanythingElse("");
                          }}
                        />
                      </form>
                      <div
                        style={
                          !success ? { display: "none" } : { display: "block" }
                        }
                        className="success-message contact w-form-done"
                        tabIndex={-1}
                        role="region"
                        aria-label="Contact Form success"
                      >
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div
                        style={
                          !error ? { display: "none" } : { display: "block" }
                        }
                        className="error-message w-form-fail"
                        tabIndex={-1}
                        role="region"
                        aria-label="Contact Form failure"
                      >
                        <div>
                          Oops! Something went wrong while submitting the form.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graphic-circle" />
          <div className="graphic-circle-3" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
