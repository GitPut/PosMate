import { View, Text } from "react-native";
import React from "react";
import { Button } from "@react-native-material/core";
import Footer from "components/Footer";

const Contact = () => {
  return (
    <div className="page-wrapper">
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
                          </div>
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
                                  d="M18.109 13.001h-5.06a8.974 8.974 0 0 1-4.94 7.05 3.003 3.003 0 0 1-3.55 2.9c-1.2-.21-2.19-1.2-2.4-2.4a2.998 2.998 0 0 1 2.95-3.55c.95 0 1.78.45 2.33 1.14a6.969 6.969 0 0 0 3.58-5.14h-3.1a2.996 2.996 0 0 1-3.42 1.94c-1.18-.23-2.13-1.2-2.35-2.38a3.013 3.013 0 0 1 2.96-3.56c1.3 0 2.4.84 2.82 2h3.1c-.32-2.23-1.69-4.1-3.59-5.14-.64.8-1.67 1.28-2.81 1.1-1.23-.19-2.26-1.19-2.47-2.42a3.005 3.005 0 0 1 2.95-3.54 2.99 2.99 0 0 1 2.99 2.95 8.974 8.974 0 0 1 4.94 7.05h5.07v-1.79c0-.45.54-.67.85-.35l2.79 2.79c.2.2.2.51 0 .71l-2.79 2.79a.5.5 0 0 1-.85-.36v-1.79Z"
                                />
                              </svg>
                            </div>
                            <div className="padding-bottom padding-small" />
                            <div className="text-size-regular text-weight-semibold">
                              Media
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <p className="text-size-small">
                              We love working with journalists to share
                              compelling stories. Send us a note and our PR and
                              Communications Manager will be in touch.
                            </p>
                          </div>
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
                                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3Zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5Zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5Z"
                                />
                              </svg>
                            </div>
                            <div className="padding-bottom padding-small" />
                            <div className="text-size-regular text-weight-semibold">
                              Partnerships
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <p className="text-size-small">
                              We’re into co-marketing with awesome brands. Fill
                              out the form here, and our Partnerships Manager
                              will circle back.
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
                          />
                        </div>
                        <div className="padding-bottom padding-medium" />
                        <div className="text-size-regular">
                          By submitting this form, I acknowledge receipt of the
                          <a href="/legal" className="form-link">
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
                        />
                        <a
                          href={`mailto:contact@mictonwebdesign.com?subject=Hello Sub&body=IM the body`}
                        >
                          Click to Send an Email
                        </a>
                        {/* <Button title="Send Email" onPress={SendEmail} /> */}
                      </form>
                      <div
                        className="success-message contact w-form-done"
                        tabIndex={-1}
                        role="region"
                        aria-label="Contact Form success"
                      >
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div
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
