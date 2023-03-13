import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Footer from "components/Footer";
import Accordian from "components/Accordian";


const Faqs = () => {


return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className="section-faq">
          <div className="padding-global">
            <div className="container-small">
              <div className="padding-section-medium">ctive
                <div className="faq-component">
                  <div className="faq-content">
                    <div className="tagline text-color-white">FAQs</div>
                    <div className="padding-bottom padding-small" />
                    <h1 className="heading-style-h2 text-color-white">
                      Frequently asked questions
                    </h1>
                    <div className="padding-bottom padding-medium" />
                    <p className="text-size-large text-color-white">
                      We thought you'd ask. So we've assembled a short list of
                      answers to the most common questions we get.
                    </p>
                  </div>
                  
                  <div className="faq-list">
                    <div className="w-layout-grid faq-list-grid">
                      <Accordian question="How does DivinePos's pricing work" answer= 'DivinePos offers flexible pricing options based on the needs and requirements of each business. Whether you have a small business or a large enterprise, you can find a pricing plan that suits your needs and budget. Additionally, the company provides a free trial period to help businesses evaluate the software before making a purchasing decision.' />
                        <Accordian question='What data does Divine Pos track?' answer='While we do not currently track data, we recognize the significance of business analytics in driving growth. Our future plans include implementing a tracking system to gather and analyze store data, providing insights for optimizing business operations. Our commitment to utilizing technology and providing valuable tools is aimed at facilitating informed decision-making and driving success for your business.' />
                         <Accordian question='How does Divine Pos handle my data?' answer='Divine Pos takes data privacy and security very seriously. All customer data is stored and hosted on secure servers managed by Google, a trusted and reliable technology partner. This ensures that your data is protected by robust security measures and kept safe from unauthorized access or use. We prioritize the confidentiality, integrity, and availability of your data, and adhere to industry-standard security protocols to safeguard your information. At Divine Pos, we are committed to ensuring the highest level of data privacy and security for our customers.' />
                        <Accordian question='Can I try Divine Pos for free?' answer="DivinePos offers a one-day free trial and demo to explore our software's features and capabilities, helping potential customers assess its suitability for their needs." />
                           <Accordian question='How do I cancel my paid plan?' answer="To cancel your plan, simply access your account's billing settings and follow the cancellation instructions provided."/>
                           <Accordian question='How do refunds work?' answer='If you require a refund, please do not hesitate to contact DivinePos customer support. Our team of experts will be happy to assist you with the process and ensure that your refund is handled promptly and efficiently. At DivinePos, we strive to provide exceptional customer service and are committed to ensuring that our customers are satisfied with their experience.' />
                    </div>
                    <div className="padding-bottom padding-xlarge" />
                    <div className="text-size-regular text-align-center text-color-white">
                      Can’t see what you’re looking for?{" "}
                      <a href="/contact" className="faq-link text-color-white">
                        Contact us
                      </a>
                      .
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

export default Faqs;
