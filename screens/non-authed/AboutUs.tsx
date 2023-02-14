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
                        Welcome to Divine POS
                      </h1>
                      <div className="padding-bottom padding-medium" />
                      <p className="text-size-large text-color-white">
                        At Divine POS, we understand the challenges that
                        businesses face, and we are dedicated to providing the
                        tools and support they need to overcome these challenges
                        and achieve their goals.
                      </p>
                    </div>
                  </div>
                  <div className="padding-bottom padding-huge" />
                </div>
              </div>
            </div>
          </div>
          <div className="graphic-circle" />
          <div className="graphic-circle-3" />
        </section>
        <section className="background-color-neutral-50">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xxhuge" />
              <div className="background-color-neutral-50">
                <div
                  id="w-node-_8d0fd77d-83f9-49e3-4c28-49dc430741ee-99891d87"
                  className="background-color-neutral-50"
                >
                  <h2 className="heading-style-h3">How it started</h2>
                  <div className="padding-bottom padding-medium" />
                  <p className="text-size-medium">
                    Thank you for considering Divine POS for your point-of-sale
                    software needs. Our journey began in Waterloo, Ontario,
                    where we set out to help local businesses streamline their
                    operations and improve their customer experiences. <br />
                    <br /> Since then, we have been dedicated to providing
                    powerful, user-friendly, and cost-effective point-of-sale
                    software solutions to businesses of all sizes and industries
                    across Canada and beyond. <br />
                    <br /> Our commitment to innovation and customer
                    satisfaction is what sets us apart. We believe that
                    businesses deserve a point-of-sale software that is designed
                    to help them succeed, and that's exactly what Divine POS
                    delivers. We are continuously refining our software,
                    ensuring it meets the ever-changing needs of modern
                    businesses, and providing excellent customer support to help
                    our clients get the most out of our solutions. <br />
                    <br /> Whether you are a small retail shop or a large
                    restaurant, Divine POS has the tools and features you need
                    to take your business to the next level. Our software
                    provides a wide range of functionalities, including
                    inventory management, sales tracking, customer relationship
                    management, and reporting, which can help you streamline
                    your operations, increase efficiency, and make data-driven
                    decisions. <br />
                    <br /> At Divine POS, we are proud of our roots in Waterloo,
                    Ontario, and we are committed to helping businesses in our
                    community and beyond succeed. We invite you to experience
                    the benefits of our point-of-sale software for yourself and
                    join our growing community of satisfied customers.
                  </p>
                  <div className="padding-bottom padding-xlarge" />
                </div>
                <div className="padding-bottom padding-xxhuge" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
