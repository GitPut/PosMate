import { View, Text } from "react-native";
import React, { useState } from "react";
import Footer from "components/non-authed/Footer";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const Pricing = () => {
  const history = useHistory();
  
  return (
    <div className="page-wrapper-non">
      <Helmet>
        <title>Divine POS - Pricing</title>
        <meta
          name="description"
          content="Explore Divine POS pricing plans and choose the best option for your business."
        />
      </Helmet>
      <main className="main-wrapper">
        <section className="section-pricing">
          <div className="padding-global">
            <div className="container-large">
              <div className="pricing-component">
                <div className="max-width-xlarge align-center text-align-center">
                  <div className="tagline text-color-white">Pricing</div>
                  <div className="padding-bottom padding-small" />
                  <h1 className="heading-style-h2 text-color-white">
                    Compare plans
                  </h1>
                  <div className="padding-bottom padding-medium" />
                  <p className="text-size-xlarge text-color-white">
                    Choose one that best suits you and your business's needs.
                  </p>
                  <div className="padding-bottom padding-medium" />
                </div>
                <div className="padding-bottom padding-xlarge" />
                <div
                  data-current="Monthly plans"
                  data-easing="ease"
                  data-duration-in={300}
                  data-duration-out={100}
                  className="pricing-tabs-component w-tabs"
                >
                  <div className="pricing-tabs-content w-tab-content">
                    <div
                      data-w-tab="Monthly plans"
                      className="pricing-tab-pane w-tab-pane w--tab-active"
                      id="w-tabs-0-data-w-pane-0"
                      role="tabpanel"
                      aria-labelledby="w-tabs-0-data-w-tab-0"
                    >
                      <div className="w-layout-grid pricing-plans">
                        <div className="pricing-plan">
                          <div className="pricing-plan-content">
                            <div className="pricing-plan-label-wrapper">
                              <div className="text-size-xlarge text-weight-semibold text-color-neutral-900">
                                Monthly Billing
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    viewBox="0 0 25 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12.332 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <div className="heading-style-h3">
                              $50
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="padding-bottom padding-medium" />
                            <a
                              // href="/sign-up"
                              onClick={() => history.push("/sign-up")}
                              className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Charged every month. You can cancel anytime
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-_0b515f87-6e60-2df8-032f-aa94224f6627-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Core features:
                              </div>
                              <div className="pricing-plan-feature-list-wrapper">
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Cloud based POS software
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Easy to use
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    WooCommerce Integration
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Saved transactions
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    24/H Support
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pricing-plan">
                          <div className="pricing-plan-content">
                            <div className="pricing-plan-label-wrapper">
                              <div className="text-size-xlarge text-weight-semibold text-color-neutral-900">
                                Annual Billing
                              </div>
                              <div className="featured-icon is-pricing">
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
                                      d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91ZM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V17c0 .55.45 1 1 1h3.5v-1.61c0-.83.23-1.61.63-2.29ZM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H23c.55 0 1-.45 1-1v-.57ZM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <div className="heading-style-h3">
                              $40
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="padding-bottom padding-medium" />{" "}
                            <a
                              // href="/sign-up"
                              onClick={() => history.push("/sign-up")}
                              className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Our excellent Pos software billed annualy
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-_0b515f87-6e60-2df8-032f-aa94224f6627-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Core features:
                              </div>
                              <div className="pricing-plan-feature-list-wrapper">
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Cloud based POS software
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Easy to use
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    WooCommerce Integration
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    Saved transactions
                                  </div>
                                </div>
                                <div className="check-item">
                                  <div className="check-icon is-small">
                                    <div className="icon-1x1-xxsmall w-embed">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 21.56L6.43996 16L4.54663 17.88L12 25.3333L28 9.33331L26.12 7.45331L12 21.56Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-size-small">
                                    24/H Support
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graphic-container">
            <div className="graphic-wrapper">
              <div className="graphic-circle is-small" />
              <div className="graphic-circle-3 is-small" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
