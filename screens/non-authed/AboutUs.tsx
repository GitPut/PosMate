import { View, Text } from "react-native";
import React from "react";
import "./css/normalize.css";
import "./css/webflow.css";
import "./css/divine-pos.webflow.css";
import Footer from "components/Footer";

const AboutUs = () => {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className="section-about-us-header">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="about-us-header-component">
                  <div className="max-width-xlarge align-center">
                    <div className="about-us-header-component text-align-center">
                      <div className="tagline text-color-white">Our story</div>
                      <div className="padding-bottom padding-small" />
                      <h1 className="heading-style-h2 text-color-white">
                        Meet the Divine Pos
                      </h1>
                      <div className="padding-bottom padding-medium" />
                      <p className="text-size-large text-color-white">
                        Sure, we have a SaaS company and thousand happy
                        customers around the globe but that is not how it all
                        started.
                      </p>
                    </div>
                  </div>
                  <div className="padding-bottom padding-huge" />
                  <div className="company-header-item-wrapper">
                    <div className="company-header-item">
                      <div className="text-size-regular text-weight-bold">
                        2017
                      </div>
                      <div className="text-size-xsmall">Company opening</div>
                    </div>
                    <div className="company-header-item">
                      <div className="text-size-regular text-weight-bold">
                        2019
                      </div>
                      <div className="text-size-xsmall">Funding round A</div>
                    </div>
                    <div className="company-header-item">
                      <div className="text-size-regular text-weight-bold">
                        2020
                      </div>
                      <div className="text-size-xsmall">Funding round B</div>
                    </div>
                    <div className="company-header-item">
                      <div className="text-size-regular text-weight-bold">
                        2022
                      </div>
                      <div className="text-size-xsmall">Funding round C</div>
                    </div>
                  </div>
                  <div className="padding-bottom padding-huge" />
                  <div className="company-header-text-wrapper">
                    <h2 className="heading-style-h4 text-weight-semibold text-color-white">
                      Alexus and Camilla had a difficult time at the company
                      that they worked for at the time.{" "}
                      <span>
                        But organizational nightmare became a business
                        opportunity pretty fast.
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graphic-circle" />
          <div className="graphic-circle-3" />
        </section>
        <section className="section-about-us-feature">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xxhuge" />
              <div className="w-layout-grid about-us-feature-component">
                <div
                  id="w-node-_8d0fd77d-83f9-49e3-4c28-49dc430741ee-99891d87"
                  className="about-us-feature-content"
                >
                  <h2 className="heading-style-h3">How it started</h2>
                  <div className="padding-bottom padding-medium" />
                  <p className="text-size-medium">
                    Alexus and Camilla, both experienced project managers, had
                    observed common challenges in staying organized, meeting
                    deadlines, and staying on budget.
                    <br />
                    <br />
                    We know that there were many project management tools and
                    services available, but many of them were either too
                    complicated or too expensive for small and medium-sized
                    businesses.
                  </p>
                  <div className="padding-bottom padding-xlarge" />
                  <div className="about-us-feature-list">
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        Difficulty in staying organized and managing resources
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        Lack of simplicity and ease of use
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        High cost for small and medium-sized businesses
                      </div>
                    </div>
                  </div>
                </div>
                <div className="about-us-feature-image-wrapper">
                  <img
                    src="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518023ae5d50df_surface-2Wc28rVDygk-unsplash.webp"
                    loading="lazy"
                    sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 42vw"
                    srcSet="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518023ae5d50df_surface-2Wc28rVDygk-unsplash-p-500.webp 500w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518023ae5d50df_surface-2Wc28rVDygk-unsplash-p-800.webp 800w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518023ae5d50df_surface-2Wc28rVDygk-unsplash-p-1080.webp 1080w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518023ae5d50df_surface-2Wc28rVDygk-unsplash.webp 1440w"
                    alt="A young woman working on a laptop"
                    className="about-us-feature-image"
                  />
                </div>
              </div>
              <div className="padding-bottom padding-xhuge" />
            </div>
          </div>
        </section>
        <section className="section-about-us-feature">
          <div className="padding-global">
            <div className="container-large">
              <div className="w-layout-grid about-us-feature-component">
                <div
                  id="w-node-e1e3fc12-a5d8-f19a-bfb9-b665b2c9e35a-99891d87"
                  className="about-us-feature-image-wrapper"
                >
                  <img
                    src="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab5180c3415d50e3_surface-coCGW4SsxX4-unsplash.webp"
                    loading="lazy"
                    sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 42vw"
                    srcSet="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab5180c3415d50e3_surface-coCGW4SsxX4-unsplash-p-500.webp 500w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab5180c3415d50e3_surface-coCGW4SsxX4-unsplash-p-800.webp 800w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab5180c3415d50e3_surface-coCGW4SsxX4-unsplash.webp 960w"
                    alt="Two young women working on a shared laptop"
                    className="about-us-feature-image"
                  />
                </div>
                <div
                  id="w-node-e1e3fc12-a5d8-f19a-bfb9-b665b2c9e34e-99891d87"
                  className="about-us-feature-content"
                >
                  <h2 className="heading-style-h3">Why are we doing this</h2>
                  <div className="padding-bottom padding-medium" />
                  <p className="text-size-medium">
                    We created our tools and services to help small and
                    medium-sized businesses that need to meet their deadlines
                    but may not have the budget for enterprise software. Our
                    goal is to make project management more accessible and
                    affordable for everyone.
                  </p>
                  <div className="padding-bottom padding-xlarge" />
                  <div className="about-us-feature-list">
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        Affordable and accessible project management solution
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        Assist businesses in meeting deadlines and staying on
                        budget
                      </div>
                    </div>
                    <div className="check-item">
                      <div className="check-icon is-primary">
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
                      <div className="text-size-regular text-weight-normal">
                        Improve efficiency and organization
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="padding-bottom padding-xxhuge" />
            </div>
          </div>
        </section>
        <section className="section-team-progress">
          <div className="padding-global">
            <div className="container-large">
              <div className="w-layout-grid team-progress-content-wrapper">
                <div className="team-progress-content-left">
                  <div className="tagline">Team progress</div>
                  <div className="padding-bottom padding-small" />
                  <h2 className="heading-style-h3">
                    We turned traditional project management on its head
                  </h2>
                </div>
                <p className="text-size-medium">
                  We shifted our focus from project management to product
                  management. We used the same strategies, processes, and tools
                  as traditional project management but applied them in a
                  different way.
                  <br />
                  <br />
                  This is the same approach you can use when you’re trying to
                  make changes in your organization.
                </p>
              </div>
              <div className="padding-bottom padding-xhuge" />
              <div className="team-progress-image-wrapper">
                <img
                  src="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash.webp"
                  loading="lazy"
                  sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, 92vw"
                  srcSet="https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-500.webp 500w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-800.webp 800w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-1080.webp 1080w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-1600.webp 1600w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-2000.webp 2000w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash-p-2600.webp 2600w, https://uploads-ssl.webflow.com/63e16bdbab518005085d506a/63e16bdbab518012da5d50f3_surface-GUPqey7k7b4-unsplash.webp 2880w"
                  alt="Three people working on a laptop and eating popcorn"
                  className="team-progress-image"
                />
              </div>
              <div className="padding-bottom padding-xxlarge" />
              <div className="team-progress-metrics">
                <div className="team-progress-metrics-item">
                  <div className="heading-style-h4 text-weight-semibold text-color-primary-700">
                    11+
                  </div>
                  <div className="text-size-regular">
                    Remote team members all around the world
                  </div>
                </div>
                <div className="team-progress-metrics-item">
                  <div className="heading-style-h4 text-weight-semibold text-color-primary-700">
                    150%
                  </div>
                  <div className="text-size-regular">
                    Company's market share in last 12 months
                  </div>
                </div>
                <div className="team-progress-metrics-item">
                  <div className="heading-style-h4 text-weight-semibold text-color-primary-700">
                    210%
                  </div>
                  <div className="text-size-regular">
                    Company's revenue growth in last 12 months
                  </div>
                </div>
                <div className="team-progress-metrics-item">
                  <div className="heading-style-h4 text-weight-semibold text-color-primary-700">
                    73+
                  </div>
                  <div className="text-size-regular">
                    Happy small and medium size companies that use Divine Pos
                  </div>
                </div>
              </div>
            </div>
            <div className="padding-bottom padding-xxhuge" />
          </div>
        </section>
        <section className="section-our-team background-color-neutral-50">
          <div className="padding-global">
            <div className="container-large" />
          </div>
        </section>
        <div className="section-blog">
          <div className="padding-global">
            <div className="container-large" />
          </div>
        </div>
        <section className="section-cta is-white-bg">
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
            <div className="cta-background" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
