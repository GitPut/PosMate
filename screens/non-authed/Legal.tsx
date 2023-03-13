import { View, Text } from "react-native";
import React from "react";
import Footer from "components/Footer";

const Legal = () => {
  return (
    <div className="page-wrapper-non">
      <main className="main-wrapper">
        <section className="section-legal-header">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="max-width-large align-center">
                  <div className="terms-header-component">
                    <h1 className="heading-style-h3 text-color-white">
                      Terms &amp; privacy
                    </h1>
                    <div className="padding-bottom padding-medium" />
                    <p className="text-size-medium text-color-white">
                      At Divine Pos, we understand the importance of protecting
                      the personal information of our users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graphic-circle is-small" />
          <div className="graphic-circle-3 is-small" />
        </section>
        <section className="section-legal-body">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-bottom padding-xhuge" />
              <div className="max-width-large align-center">
                <div
                  fs-toc-offsettop="4rem"
                  fs-toc-element="contents"
                  className="text-rich-text-02 w-richtext"
                >
                  <h2>Terms of Service for Divine Pos:</h2>
                  <div className="padding-bottom padding-medium" />
                  <h2>1. License:</h2>
                  <p>
                    We grant you a non-exclusive, non-transferable license to
                    use our rental pos software for your own business purposes.
                  </p>
                  <h2>2. Fees:</h2>
                  <p>
                    You agree to pay the fees associated with your use of our
                    service, as outlined in our pricing plan.
                  </p>
                  <h2>3. Limitation of Liability:</h2>
                  <p>
                    We are not liable for any damages arising from your use of
                    our service, including but not limited to loss of profits or
                    data.
                  </p>
                  <h2>4. Termination:</h2>
                  <p>
                    We may terminate your use of our service at any time if you
                    violate these terms of service.
                  </p>
                </div>
              </div>
              <div className="padding-bottom padding-xxhuge" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
