import { View, Text } from "react-native";
import React from "react";

const Pricing = () => {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className="section-pricing">
          <div className="padding-global">
            <div className="container-large">
              <div className="pricing-component">
                <div className="padding-bottom padding-huge" />
                <div className="max-width-xlarge align-center text-align-center">
                  <div className="tagline text-color-white">Pricing</div>
                  <div className="padding-bottom padding-small" />
                  <h1 className="heading-style-h2 text-color-white">
                    Compare plans
                  </h1>
                  <div className="padding-bottom padding-medium" />
                  <p className="text-size-xlarge text-color-white">
                    Choose one that best suits you and your team's needs.
                  </p>
                </div>
                <div className="padding-bottom padding-xlarge" />
                <div
                  data-current="Monthly plans"
                  data-easing="ease"
                  data-duration-in={300}
                  data-duration-out={100}
                  className="pricing-tabs-component w-tabs"
                >
                  <div className="pricing-tabs-menu w-tab-menu" role="tablist">
                    <a
                      data-w-tab="Monthly plans"
                      className="pricing-tab-link w-inline-block w-tab-link w--current"
                      id="w-tabs-0-data-w-tab-0"
                      href="#w-tabs-0-data-w-pane-0"
                      role="tab"
                      aria-controls="w-tabs-0-data-w-pane-0"
                      aria-selected="true"
                    >
                      <div>Monthly billing</div>
                    </a>
                    <a
                      data-w-tab="Yearly plans"
                      className="pricing-tab-link w-inline-block w-tab-link"
                      tabIndex={-1}
                      id="w-tabs-0-data-w-tab-1"
                      href="#w-tabs-0-data-w-pane-1"
                      role="tab"
                      aria-controls="w-tabs-0-data-w-pane-1"
                      aria-selected="false"
                    >
                      <div>Annual billing</div>
                    </a>
                  </div>
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
                                Solo
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
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
                              $8<span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Perfect for personal projects
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
                                    Maximum number of seats
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
                                    Activity log
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
                                    Embedded documents
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
                                    Updates section
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
                                Professional
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
                                    fill="none"
                                    viewBox="0 0 25 24"
                                  >
                                    <g fill="currentColor" clipPath="url(#a)">
                                      <path d="M22.664 9V8c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1ZM8.664 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM8.664 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4ZM13.174 4.05A6.016 6.016 0 0 1 14.664 8c0 1.51-.57 2.89-1.49 3.95 1.96-.25 3.49-1.91 3.49-3.95s-1.53-3.7-3.49-3.95ZM17.194 13.83c.89.83 1.47 1.87 1.47 3.17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17Z" />
                                    </g>
                                    <defs>
                                      <clipPath id="a">
                                        <path
                                          fill="currentColor"
                                          d="M.664 0h24v24h-24z"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <div className="heading-style-h3">
                              $16
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Optimized for scale
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-_0b515f87-6e60-2df8-032f-aa94224f6655-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Everything in Solo, plus:
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
                                    Unlimited boards
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
                                    Zoom integration
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
                                    iOS and Android apps
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
                                    Customizable notifications
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
                                Business
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
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
                              $48
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Tailored to your business
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-_0b515f87-6e60-2df8-032f-aa94224f6683-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Everything in Professional, plus:
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
                                    Embedded documents
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
                                    Whiteboard collaboration
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
                                    Guest access
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
                                    Integrations
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-tab="Yearly plans"
                      className="pricing-tab-pane w-tab-pane"
                      id="w-tabs-0-data-w-pane-1"
                      role="tabpanel"
                      aria-labelledby="w-tabs-0-data-w-tab-1"
                    >
                      <div className="w-layout-grid pricing-plans">
                        <div className="pricing-plan">
                          <div className="pricing-plan-content">
                            <div className="pricing-plan-label-wrapper">
                              <div className="text-size-xlarge text-weight-semibold text-color-neutral-900">
                                Solo
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
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
                              $6<span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Perfect for personal projects
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-d5b1a4ea-36fc-94aa-fc43-1ae14efa0b09-50891d9b"
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
                                    Maximum number of seats
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
                                    Activity log
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
                                    Embedded documents
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
                                    Updates section
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
                                Professional
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
                                    fill="none"
                                    viewBox="0 0 25 24"
                                  >
                                    <g fill="currentColor" clipPath="url(#a)">
                                      <path d="M22.664 9V8c0-.55-.45-1-1-1s-1 .45-1 1v1h-1c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .55.45 1 1 1s1-.45 1-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1ZM8.664 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM8.664 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4ZM13.174 4.05A6.016 6.016 0 0 1 14.664 8c0 1.51-.57 2.89-1.49 3.95 1.96-.25 3.49-1.91 3.49-3.95s-1.53-3.7-3.49-3.95ZM17.194 13.83c.89.83 1.47 1.87 1.47 3.17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17Z" />
                                    </g>
                                    <defs>
                                      <clipPath id="a">
                                        <path
                                          fill="currentColor"
                                          d="M.664 0h24v24h-24z"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <div className="heading-style-h3">
                              $11
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Optimized for scale
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-d5b1a4ea-36fc-94aa-fc43-1ae14efa0b37-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Everything in Solo, plus:
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
                                    Unlimited boards
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
                                    Zoom integration
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
                                    iOS and Android apps
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
                                    Customizable notifications
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
                                Business
                              </div>
                              <div className="featured-icon is-pricing">
                                <div className="icon-1x1-small w-embed">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width=" 100%"
                                    height=" 100%"
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
                              $39
                              <span className="heading-style-h5">/month</span>
                            </div>
                            <div className="padding-bottom padding-xsmall" />
                            <div className="text-size-small">
                              For 14 days, no credit card required
                            </div>
                            <div className="padding-bottom padding-medium" />
                            <a href="/sign-up" className="button w-button">
                              Get started
                            </a>
                            <div className="padding-bottom padding-medium" />
                            <div className="text-size-regular">
                              Tailored to your business
                            </div>
                            <div className="pricing-plan-divider" />
                            <div className="pricing-plan-feature-list">
                              <div
                                id="w-node-d5b1a4ea-36fc-94aa-fc43-1ae14efa0b65-50891d9b"
                                className="text-size-regular text-weight-semibold text-color-neutral-800"
                              >
                                Everything in Professional, plus:
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
                                    Embedded documents
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
                                    Whiteboard collaboration
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
                                    Guest access
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
                                    Integrations
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
        <section className="section-logos">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-vertical padding-xlarge">
                <div className="text-align-center">
                  <div className="text-size-regular text-weight-medium">
                    Trusted by 500+ innovative companies worldwide
                  </div>
                  <div className="padding-bottom padding-xlarge" />
                  <div className="logos-layout">
                    <div className="logos-logo-wrapper">
                      <div className="logo w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 100%"
                          height=" 100%"
                          fill="none"
                          viewBox="0 0 140 40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M3.483 29.197a15.082 15.082 0 0 0 5.705 4.49A14.947 14.947 0 0 0 15.334 35a14.956 14.956 0 0 0 11.577-5.461 15.033 15.033 0 0 0 2.156-3.496A14.949 14.949 0 0 0 30.334 20c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15a14.965 14.965 0 0 0 2.003 7.493c.343.595.727 1.164 1.146 1.704Zm.844-3.267c.284.526.605 1.03.96 1.507l2.751-2.684a10 10 0 0 1 13.967 0l3.109 3.033c.368-.462.704-.951 1.005-1.463l-4.114-4.014a10 10 0 0 0-13.967 0l-3.71 3.62Zm22.887-2.031c.402-1.227.62-2.538.62-3.899 0-6.904-5.596-12.5-12.5-12.5s-12.5 5.596-12.5 12.5c0 1.19.166 2.34.476 3.429l2.982-2.91c4.856-4.736 12.603-4.736 17.459 0l3.463 3.38Zm-3.845 5.677-3.11-3.034a7.5 7.5 0 0 0-10.475 0l-2.815 2.746c.55.497 1.145.944 1.777 1.337l2.784-2.716a5 5 0 0 1 6.983 0l3.02 2.948c.651-.373 1.265-.802 1.836-1.281Zm-4.31 2.36-2.292-2.237a2.5 2.5 0 0 0-3.491 0l-2.134 2.08c1.31.467 2.722.721 4.192.721 1.298 0 2.549-.198 3.726-.565Z"
                            clipRule="evenodd"
                          />
                          <path
                            fill="currentColor"
                            d="M40.334 29.44V10.773h12.053v2.747h-8.64v5.227h6.987v2.693h-6.987v8h-3.413ZM56.782 14.16c-.623 0-1.138-.187-1.547-.56-.391-.373-.587-.845-.587-1.413 0-.57.196-1.031.587-1.387.409-.373.924-.56 1.547-.56.622 0 1.128.187 1.52.56.408.355.613.818.613 1.387 0 .569-.205 1.04-.614 1.413-.39.373-.897.56-1.52.56Zm-1.707 15.28V16.213h3.413V29.44h-3.413ZM62.05 29.44V16.213h3.04l.32 2.48a5.464 5.464 0 0 1 1.948-2.026c.835-.516 1.813-.774 2.933-.774v3.6h-.96c-.747 0-1.413.116-2 .347a2.758 2.758 0 0 0-1.387 1.2c-.32.569-.48 1.36-.48 2.373v6.027h-3.413ZM72.624 29.44V16.213h3.013L75.93 18a4.613 4.613 0 0 1 1.68-1.52c.712-.391 1.53-.587 2.454-.587 2.044 0 3.493.791 4.346 2.374a5.165 5.165 0 0 1 1.92-1.734 5.68 5.68 0 0 1 2.667-.64c1.725 0 3.049.516 3.973 1.547.925 1.031 1.387 2.542 1.387 4.533v7.467h-3.413v-7.147c0-1.137-.222-2.009-.667-2.613-.427-.604-1.093-.907-2-.907-.924 0-1.671.338-2.24 1.014-.551.675-.827 1.617-.827 2.826v6.827h-3.413v-7.147c0-1.137-.222-2.009-.667-2.613-.444-.604-1.129-.907-2.053-.907-.907 0-1.644.338-2.213 1.014-.551.675-.827 1.617-.827 2.826v6.827h-3.413ZM103.064 29.76c-1.173 0-2.204-.187-3.093-.56-.889-.391-1.6-.924-2.133-1.6a4.594 4.594 0 0 1-.96-2.347h3.44c.106.516.391.96.853 1.334.48.355 1.093.533 1.84.533.747 0 1.289-.151 1.627-.453.355-.303.533-.65.533-1.04 0-.57-.249-.951-.747-1.147-.497-.213-1.191-.418-2.08-.613a22.759 22.759 0 0 1-1.733-.454 8.898 8.898 0 0 1-1.627-.666 3.77 3.77 0 0 1-1.173-1.067c-.302-.445-.453-.987-.453-1.627 0-1.173.462-2.16 1.386-2.96.943-.8 2.258-1.2 3.947-1.2 1.564 0 2.809.365 3.733 1.094.943.729 1.503 1.733 1.68 3.013h-3.226c-.196-.978-.934-1.467-2.214-1.467-.64 0-1.137.125-1.493.374-.338.248-.507.56-.507.933 0 .391.258.702.774.933.515.231 1.2.445 2.053.64.924.214 1.769.454 2.533.72.783.25 1.405.631 1.867 1.147.462.498.693 1.218.693 2.16a3.708 3.708 0 0 1-.64 2.213c-.444.658-1.084 1.174-1.92 1.547-.835.373-1.822.56-2.96.56ZM116.568 29.76c-1.653 0-2.933-.516-3.84-1.547-.889-1.03-1.333-2.542-1.333-4.533v-7.467h3.386v7.147c0 1.138.232 2.009.694 2.613.462.605 1.191.907 2.186.907.943 0 1.716-.338 2.32-1.013.623-.676.934-1.618.934-2.827v-6.827h3.413V29.44h-3.013l-.267-2.24a4.622 4.622 0 0 1-1.787 1.867c-.764.462-1.662.693-2.693.693ZM133.299 29.76c-1.174 0-2.205-.187-3.094-.56-.888-.391-1.6-.924-2.133-1.6a4.6 4.6 0 0 1-.96-2.347h3.44c.107.516.391.96.853 1.334.48.355 1.094.533 1.84.533.747 0 1.289-.151 1.627-.453.356-.303.533-.65.533-1.04 0-.57-.248-.951-.746-1.147-.498-.213-1.191-.418-2.08-.613a22.781 22.781 0 0 1-1.734-.454 8.927 8.927 0 0 1-1.626-.666 3.78 3.78 0 0 1-1.174-1.067c-.302-.445-.453-.987-.453-1.627 0-1.173.462-2.16 1.387-2.96.942-.8 2.258-1.2 3.946-1.2 1.565 0 2.809.365 3.734 1.094.942.729 1.502 1.733 1.68 3.013h-3.227c-.195-.978-.933-1.467-2.213-1.467-.64 0-1.138.125-1.494.374-.337.248-.506.56-.506.933 0 .391.258.702.773.933.516.231 1.2.445 2.053.64.925.214 1.769.454 2.534.72.782.25 1.404.631 1.866 1.147.463.498.694 1.218.694 2.16a3.715 3.715 0 0 1-.64 2.213c-.445.658-1.085 1.174-1.92 1.547-.836.373-1.822.56-2.96.56Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="logos-logo-wrapper">
                      <div className="logo w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 100%"
                          height=" 100%"
                          fill="none"
                          viewBox="0 0 164 40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M14.025 10.74A15 15 0 0 0 15.167 5a15 15 0 0 0 15 15v-6a9 9 0 0 1-9-9h-12a9 9 0 0 1-9 9v6a15 15 0 0 0 13.858-9.26ZM15.167 20a15 15 0 0 0 15 15v-6a9 9 0 0 1-9-9h-6Zm-1.142 5.74A15 15 0 0 0 15.167 20h-6a9 9 0 0 1-9 9v6a15 15 0 0 0 13.858-9.26Z"
                            clipRule="evenodd"
                          />
                          <path
                            fill="currentColor"
                            d="M47.447 29.707c-1.422 0-2.684-.25-3.787-.747-1.084-.515-1.938-1.253-2.56-2.213-.622-.96-.933-2.134-.933-3.52v-.694h3.173v.694c0 1.226.374 2.142 1.12 2.747.747.604 1.743.906 2.987.906 1.262 0 2.213-.258 2.853-.773.64-.516.96-1.182.96-2 0-.551-.15-.996-.453-1.334-.302-.355-.747-.64-1.333-.853a17.827 17.827 0 0 0-2.08-.613l-.8-.16c-1.227-.285-2.294-.64-3.2-1.067-.89-.444-1.574-1.013-2.054-1.706-.48-.694-.72-1.6-.72-2.72s.267-2.08.8-2.88c.534-.8 1.29-1.414 2.267-1.84.978-.427 2.124-.64 3.44-.64 1.316 0 2.489.222 3.52.666 1.031.445 1.84 1.111 2.427 2 .604.889.906 2 .906 3.334v.88h-3.173v-.88c0-.765-.151-1.378-.453-1.84a2.606 2.606 0 0 0-1.28-1.014c-.551-.213-1.2-.32-1.947-.32-1.102 0-1.938.214-2.507.64-.569.427-.853 1.031-.853 1.813 0 .498.124.925.373 1.28.267.338.65.623 1.147.854.516.213 1.156.4 1.92.56l.8.186c1.28.285 2.4.65 3.36 1.094.96.427 1.707.995 2.24 1.706.551.712.827 1.636.827 2.774 0 1.12-.294 2.107-.88 2.96-.57.853-1.378 1.52-2.427 2-1.031.48-2.258.72-3.68.72ZM63.591 29.707c-1.316 0-2.498-.267-3.547-.8a6.284 6.284 0 0 1-2.453-2.32c-.587-1.014-.88-2.222-.88-3.627v-.427c0-1.404.293-2.613.88-3.626a6.04 6.04 0 0 1 2.453-2.32c1.05-.534 2.231-.8 3.547-.8 1.315 0 2.489.266 3.52.8a5.866 5.866 0 0 1 2.427 2.32c.604 1.013.906 2.222.906 3.627v.426c0 1.405-.302 2.613-.906 3.627a6.096 6.096 0 0 1-2.427 2.32c-1.031.533-2.205.8-3.52.8Zm0-2.72c1.12 0 2.035-.356 2.747-1.067.71-.729 1.066-1.742 1.066-3.04v-.267c0-1.297-.355-2.302-1.066-3.013-.712-.729-1.627-1.093-2.747-1.093-1.12 0-2.036.364-2.747 1.093-.71.711-1.066 1.716-1.066 3.013v.267c0 1.298.355 2.311 1.066 3.04.711.711 1.627 1.067 2.747 1.067ZM78.745 29.547c-1.013 0-1.911-.222-2.693-.667a4.719 4.719 0 0 1-1.814-1.92c-.426-.835-.64-1.804-.64-2.907V16.16h3.04v7.654c0 1.066.258 1.857.774 2.373.533.515 1.28.773 2.24.773 1.084 0 1.938-.355 2.56-1.067.64-.71.96-1.733.96-3.066V16.16h3.04v13.174h-2.987v-1.84h-.453c-.231.48-.658.942-1.28 1.386-.605.445-1.52.667-2.747.667ZM90.111 29.334V16.16h3.014V18h.453c.231-.498.649-.969 1.253-1.413.605-.445 1.52-.667 2.747-.667 1.013 0 1.911.231 2.693.693a4.718 4.718 0 0 1 1.814 1.92c.444.818.666 1.787.666 2.907v7.893h-3.066V21.68c0-1.067-.267-1.858-.8-2.373-.516-.534-1.254-.8-2.214-.8-1.084 0-1.937.364-2.56 1.093-.622.711-.933 1.733-.933 3.067v6.666h-3.067ZM111.904 29.707a6.032 6.032 0 0 1-2.986-.774c-.925-.533-1.663-1.306-2.214-2.32-.551-1.013-.826-2.23-.826-3.653v-.427c0-1.422.275-2.64.826-3.653.551-1.013 1.28-1.778 2.187-2.293a5.925 5.925 0 0 1 3.013-.8c.818 0 1.511.098 2.08.293.569.196 1.023.445 1.36.747.356.302.631.63.827.986h.453v-7.146h3.04v18.666h-2.986V27.6h-.454c-.32.534-.809 1.022-1.466 1.467-.658.427-1.609.64-2.854.64Zm.907-2.667c1.102 0 2.018-.355 2.747-1.066.729-.73 1.093-1.76 1.093-3.094v-.267c0-1.35-.364-2.382-1.093-3.093-.711-.711-1.627-1.067-2.747-1.067-1.102 0-2.027.356-2.773 1.067-.729.711-1.094 1.742-1.094 3.093v.267c0 1.334.365 2.365 1.094 3.094.746.71 1.671 1.066 2.773 1.066ZM129.789 29.707c-1.316 0-2.498-.267-3.547-.8a6.28 6.28 0 0 1-2.453-2.32c-.587-1.014-.88-2.222-.88-3.627v-.427c0-1.404.293-2.613.88-3.626a6.038 6.038 0 0 1 2.453-2.32c1.049-.534 2.231-.8 3.547-.8 1.315 0 2.489.266 3.52.8a5.87 5.87 0 0 1 2.427 2.32c.604 1.013.906 2.222.906 3.627v.426c0 1.405-.302 2.613-.906 3.627a6.1 6.1 0 0 1-2.427 2.32c-1.031.533-2.205.8-3.52.8Zm0-2.72c1.12 0 2.035-.356 2.747-1.067.711-.729 1.066-1.742 1.066-3.04v-.267c0-1.297-.355-2.302-1.066-3.013-.712-.729-1.627-1.093-2.747-1.093-1.12 0-2.036.364-2.747 1.093-.711.711-1.066 1.716-1.066 3.013v.267c0 1.298.355 2.311 1.066 3.04.711.711 1.627 1.067 2.747 1.067ZM139.903 29.334V16.16h3.013v1.52h.454c.195-.551.524-.951.986-1.2.463-.249 1.014-.373 1.654-.373h1.6v2.72h-1.654c-.888 0-1.608.24-2.16.72-.551.462-.826 1.182-.826 2.16v7.627h-3.067ZM154.061 29.707c-.924 0-1.76-.16-2.506-.48-.747-.338-1.343-.818-1.787-1.44-.427-.622-.64-1.387-.64-2.293 0-.89.213-1.636.64-2.24.444-.605 1.049-1.058 1.813-1.36.765-.32 1.636-.48 2.614-.48h3.813v-.8c0-.694-.213-1.254-.64-1.68-.427-.445-1.093-.667-2-.667-.889 0-1.565.213-2.027.64-.444.409-.738.942-.88 1.6l-2.826-.934a5.575 5.575 0 0 1 1.013-1.893c.48-.569 1.111-1.022 1.893-1.36.782-.355 1.742-.533 2.88-.533 1.725 0 3.076.435 4.054 1.306.995.854 1.493 2.098 1.493 3.734V26c0 .534.249.8.747.8h1.12v2.534h-2.16c-.64 0-1.165-.16-1.574-.48-.409-.32-.613-.756-.613-1.307v-.053h-.453c-.107.248-.294.55-.56.906-.267.356-.676.667-1.227.934-.533.248-1.262.373-2.187.373Zm.507-2.507c1.013 0 1.84-.284 2.48-.853.64-.587.96-1.37.96-2.347v-.267h-3.627c-.658 0-1.191.143-1.6.427-.409.285-.613.702-.613 1.253 0 .534.213.97.64 1.307.427.32 1.013.48 1.76.48Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="logos-logo-wrapper">
                      <div className="logo w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 100%"
                          height=" 100%"
                          fill="none"
                          viewBox="0 0 138 40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M16.642 10.74A15 15 0 0 1 15.5 5h6a9 9 0 0 0 9 9v6a15 15 0 0 1-13.858-9.26Zm-2.284 18.52A15 15 0 0 1 15.5 35h-6a9 9 0 0 0-9-9v-6a15 15 0 0 1 13.858 9.26ZM15.5 20a15 15 0 0 0 15 15v-6a9 9 0 0 1-9-9h-6Zm-1.142-5.74A15 15 0 0 1 15.5 20h-6a9 9 0 0 0-9-9V5a15 15 0 0 1 13.858 9.26Z"
                            clipRule="evenodd"
                          />
                          <path
                            fill="currentColor"
                            d="M40.66 10.987h13.28v5.76l-10.56 9.066v.48h10.88v3.36H40.5v-5.76l10.56-9.066v-.48h-10.4v-3.36ZM60.615 24.133c.018.392.106.756.266 1.094.178.32.41.604.694.853.302.231.64.418 1.013.56.391.125.8.187 1.227.187.835 0 1.475-.143 1.92-.427.444-.302.764-.658.96-1.067l2.88 1.6A6.08 6.08 0 0 1 68.908 28a4.732 4.732 0 0 1-1.12.987c-.444.302-.995.55-1.653.746-.64.196-1.396.294-2.267.294-.995 0-1.902-.16-2.72-.48a6.149 6.149 0 0 1-2.133-1.387c-.587-.604-1.05-1.342-1.387-2.213-.32-.871-.48-1.858-.48-2.96v-.16c0-1.014.169-1.938.507-2.774a6.45 6.45 0 0 1 1.44-2.133 6.41 6.41 0 0 1 2.106-1.36 6.777 6.777 0 0 1 2.614-.507c1.138 0 2.115.205 2.933.614.818.39 1.493.897 2.027 1.52a5.82 5.82 0 0 1 1.173 2.026 6.58 6.58 0 0 1 .373 2.134v1.786h-9.706Zm3.173-5.04c-.853 0-1.547.223-2.08.667-.533.427-.88.924-1.04 1.493h6.24c-.107-.622-.444-1.137-1.013-1.546-.551-.41-1.254-.614-2.107-.614ZM73.343 16.427h5.6v1.92h.48c.249-.73.667-1.29 1.253-1.68.605-.41 1.325-.614 2.16-.614 1.316 0 2.374.418 3.174 1.254.8.818 1.2 2.07 1.2 3.76v.586l-3.467.32V21.6c0-.729-.187-1.307-.56-1.733-.373-.445-.933-.667-1.68-.667-.747 0-1.333.258-1.76.773-.427.516-.64 1.254-.64 2.214v4.266h3.04v3.2h-9.12v-3.2h2.72v-6.826h-2.4v-3.2ZM103.591 29.653h-3.36v-9.28c0-.373-.098-.649-.293-.826-.178-.196-.418-.294-.72-.294-.356 0-.64.107-.854.32-.195.214-.293.534-.293.96v9.12h-3.36v-9.28c0-.373-.107-.649-.32-.826a.979.979 0 0 0-.72-.294c-.32 0-.587.107-.8.32-.213.214-.32.534-.32.96v9.12h-3.36V16.427h3.36v1.28h.48c.107-.48.347-.871.72-1.174.391-.32.898-.48 1.52-.48.587 0 1.085.16 1.493.48.41.303.685.694.827 1.174h.48c.142-.48.436-.871.88-1.174.462-.32 1.031-.48 1.707-.48.889 0 1.6.303 2.133.907.533.587.8 1.404.8 2.453v10.24ZM106.879 26.453h4.48v-6.826h-4.16v-3.2h7.52v10.026h3.84v3.2h-11.68v-3.2Zm8.667-13.946c0 .355-.071.693-.214 1.013a2.423 2.423 0 0 1-.533.8 3.007 3.007 0 0 1-.827.533 2.496 2.496 0 0 1-.96.187c-.355 0-.684-.062-.986-.187a3.145 3.145 0 0 1-.8-.533 2.819 2.819 0 0 1-.56-.8 2.76 2.76 0 0 1-.187-1.013c0-.356.062-.685.187-.987.142-.32.329-.587.56-.8.231-.231.498-.409.8-.533.302-.143.631-.214.986-.214.338 0 .658.071.96.214.32.124.596.302.827.533.231.213.409.48.533.8.143.302.214.631.214.987ZM131.527 27.733c-.355.836-.853 1.431-1.493 1.787-.64.338-1.387.507-2.24.507-.8 0-1.556-.151-2.267-.454a5.379 5.379 0 0 1-1.84-1.333c-.533-.587-.96-1.298-1.28-2.133-.302-.836-.453-1.787-.453-2.854v-.426c0-1.05.151-1.991.453-2.827.302-.835.711-1.547 1.227-2.133a5.17 5.17 0 0 1 1.787-1.334 5.217 5.217 0 0 1 2.213-.48c.942 0 1.698.16 2.267.48.586.32 1.048.818 1.386 1.494h.48v-1.6h3.36v9.226c0 .534.24.8.72.8h.507v3.2h-2.293c-.605 0-1.103-.177-1.494-.533-.373-.355-.56-.818-.56-1.387h-.48Zm-2.986-.906c.977 0 1.76-.32 2.346-.96.587-.658.88-1.547.88-2.667v-.32c0-1.12-.293-2-.88-2.64-.586-.658-1.369-.987-2.346-.987-.978 0-1.76.33-2.347.987-.587.64-.88 1.52-.88 2.64v.32c0 1.12.293 2.009.88 2.667.587.64 1.369.96 2.347.96Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="logos-logo-wrapper">
                      <div className="logo w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 100%"
                          height=" 100%"
                          fill="none"
                          viewBox="0 0 156 40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M2.363 7.197A7.5 7.5 0 0 0 .166 12.5V35h28.125V12.5a7.5 7.5 0 0 0-14.063-3.631A7.495 7.495 0 0 0 7.667 5a7.5 7.5 0 0 0-5.303 2.197ZM12.916 32.5h-10.5v-5a5.25 5.25 0 0 1 10.5 0v5Zm2.625 0h10.5v-5a5.25 5.25 0 0 0-10.5-.02v5.02Zm0-10.356a7.5 7.5 0 0 1 10.5 0V20a5.25 5.25 0 0 0-10.5-.02v2.164ZM12.916 20a5.25 5.25 0 1 0-10.5 0v2.144a7.5 7.5 0 0 1 10.5 0V20Zm0-5.356a7.5 7.5 0 0 0-10.5 0V12.5a5.25 5.25 0 1 1 10.5 0v2.144Zm2.625 0a7.5 7.5 0 0 1 10.5 0V12.5a5.25 5.25 0 1 0-10.5 0v2.144Z"
                            clipRule="evenodd"
                          />
                          <path
                            fill="currentColor"
                            d="M54.878 11.133V29.8h-2.854L41.731 17.16V29.8h-3.44V11.133h2.853l10.294 12.64v-12.64h3.44ZM65.96 29.987c-1.44 0-2.738-.311-3.894-.934a6.928 6.928 0 0 1-2.72-2.586c-.64-1.12-.96-2.383-.96-3.787s.32-2.658.96-3.76a6.929 6.929 0 0 1 2.72-2.587c1.156-.622 2.454-.933 3.894-.933 1.457 0 2.764.311 3.92.933 1.155.623 2.053 1.485 2.693 2.587.658 1.102.987 2.356.987 3.76s-.33 2.667-.987 3.787c-.64 1.102-1.538 1.964-2.693 2.586-1.156.623-2.463.934-3.92.934Zm0-2.854c1.226 0 2.24-.409 3.04-1.226.8-.818 1.2-1.894 1.2-3.227s-.4-2.409-1.2-3.227c-.8-.817-1.814-1.226-3.04-1.226-1.227 0-2.24.409-3.04 1.226-.783.818-1.174 1.894-1.174 3.227s.391 2.409 1.174 3.227c.8.817 1.813 1.226 3.04 1.226ZM89.69 15.56 83.583 29.8h-3.44l-6.107-14.24h3.467l4.427 10.56 4.56-10.56h3.2ZM104.769 22.76c0 .231-.018.56-.053.987H93.543c.195 1.049.702 1.884 1.52 2.506.835.605 1.866.907 3.093.907 1.564 0 2.853-.515 3.866-1.547l1.787 2.054c-.64.764-1.449 1.342-2.427 1.733-.977.391-2.08.587-3.306.587-1.565 0-2.942-.311-4.133-.934-1.192-.622-2.116-1.484-2.774-2.586-.64-1.12-.96-2.383-.96-3.787 0-1.387.311-2.631.933-3.733a6.783 6.783 0 0 1 2.64-2.614c1.12-.622 2.383-.933 3.787-.933 1.387 0 2.622.311 3.707.933a6.301 6.301 0 0 1 2.56 2.587c.622 1.102.933 2.382.933 3.84Zm-7.2-4.693c-1.067 0-1.973.32-2.72.96-.729.622-1.173 1.457-1.333 2.506h8.08c-.142-1.03-.578-1.866-1.307-2.506-.729-.64-1.635-.96-2.72-.96ZM107.971 10.013h3.333V29.8h-3.333V10.013ZM122.079 29.987c-1.44 0-2.737-.311-3.893-.934a6.926 6.926 0 0 1-2.72-2.586c-.64-1.12-.96-2.383-.96-3.787s.32-2.658.96-3.76a6.927 6.927 0 0 1 2.72-2.587c1.156-.622 2.453-.933 3.893-.933 1.458 0 2.765.311 3.92.933 1.156.623 2.054 1.485 2.694 2.587.657 1.102.986 2.356.986 3.76s-.329 2.667-.986 3.787c-.64 1.102-1.538 1.964-2.694 2.586-1.155.623-2.462.934-3.92.934Zm0-2.854c1.227 0 2.24-.409 3.04-1.226.8-.818 1.2-1.894 1.2-3.227s-.4-2.409-1.2-3.227c-.8-.817-1.813-1.226-3.04-1.226-1.226 0-2.24.409-3.04 1.226-.782.818-1.173 1.894-1.173 3.227s.391 2.409 1.173 3.227c.8.817 1.814 1.226 3.04 1.226ZM136.04 17.64c.96-1.493 2.649-2.24 5.067-2.24v3.173a4.237 4.237 0 0 0-.773-.08c-1.298 0-2.312.383-3.04 1.147-.729.747-1.094 1.831-1.094 3.253V29.8h-3.333V15.56h3.173v2.08ZM149.296 15.4c2.098 0 3.698.507 4.8 1.52 1.12.996 1.68 2.507 1.68 4.533V29.8h-3.146v-1.733c-.409.622-.996 1.102-1.76 1.44-.747.32-1.654.48-2.72.48-1.067 0-2-.178-2.8-.534-.8-.373-1.422-.88-1.867-1.52a3.976 3.976 0 0 1-.64-2.213c0-1.28.471-2.302 1.413-3.067.96-.782 2.463-1.173 4.507-1.173h3.68v-.213c0-.996-.302-1.76-.907-2.294-.586-.533-1.466-.8-2.64-.8-.8 0-1.591.125-2.373.374-.764.249-1.413.595-1.947 1.04l-1.306-2.427c.746-.569 1.644-1.004 2.693-1.307a11.984 11.984 0 0 1 3.333-.453Zm-.453 12.16c.836 0 1.573-.187 2.213-.56a3.167 3.167 0 0 0 1.387-1.653v-1.654h-3.44c-1.92 0-2.88.631-2.88 1.894 0 .604.24 1.084.72 1.44.48.355 1.147.533 2 .533Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="logos-logo-wrapper">
                      <div className="logo w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width=" 100%"
                          height=" 100%"
                          fill="none"
                          viewBox="0 0 169 40"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M15 5c0 8.284-6.716 15-15 15 8.284 0 15 6.715 15 15 0-8.285 6.716-15 15-15-8.284 0-15-6.716-15-15Z"
                            clipRule="evenodd"
                          />
                          <path
                            fill="currentColor"
                            d="m49.307 28.534-7.84-16.214H46l4.853 11.307-1.546 4.907Zm0 0-.107-3.12 5.787-13.147h1.946l-6.16 13.013c-.035.089-.115.276-.24.56a18.44 18.44 0 0 0-.4.933c-.142.338-.275.667-.4.987-.106.32-.169.578-.186.773h-.24Zm4.933-14.587c.196-.48.169-.853-.08-1.12-.231-.267-.507-.4-.827-.4h-.186v-.24h5.306v.267h-.213c-.356 0-.729.115-1.12.346-.391.213-.72.596-.987 1.147H54.24Zm-7.547 0h-4.426c-.267-.551-.596-.933-.987-1.147-.373-.231-.738-.347-1.093-.347H40v-.266h7.813v.24H47.6c-.284 0-.551.133-.8.4s-.284.64-.107 1.12ZM63.576 11.467l7.893 16.587h-4.507l-4.96-11.707 1.574-4.88Zm-5.014 14.96c-.195.48-.169.853.08 1.12.25.249.525.373.827.373h.213v.267H54.35v-.267h.213c.356 0 .73-.107 1.12-.32.391-.231.711-.622.96-1.173h1.92Zm5.014-14.96.053 3.2-5.787 13.44H55.87l6.24-13.413a6.25 6.25 0 0 1 .24-.56c.124-.285.258-.596.4-.934.142-.355.276-.684.4-.986.124-.32.195-.57.213-.747h.214Zm2.32 11.493V24h-6.8v-1.04h6.8Zm.4 3.467h4.4c.266.55.595.942.986 1.173.391.213.765.32 1.12.32h.214v.267h-7.84v-.267h.213c.302 0 .578-.124.827-.373.249-.267.275-.64.08-1.12ZM78.657 12.187h2.88c.729 0 1.44.08 2.133.24a5.75 5.75 0 0 1 1.867.72c.551.32.987.764 1.307 1.333.338.551.506 1.245.506 2.08 0 .622-.133 1.245-.4 1.867A3.93 3.93 0 0 1 85.75 20c-.533.445-1.235.738-2.106.88.515.16 1.004.471 1.466.934.48.462.854.897 1.12 1.306.072.142.196.373.374.694.177.302.4.657.666 1.066.285.391.578.8.88 1.227.356.48.667.853.934 1.12.266.249.542.427.826.533a2.8 2.8 0 0 0 .987.16v.267h-2.24c-.96 0-1.778-.071-2.453-.213a4.397 4.397 0 0 1-1.734-.774c-.48-.391-.924-.915-1.333-1.573a9.981 9.981 0 0 1-.507-.827l-.533-1.013a16.563 16.563 0 0 1-.48-.987 6.948 6.948 0 0 1-.267-.8c-.23-.569-.497-.978-.8-1.227-.284-.266-.55-.4-.8-.4v-.24h.667c.373 0 .738-.062 1.093-.186.374-.142.712-.4 1.014-.773.302-.392.524-.96.666-1.707.036-.107.063-.258.08-.453.036-.196.045-.418.027-.667-.035-.658-.16-1.182-.373-1.574-.196-.408-.445-.71-.747-.906a2.59 2.59 0 0 0-.933-.427 2.882 2.882 0 0 0-.8-.133 8.15 8.15 0 0 0-.934 0c-.266 0-.47-.01-.613-.027-.018 0-.044-.089-.08-.266a32.317 32.317 0 0 0-.107-.56l-.053-.267Zm.267 0v16h-3.867v-16h3.867Zm-3.787 14.32.107 1.68h-1.92v-.267h.32c.39 0 .72-.133.986-.4.285-.284.436-.622.454-1.013h.053Zm0-12.667h-.053c-.018-.409-.17-.738-.454-.986a1.309 1.309 0 0 0-.96-.4h-.346v-.267h1.92l-.107 1.653Zm3.733 12.667h.054c0 .444.15.79.453 1.04.32.249.658.373 1.013.373h.267v.267h-1.92l.133-1.68ZM99.686 11.84c1.423 0 2.712.196 3.867.587 1.156.373 2.151.924 2.987 1.653a7.295 7.295 0 0 1 1.92 2.64c.462 1.031.693 2.196.693 3.494 0 1.28-.231 2.435-.693 3.466a7.352 7.352 0 0 1-1.92 2.614c-.836.728-1.831 1.288-2.987 1.68-1.155.373-2.444.56-3.867.56-1.404 0-2.684-.187-3.84-.56-1.155-.392-2.15-.952-2.986-1.68a7.338 7.338 0 0 1-1.92-2.614c-.445-1.031-.667-2.186-.667-3.466 0-1.298.222-2.463.667-3.494a7.281 7.281 0 0 1 1.92-2.64c.835-.729 1.83-1.28 2.987-1.653 1.155-.391 2.435-.587 3.84-.587Zm0 15.654c1.085 0 2.027-.294 2.827-.88.818-.605 1.44-1.45 1.867-2.534.444-1.084.666-2.373.666-3.866 0-1.512-.222-2.81-.666-3.894-.427-1.102-1.049-1.947-1.867-2.533-.8-.605-1.742-.907-2.827-.907-1.066 0-2 .302-2.8.907-.8.586-1.422 1.43-1.866 2.533-.445 1.085-.667 2.382-.667 3.893 0 1.494.222 2.783.667 3.867.444 1.085 1.067 1.929 1.867 2.534.8.586 1.733.88 2.8.88ZM112.235 11.813l15.654 13.76.266 2.96-15.626-13.76-.294-2.96Zm.107 14.747v1.627h-1.973v-.267h.426c.409 0 .756-.124 1.04-.373.285-.267.427-.596.427-.987h.08Zm3.573 0c.018.391.169.72.454.987.284.249.622.373 1.013.373H117.835v.267h-1.973V26.56h.053Zm-3.68-14.746 3.68 4v12.373h-3.653V14.853c0-.906-.045-1.635-.133-2.186l-.134-.854h.24Zm15.894.373v13.226c0 .623.017 1.174.053 1.654.053.462.098.826.133 1.093l.08.373h-.24l-3.68-4.24V12.188h3.654Zm-.08 1.627v-1.627h2v.267H129.595c-.391 0-.738.133-1.04.4a1.218 1.218 0 0 0-.426.96h-.08Zm-3.574 0a1.303 1.303 0 0 0-.453-.96c-.267-.267-.605-.4-1.013-.4H122.555v-.267h1.974v1.627h-.054ZM140.483 12.187c1.902 0 3.538.32 4.907.96 1.369.622 2.418 1.538 3.146 2.746.729 1.192 1.094 2.623 1.094 4.294 0 1.67-.365 3.102-1.094 4.293-.728 1.191-1.777 2.107-3.146 2.747-1.369.64-3.005.96-4.907.96h-5.92l-.053-1.067h5.653c1.671 0 2.987-.613 3.947-1.84s1.44-2.924 1.44-5.093c0-2.17-.48-3.867-1.44-5.094-.96-1.244-2.276-1.866-3.947-1.866h-5.92v-1.04h6.24Zm-3.333 0v16h-3.84v-16h3.84Zm-3.76 14.293v1.707h-1.92v-.267h.346c.409 0 .756-.142 1.04-.427.303-.284.454-.622.454-1.013h.08Zm-.027-12.613h-.053a1.38 1.38 0 0 0-.48-1.014 1.465 1.465 0 0 0-1.04-.4h-.32v-.266h1.893v1.68ZM158.654 11.467l7.893 16.587h-4.507l-4.96-11.707 1.574-4.88Zm-5.014 14.96c-.195.48-.168.853.08 1.12.249.249.525.373.827.373h.213v.267h-5.333v-.267h.213c.356 0 .729-.107 1.12-.32.392-.231.712-.622.96-1.173h1.92Zm5.014-14.96.053 3.2-5.787 13.44h-1.973l6.24-13.413c.036-.107.116-.294.24-.56.125-.285.258-.596.4-.934.142-.355.276-.684.4-.986.125-.32.196-.57.213-.747h.214Zm2.32 11.493V24h-6.8v-1.04h6.8Zm.4 3.467h4.4c.266.55.595.942.986 1.173.392.213.765.32 1.12.32h.214v.267h-7.84v-.267h.213c.302 0 .578-.124.827-.373.249-.267.275-.64.08-1.12Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-compare hide-tablet">
          <div className="padding-section-medium">
            <div className="compare-top">
              <div className="padding-global">
                <div className="container-large">
                  <div className="w-layout-grid compare-top-row">
                    <div className="compare-top-row-content is-first">
                      <div className="compare-top-row-wrapper">
                        <h2 className="heading-style-h6">
                          Compare plans &amp; features
                        </h2>
                        <div className="padding-bottom padding-small" />
                        <div className="text-size-small">
                          Let's take a look at what we offer and why you may
                          need each one. But first, scroll down to choose your
                          specific plan.
                        </div>
                      </div>
                    </div>
                    <div className="compare-top-row-content">
                      <div className="compare-top-row-wrapper">
                        <div className="text-size-large text-weight-semibold text-color-neutral-800">
                          Solo
                        </div>
                        <div className="padding-bottom padding-small" />
                        <div className="text-size-large text-weight-bold text-color-neutral-800">
                          $8
                          <span className="text-color-neutral-500">/month</span>
                        </div>
                        <div className="padding-bottom padding-xxsmall" />
                        <div className="text-size-regular">Billed annually</div>
                        <div className="padding-bottom padding-medium" />
                      </div>
                      <div className="compare-button-wrapper">
                        <a href="/sign-up" className="button is-small w-button">
                          Get started
                        </a>
                      </div>
                    </div>
                    <div className="compare-top-row-content">
                      <div className="compare-top-row-wrapper">
                        <div className="text-size-large text-weight-semibold text-color-neutral-800">
                          Professional
                        </div>
                        <div className="padding-bottom padding-small" />
                        <div className="text-size-large text-weight-bold text-color-neutral-800">
                          $16
                          <span className="text-color-neutral-500">/month</span>
                        </div>
                        <div className="padding-bottom padding-xxsmall" />
                        <div className="text-size-regular">Billed annually</div>
                        <div className="padding-bottom padding-medium" />
                      </div>
                      <div className="compare-button-wrapper">
                        <a href="/sign-up" className="button is-small w-button">
                          Get started
                        </a>
                      </div>
                    </div>
                    <div className="compare-top-row-content">
                      <div className="compare-top-row-wrapper">
                        <div className="text-size-large text-weight-semibold text-color-neutral-800">
                          Business
                        </div>
                        <div className="padding-bottom padding-small" />
                        <div className="text-size-large text-weight-bold text-color-neutral-800">
                          $48
                          <span className="text-color-neutral-500">/month</span>
                        </div>
                        <div className="padding-bottom padding-xxsmall" />
                        <div className="text-size-regular">Billed annually</div>
                        <div className="padding-bottom padding-medium" />
                      </div>
                      <div className="compare-button-wrapper">
                        <a href="/sign-up" className="button is-small w-button">
                          Get started
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="padding-global">
              <div className="container-large">
                <div className="compare-component">
                  <div className="compare-heading-row">
                    <div className="text-size-large text-weight-bold">
                      Essentials
                    </div>
                  </div>
                  <div className="compare-block">
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Maximum number of seats
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Up to 2 seats</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Unlimited</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Unlimited</div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Items
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Up to 1000</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Unlimited</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">Unlimited</div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          File storage
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">500&nbsp;MB</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">5 GB</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">20 GB</div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Activity log
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">1 week</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">1 week</div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">6 months</div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row is-last">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Unlimited boards
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="compare-heading-row">
                    <div className="text-size-large text-weight-bold">
                      Collaboration
                    </div>
                  </div>
                  <div className="compare-block">
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Embedded documents
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Whiteboard collaboration
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Updates section
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Zoom integration
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row is-last">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Guest access
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">
                          4 guests billed as 1 seat
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="compare-heading-row">
                    <div className="text-size-large text-weight-bold">
                      Productivity
                    </div>
                  </div>
                  <div className="compare-block">
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          iOS and Android apps
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Shareable forms
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Customizable notifications
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Integrations
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="icon-1x1-small is-pricing-table w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width=" 100%"
                            height=" 100%"
                            fill="none"
                          >
                            <path
                              fill="currentColor"
                              d="m20.684 7.564-10.6 10.6a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-layout-grid compare-row is-last">
                      <div className="compare-feature">
                        <div className="text-size-regular text-weight-medium">
                          Automations
                        </div>
                      </div>
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400" />
                      <div className="compare-row-content text-color-neutral-light-400">
                        <div className="text-size-regular">
                          250 actions/month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-pricing-faq">
          <div className="padding-global">
            <div className="container-small">
              <div className="padding-section-large">
                <div className="faq-component">
                  <div className="faq-content">
                    <div className="tagline">FAQs</div>
                    <div className="padding-bottom padding-small" />
                    <h1 className="heading-style-h2">
                      Frequently asked questions
                    </h1>
                    <div className="padding-bottom padding-medium" />
                    <p className="text-size-large text-color-neutral-600">
                      We thought you'd ask. So we've assembled a short list of
                      answers to the most common questions we get.
                    </p>
                  </div>
                  <div className="faq-list">
                    <div className="w-layout-grid faq-list-grid">
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeac8e"
                          className="faq-question is-first"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            How does Divine Pos's pricing work?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeac98"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            What data does Divine Pos track?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeaca2"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            How does Divine Pos handle my data?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacac"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            Can I try Divine Pos for free?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacb6"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            How many seats do I get in a Team plan?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacc0"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            What forms of payment do you accept?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacca"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            How do I cancel my paid plan?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacd4"
                          className="faq-question"
                        >
                          <div className="text-size-medium text-weight-semibold">
                            How do refunds work?
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ width: "100%", height: "0px", opacity: 0 }}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                A lectus ultrices tortor vitae aliquet rhoncus
                                risus quam nunc. Euismod vitae in eu mattis sit
                                purus. Volutpat mauris platea curabitur sit
                                pharetra pretium purus id. Ac tellus tortor
                                interdum nunc ipsum egestas non.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="padding-bottom padding-xlarge" />
                    <div className="text-size-regular text-align-center text-color-neutral-600">
                      Can’t see what you’re looking for?{" "}
                      <a href="/contact" className="faq-link">
                        Contact us
                      </a>
                      .
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-cta is-pricing">
          <div className="padding-global">
            <div className="container-large">
              <div className="cta-component">
                <div className="cta-content">
                  <h2 className="heading-style-h5 text-color-white">
                    Try Divine Pos today
                  </h2>
                  <div className="padding-bottom padding-xsmall" />
                  <div className="text-size-regular text-color-white">
                    Start a free trial now and see the results for yourself.
                  </div>
                </div>
                <a href="/sign-up" className="button is-tertiary w-button">
                  Start 14-day free trial
                </a>
              </div>
            </div>
          </div>
          <div className="cta-background" />
        </section>
      </main>
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
                        src="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab51806ff55d50c2_Logo%20white.svg"
                        loading="lazy"
                        alt="Logo link"
                        className="nav-logo"
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
                      <a
                        href="/features"
                        className="footer-link w-inline-block"
                      >
                        <div>Features</div>
                        <div className="footer-label">New</div>
                      </a>
                      <a href="#" className="footer-link w-inline-block">
                        <div>Blog</div>
                      </a>
                      <a
                        href="/blog-posts/work-less-work-smart-the-best-ways-to-achieve-more-in-less-time"
                        className="footer-link w-inline-block"
                      >
                        <div>Blog post</div>
                      </a>
                      <a
                        href="/pricing"
                        aria-current="page"
                        className="footer-link w-inline-block w--current"
                      >
                        <div>Pricing</div>
                      </a>
                      <a href="#" className="footer-link w-inline-block">
                        <div>Integrations</div>
                      </a>
                      <a
                        href="/download"
                        className="footer-link w-inline-block"
                      >
                        <div>Download</div>
                      </a>
                      <a
                        href="https://webflow.com/templates/designers/minimal-square"
                        className="footer-link w-inline-block"
                      >
                        <div>Other templates</div>
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
                      <a
                        href="/about-us"
                        className="footer-link w-inline-block"
                      >
                        <div>About us</div>
                      </a>
                      <a href="/careers" className="footer-link w-inline-block">
                        <div>Careers</div>
                        <div className="footer-label">New</div>
                      </a>
                      <a
                        href="/career/visual-designer"
                        className="footer-link w-inline-block"
                      >
                        <div>Job post</div>
                        <div className="footer-label">New</div>
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
                      <a href="/contact" className="footer-link w-inline-block">
                        <div>Contact sales</div>
                      </a>
                      <a
                        href="https://gemtemplate.webflow.io/team-membes/jane-palmer"
                        className="footer-link w-inline-block"
                      >
                        <div>Team members</div>
                      </a>
                      <a
                        href="https://gemtemplate.webflow.io/author/alexus-reed"
                        className="footer-link w-inline-block"
                      >
                        <div>Author</div>
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
                      <a
                        href="/access-denied"
                        className="footer-link w-inline-block"
                      >
                        <div>Access denied</div>
                      </a>
                      <a
                        href="/user-account"
                        className="footer-link w-inline-block"
                      >
                        <div>User account</div>
                      </a>
                    </div>
                  </div>
                  <div
                    id="w-node-_7352c6ad-fddc-dd58-80b3-bea4e3fb461f-abb9ad79"
                    className="footer-column"
                  >
                    <div className="text-size-regular text-weight-semibold text-color-white">
                      Social
                    </div>
                    <div className="padding-bottom padding-medium" />
                    <div className="footer-list">
                      <a href="#" className="footer-link w-inline-block">
                        <div>Style guide</div>
                      </a>
                      <a href="/404" className="footer-link w-inline-block">
                        <div>404</div>
                      </a>
                      <a href="/401" className="footer-link w-inline-block">
                        <div>Protected</div>
                      </a>
                      <a href="/search" className="footer-link w-inline-block">
                        <div>Search</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="padding-bottom padding-xxlarge" />
              <div className="footer-bottom">
                <div className="text-size-small text-color-neutral-400">
                  © Minimal UI 2022
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
    </div>
  );
};

export default Pricing;
