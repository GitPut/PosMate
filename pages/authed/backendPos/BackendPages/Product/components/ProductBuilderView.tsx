import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import ItemNoOptionsView from "./ItemNoOptionsView";
import DisplayOption from "pages/authed/pos/MainPosPage/components/ProductBuilderModal/PosComponents/DisplayOption";
import { ProductProp } from "types/global";

interface ProductBuilderViewProps {
  product: ProductProp;
  imageUrl: string | null;
}

function ProductBuilderView({ product, imageUrl }: ProductBuilderViewProps) {
  const myObj = product;
  const [myObjProfile, setmyObjProfile] = useState(myObj);
  const [total, settotal] = useState(myObj.total ? myObj.total : myObj.price);
  const [openOptions, setopenOptions] = useState<string | null>(null);

  useEffect(() => {
    setmyObjProfile(product);
  }, [product]);

  useEffect(() => {
    settotal(getPrice().toString());
  }, [myObjProfile]);

  const getPrice = () => {
    let total = parseFloat(myObjProfile.price);
    myObjProfile.options.forEach((op) => {
      op.optionsList
        .filter((f) => f.selected === true)
        .map(
          (e) => (total += e.priceIncrease ? parseFloat(e.priceIncrease) : 0)
        );
    });
    myObjProfile.options.forEach((op) => {
      op.optionsList
        .filter((f) => f.selectedTimes ?? 0 > 0)
        .map((e) => {
          const thisItemSelectedTimes = e.selectedTimes
            ? parseInt(e.selectedTimes)
            : 0;
          const thisItemCountsAs = e.countsAs ? parseInt(e.countsAs) : 1;
          total += e.priceIncrease
            ? parseFloat(e.priceIncrease) *
              thisItemCountsAs *
              thisItemSelectedTimes
            : 0;
        });
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
        }}
        style={{ width: "100%", height: "100%", padding: 20 }}
      >
        <Text style={{ fontWeight: "700", color: "#121212", fontSize: 21 }}>
          Preview
        </Text>
        {product.options.length > 0 ? (
          <>
            <View style={styles.productBuilderGroup}>
              <View style={styles.itemInfoContainer}>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                    style={[
                      styles.itemImg,
                      myObj.description ? { width: 300, height: 150 } : {},
                    ]}
                    key={myObj.id}
                  />
                )}
                <View style={styles.itemInfoTxtGroup}>
                  <View style={styles.topTxtGroup}>
                    <Text style={styles.productName}>{myObj.name}</Text>
                    <>
                      {myObj.calorieDetails && (
                        <Text style={styles.calorieDetails}>280 cal/slice</Text>
                      )}
                    </>
                  </View>
                  <>
                    {myObj.description && (
                      <Text style={styles.description}>
                        Description: {myObj.description}
                      </Text>
                    )}
                  </>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  padding: 20,
                  paddingLeft: 30,
                  paddingRight: 30,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <View>
                  {myObjProfile.options.map((option, index) => (
                    <DisplayOption
                      key={option.id}
                      e={option}
                      index={index}
                      myObjProfile={myObjProfile}
                      setMyObjProfile={setmyObjProfile}
                      setopenOptions={setopenOptions}
                      openOptions={openOptions}
                      isOnlineOrder={false}
                      scrollY={scrollY}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.totalLblRow}>
                <Text style={styles.totalLbl}>
                  Total: ${parseFloat(total).toFixed(2)}
                </Text>
              </View>
            </View>
            {/* <View style={styles.addToCartRow}>
              <AddToCartBtn
                style={styles.addToCartBtn}
                title="Add To Cart"
                onPress={() => {
                  //
                }}
              />
            </View> */}
          </>
        ) : (
          <ItemNoOptionsView product={product} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf2ff",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  productBuilderGroup: {
    width: "100%",
    height: "85%",
    paddingTop: 20,
  },
  goBackRow: {
    alignSelf: "stretch",
  },
  goBackBtn: {
    height: 32,
    width: 126,
  },
  leftRightGroup: {
    height: "70%",
  },
  leftSideGroup: {
    width: "35%",
    height: "100%",
    justifyContent: "space-between",
  },
  itemInfoContainer: {
    height: 350,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  itemImg: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  itemInfoTxtGroup: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTxtGroup: {
    marginTop: 7,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 30,
    paddingLeft: "3%",
    paddingRight: "3%",
    textAlign: "center",
  },
  calorieDetails: {
    color: "rgba(131,126,126,1)",
    marginBottom: 25,
  },
  description: {
    color: "rgba(131,126,126,1)",
    width: "90%",
    textAlign: "left",
    paddingBottom: 50,
  },
  writeNoteContainer: {
    height: "35%",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  notesLbl: {
    fontWeight: "700",
    color: "#121212",
    marginBottom: 10,
  },
  noteInput: {
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    padding: 10,
  },
  noteInputTxt: {
    color: "#90949a",
  },
  rightSideGroup: {
    width: "60%",
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 999,
  },
  oneTimeSelectableOptionGroup: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  dropdownSelectableOption: {
    height: 44,
    marginBottom: 20,
    alignSelf: "stretch",
  },
  totalLblRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    paddingTop: 20,
  },
  totalLbl: {
    fontWeight: "700",
    color: "#00c937",
    fontSize: 22,
    marginTop: 0,
  },
  addToCartRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
    marginTop: 25,
    height: 41,
    zIndex: -100,
  },
  addToCartBtn: {
    height: 41,
    width: 147,
    zIndex: -100,
  },
});

export default ProductBuilderView;
