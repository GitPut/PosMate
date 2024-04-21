import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderTxt from "./HeaderTxt";
import PeriodSlider from "./PeriodSlider";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { GooglePlacesStyles } from "components/functional/GooglePlacesStyles";
import ViewPlan from "./ViewPlan";
import GeneralInputWithLabel from "components/GeneralInputWithLabel";
import { AddressType } from "types/global";
const GOOGLE_API_KEY = "AIzaSyDjx4LBIEDNRYKEt-0_TJ6jUcst4a2YON4";

interface DetailsStageProps {
  setstageNum: (num: number) => void;
  setstoreName: (storeName: string) => void;
  setphoneNumber: (phoneNumber: string) => void;
  setwebsite: (website: string) => void;
  setaddress: (address: AddressType) => void;
  address: AddressType | null;
  paymentTerm: string;
  setpaymentTerm: (paymentTerm: string) => void;
  planType: string | null;
  storeName: string;
  phoneNumber: string;
  website: string;
}

function DetailsStage({
  setstageNum,
  setstoreName,
  setphoneNumber,
  setwebsite,
  setaddress,
  address,
  paymentTerm,
  setpaymentTerm,
  planType,
  storeName,
  phoneNumber,
  website,
}: DetailsStageProps) {
  return (
    <View style={styles.container}>
      <HeaderTxt
        Txt="Step 2: Enter Store Details"
        SubTxt="Fill in your store's information!"
      />
      <View style={styles.contentContainer}>
        <View style={styles.topSectionOfContainer}>
          <PeriodSlider
            setpaymentTerm={setpaymentTerm}
            paymentTerm={paymentTerm}
          />
          <View style={styles.plansRow}>
            <ViewPlan
              planType={planType}
              paymentTerm={paymentTerm}
              setstageNum={setstageNum}
            />
            <View
              style={{
                width: 320,
                height: 384,
                justifyContent: "space-between",
              }}
            >
              <GeneralInputWithLabel
                lbl="Store Name *"
                placeholder="Enter store name"
                value={storeName}
                onChangeText={(val) => setstoreName(val)}
              />
              <GeneralInputWithLabel
                lbl="Phone Number *"
                placeholder="Enter store phone #"
                value={phoneNumber}
                onChangeText={(val) => setphoneNumber(val)}
              />
              <GeneralInputWithLabel
                lbl="Website"
                placeholder="Enter store website url (Optional)"
                value={website}
                onChangeText={(val) => setwebsite(val)}
              />
              <GeneralInputWithLabel
                lbl="Address *"
                CustomInput={() => (
                  <GooglePlacesAutocomplete
                    apiOptions={{
                      region: "CA",
                    }}
                    debounce={800}
                    apiKey={GOOGLE_API_KEY}
                    // onSelect={handleAddress}
                    selectProps={{
                      value: address,
                      onChange: setaddress,
                      defaultValue: address,
                      placeholder: "Enter store address",
                      menuPortalTarget: document.body,
                      styles: GooglePlacesStyles,
                    }}
                    renderSuggestions={(
                      active,
                      suggestions,
                      onSelectSuggestion
                    ) => (
                      <div>
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="suggestion"
                            onClick={(event) => {
                              onSelectSuggestion(suggestion, event);
                            }}
                          >
                            {suggestion.description}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 898,
  },
  contentContainer: {
    width: 898,
    height: 550,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 30,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 10,
  },
  topSectionOfContainer: {
    width: 860,
    height: 500,
    justifyContent: "space-between",
    alignItems: "center",
  },
  plansRow: {
    width: 700,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plan: {
    height: 384,
    width: 275,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  plan2: {
    height: 384,
    width: 275,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  plan3: {
    height: 384,
    width: 275,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  buttonRow: {
    height: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 860,
  },
  nextBtn: {
    height: 50,
    width: 143,
  },
});

export default DetailsStage;
