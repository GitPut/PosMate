// import Main from "./WebHomeFiles/index.html";
import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import MaterialButtonViolet from "components/MaterialButtonViolet";
import FeatureItem from "components/FeatureItem";
import MaterialButtonPrimary from "components/MaterialButtonPrimary";
import PlanItem from "components/PlanItem";
import Index from "../PagesTest/index.html";

const WebHome = () => {
  return (
    <div dangerouslySetInnerHTML={{__html: Index}} />
    // <View>
    //   <View style={styles.container}>
    //     <View style={styles.welcomeContainer}>
    //       <View style={styles.leftContainerWelcome}>
    //         <Text style={styles.h1}>Welcome to Divine Pos</Text>
    //         <Text style={styles.p1}>
    //           Revolutionize Your Pizza Business with Our Cutting-Edge POS
    //           Software – Streamline Operations and Boost Sales Today!
    //         </Text>
    //         <MaterialButtonViolet
    //           caption="Try Demo"
    //           style={styles.demoBtn}
    //         ></MaterialButtonViolet>
    //       </View>
    //       <Image
    //         source={require("assets/female-customer-buying-coffee-and-placing-signature-on-tablet-1138022521-fb865c0fe2064cff824f98d141a60350.jpg")}
    //         resizeMode="contain"
    //         style={styles.heroImg1}
    //       ></Image>
    //     </View>
    //     <View style={styles.aboutContainer}>
    //       <Text style={styles.aboutUsH1}>About Us</Text>
    //       <Text style={styles.aboutUsBody}>
    //         Welcome to our company! We are dedicated to helping local mom and
    //         pop pizza stores modernize and grow their businesses. We understand
    //         the unique challenges that small pizzerias face, and we’re here to
    //         offer a solution. Our state-of-the-art POS software streamlines
    //         operations, improves accuracy, and enhances the customer
    //         experience.We’re passionate about helping local businesses succeed,
    //         and we believe in the power of technology to make that happen. Our
    //         team of experts has years of experience in both the pizza industry
    //         and software development, and we work tirelessly to provide the best
    //         possible solution for our customers.We’re proud to be a part of the
    //         local business community, and we’re committed to making a difference
    //         in the lives of small pizzeria owners. If you’re ready to take your
    //         business to the next level, we’re here to help. Contact us today to
    //         learn more about our software and how it can help you succeed.
    //       </Text>
    //     </View>
    //     <View style={styles.featureContainer}>
    //       <FeatureItem
    //         instantAccess1="With our software, you'll have immediate access to all the information you need to manage your business, including sales data, inventory levels, and customer information."
    //         instantAccess="Instant Access"
    //         style={styles.featureItem1}
    //       ></FeatureItem>
    //       <FeatureItem
    //         instantAccess1="Our software is scalable to meet the changing needs of your business, so you can grow and succeed with ease."
    //         instantAccess="Streamlined Operations"
    //         style={styles.featureItem2}
    //       ></FeatureItem>
    //       <FeatureItem
    //         instantAccess1="We offer excellent customer support, including training and ongoing assistance, so you can feel confident using our software."
    //         instantAccess="Scalability"
    //         style={styles.featureItem3}
    //       ></FeatureItem>
    //       <FeatureItem
    //         instantAccess1="We offer excellent customer support, including training and ongoing assistance, so you can feel confident using our software."
    //         instantAccess="Excellent Support"
    //         style={styles.featureItem4}
    //       ></FeatureItem>
    //     </View>
    //     <View style={styles.pricingContainer}>
    //       <View style={styles.startDemoContainer}>
    //         <Text style={styles.demoH1}>Before You Start Try Our Demo</Text>
    //         <Text style={styles.demoBodyTxt}>
    //           Experience the difference with our Divine Pos – Get instant access
    //           to our demo, no need to wait for a representative.
    //         </Text>
    //         <MaterialButtonPrimary
    //           caption="Try Our Demo"
    //           style={styles.demoBtn2}
    //         ></MaterialButtonPrimary>
    //       </View>
    //       <PlanItem />
    //     </View>
    //   </View>
    //   <View style={styles.footerContainer}>
    //     <Text style={styles.copyrightTxt}>
    //       © 2023 All Rights Reserved. Divine Pos
    //     </Text>
    //   </View>
    // </View>
  );
};

export default WebHome;

const styles = StyleSheet.create({
  // main: { flex: 1, backgroundColor: "white" },
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  welcomeContainer: {
    height: 416,
    margin: 50,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainerWelcome: {
    width: 518,
    height: 377,
    justifyContent: "space-around",
  },
  h1: {
    fontWeight: "700",
    color: "rgba(9,52,103,1)",
    fontSize: 40,
  },
  p1: {
    color: "rgba(9,52,103,1)",
    fontSize: 30,
    width: 518,
    height: 171,
  },
  demoBtn: {
    height: 57,
    width: 154,
  },
  heroImg1: {
    width: 478,
    height: 316,
  },
  aboutContainer: {
    height: 523,
    margin: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  aboutUsH1: {
    fontWeight: "700",
    color: "rgba(9,52,103,1)",
    fontSize: 40,
    textAlign: "center",
  },
  aboutUsBody: {
    color: "rgba(9,52,103,1)",
    fontSize: 25,
    width: 1132,
  },
  featureContainer: {
    height: 368,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 50,
    alignSelf: "stretch",
  },
  featureItem1: {
    height: 276,
    width: 295,
  },
  featureItem2: {
    height: 276,
    width: 295,
  },
  featureItem3: {
    height: 276,
    width: 295,
  },
  featureItem4: {
    height: 276,
    width: 295,
  },
  pricingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 50,
    alignSelf: "stretch",
  },
  startDemoContainer: {
    width: 450,
    height: "100%",
    justifyContent: "space-between",
  },
  demoH1: {
    fontWeight: "700",
    color: "rgba(37,35,35,1)",
    fontSize: 25,
  },
  demoBodyTxt: {
    color: "rgba(37,35,35,1)",
    fontSize: 25,
    width: 346,
    height: 154,
  },
  demoBtn2: {
    height: 52,
    width: 188,
    marginTop: 25,
  },
  footerContainer: {
    height: 54,
    backgroundColor: "rgba(70,68,68,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  copyrightTxt: {
    color: "rgba(255,255,255,1)",
    fontSize: 17,
  },
});
