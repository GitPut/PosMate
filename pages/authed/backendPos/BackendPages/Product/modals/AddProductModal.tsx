import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Image,
} from "react-native";
import OptionsItem from "../components/OptionsItem";
import {
  Ionicons as IoniconsIcon,
  MaterialCommunityIcons as MaterialCommunityIconsIcon,
} from "@expo/vector-icons";
import {
  onlineStoreState,
  setUserStoreState,
  userStoreState,
} from "state/state";
import { auth, db, storage } from "state/firebaseConfig";
import GeneralSwitch from "components/GeneralSwitch";
import ProductBuilderView from "../components/ProductBuilderView";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import { ProductProp } from "types/global";
import GeneralDropdownStringOptions from "components/GeneralDropdownStringOptions";

interface AddProductModalProps {
  addProductModal: boolean;
  setaddProductModal: (val: boolean) => void;
  existingProduct?: ProductProp | null;
  setexistingProduct: (val: ProductProp | null) => void;
  isProductTemplate: boolean;
  setisProductTemplate: (val: boolean) => void;
}

const customSort = (a: ProductProp, b: ProductProp) => {
  // Handle cases where one or both items don't have a rank
  const rankA = parseFloat(a.rank ?? "0") || Number.MAX_SAFE_INTEGER;
  const rankB = parseFloat(b.rank ?? "0") || Number.MAX_SAFE_INTEGER;

  // Compare based on ranks
  return rankA - rankB;
};

function AddProductModal({
  addProductModal,
  setaddProductModal,
  existingProduct,
  setexistingProduct,
  isProductTemplate,
  setisProductTemplate,
}: AddProductModalProps) {
  const { width, height } = useWindowDimensions();
  const catalog = userStoreState.use();
  const [newProduct, setnewProduct] = useState<ProductProp>(
    existingProduct
      ? existingProduct
      : {
          name: "",
          price: "0",
          category: null,
          options: [],
          description: "",
          id: Math.random().toString(36).substr(2, 9),
        }
  );
  const [newProductOptions, setnewProductOptions] = useState(
    existingProduct ? existingProduct.options : []
  );
  const [currentImgUrl, setcurrentImgUrl] = useState(
    existingProduct ? existingProduct.imageUrl : null
  );
  const onlineStoreDetails = onlineStoreState.use();
  const [indexOn, setindexOn] = useState<number | null>(null);
  const [selectValues, setselectValues] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<null | File>();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedID, setselectedID] = useState<string | null>(null);
  const alertP = useAlert();

  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose your new product!",
      showCancelButton: true,
      confirmButtonColor: "#2b3659",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discard!",
    }).then(function (t) {
      if (t.value) {
        setaddProductModal(false);
        setexistingProduct(null);
        setisProductTemplate(false);
      }
    });
  };

  useEffect(() => {
    if (existingProduct) {
      setnewProduct(existingProduct);
      setnewProductOptions(existingProduct.options);
      setcurrentImgUrl(existingProduct.imageUrl);
    }
  }, [addProductModal, existingProduct]);

  // Function to trigger the file input click event
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  useEffect(() => {
    if (catalog.categories) {
      const local: string[] = [];
      // catalog.categories.map((val, index) => local.push({ id: index, text: val, }));
      catalog.categories.map((val) => local.push(val));
      setselectValues(local);
    }
  }, []);

  useEffect(() => {
    setnewProduct((prev) => {
      const clone = structuredClone(prev);
      clone.options = newProductOptions;
      return clone;
    });
  }, [newProductOptions]);

  function handleDataUpdate() {
    if (!newProduct.name) {
      alertP.error("Please enter a product name");
      return;
    }
    // if (!newProduct.category) {
    //     alertP.error('Please select a category')
    //     return
    // }
    if (!newProduct.price) {
      alertP.error("Please enter a price");
      return;
    }

    if (existingProduct && !isProductTemplate) {
      const copy = structuredClone(catalog.products);
      const newProductUseRef: ProductProp = {
        ...newProduct,
        options: newProductOptions,
      };
      const findIndex = copy.findIndex((e) => e.id === existingProduct.id);

      // Upload Image

      if (selectedFile) {
        newProductUseRef.hasImage = true;
        storage
          .ref(auth.currentUser?.uid + "/images/" + existingProduct.id)
          .put(selectedFile)
          .then(() => {
            storage
              .ref(auth.currentUser?.uid + "/images/" + existingProduct.id)
              .getDownloadURL()
              .then((url) => {
                newProductUseRef.hasImage = true;
                newProductUseRef.imageUrl = url;
                if (
                  newProductUseRef.hasImage &&
                  !selectedFile &&
                  !currentImgUrl
                ) {
                  storage
                    .ref(
                      auth.currentUser?.uid + "/images/" + existingProduct.id
                    )
                    .delete();
                  newProductUseRef.hasImage = false;
                  newProductUseRef.imageUrl = null;
                }

                copy[findIndex] = newProductUseRef;
                if (!newProductUseRef.id) return;

                setUserStoreState({
                  categories: catalog.categories,
                  products: copy.sort(customSort),
                });
                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .collection("products")
                  .doc(newProductUseRef.id.toString())
                  .set(newProductUseRef);
                if (onlineStoreDetails.onlineStoreSetUp) {
                  db.collection("public")
                    .doc(auth.currentUser?.uid)
                    .collection("products")
                    .doc(newProductUseRef.id.toString())
                    .set(newProductUseRef);
                }
              });
          });
      } else {
        if (newProductUseRef.hasImage && !selectedFile && !currentImgUrl) {
          storage
            .ref(auth.currentUser?.uid + "/images/" + existingProduct.id)
            .delete();
          newProductUseRef.hasImage = false;
          newProductUseRef.imageUrl = null;
        }

        copy[findIndex] = newProductUseRef;
        if (!newProductUseRef.id) return;

        setUserStoreState({
          categories: catalog.categories,
          products: copy.sort(customSort),
        });
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("products")
          .doc(newProductUseRef.id.toString())
          .set(newProductUseRef);
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(auth.currentUser?.uid)
            .collection("products")
            .doc(newProductUseRef.id.toString())
            .set(newProductUseRef);
        }
      }
    } else {
      if (selectedFile) {
        storage
          .ref(auth.currentUser?.uid + "/images/" + newProduct.id)
          .put(selectedFile)
          .then(() => {
            storage
              .ref(auth.currentUser?.uid + "/images/" + newProduct.id)
              .getDownloadURL()
              .then((url) => {
                newProduct.hasImage = true;
                newProduct.imageUrl = url;
                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .collection("products")
                  .doc(newProduct.id?.toString())
                  .set(newProduct);
                if (onlineStoreDetails.onlineStoreSetUp) {
                  db.collection("public")
                    .doc(auth.currentUser?.uid)
                    .collection("products")
                    .doc(newProduct.id?.toString())
                    .set(newProduct);
                }
                setUserStoreState({
                  categories: catalog.categories,
                  products: [...catalog.products, newProduct].sort(customSort),
                });
              });
          });
      } else {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("products")
          .doc(newProduct.id?.toString())
          .set(newProduct);
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(auth.currentUser?.uid)
            .collection("products")
            .doc(newProduct.id?.toString())
            .set(newProduct);
        }
        setUserStoreState({
          categories: catalog.categories,
          products: [...catalog.products, newProduct].sort(customSort),
        });
      }
    }
    setaddProductModal(false);
    setexistingProduct(null);
    setisProductTemplate(false);
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files[0].size < 5000000) {
      setSelectedFile(event.target.files[0]);
    } else {
      alertP.error("Sorry 5mb files are the max!");
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (
          existingProduct &&
          JSON.stringify(existingProduct) !== JSON.stringify(newProduct)
        ) {
          confirmText();
        } else if (!existingProduct && newProduct.name.length > 0) {
          confirmText();
        } else {
          setaddProductModal(false);
          setexistingProduct(null);
          setisProductTemplate(false);
        }
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
      }}
    >
      <Pressable>
        <div style={{ cursor: "default" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <View
              style={[
                styles.container,
                { height: height * 0.9, width: width * 0.6 },
              ]}
            >
              <View style={styles.topRow}>
                <Text style={styles.productAdd}>
                  Product{" "}
                  {isProductTemplate
                    ? "Add"
                    : existingProduct
                    ? "Update"
                    : "Add"}
                </Text>
                {existingProduct && !isProductTemplate && (
                  <Pressable
                    style={styles.templateBtn}
                    onPress={() => {
                      const copy: ProductProp = { ...existingProduct };
                      copy.name = copy.name + " Copy";
                      copy.imageUrl = "";
                      copy.hasImage = false;
                      copy.id = Math.random().toString(36).substr(2, 9);
                      db.collection("users")
                        .doc(auth.currentUser?.uid)
                        .collection("products")
                        .doc(copy.id.toString())
                        .set(copy);
                      if (onlineStoreDetails.onlineStoreSetUp) {
                        db.collection("public")
                          .doc(auth.currentUser?.uid)
                          .collection("products")
                          .doc(copy.id.toString())
                          .set(copy);
                      }
                      setUserStoreState({
                        categories: catalog.categories,
                        products: [...catalog.products, copy],
                      });
                      setexistingProduct(copy);
                    }}
                  >
                    <Text style={styles.templatesBtnLbl}>Duplicate</Text>
                    <IoniconsIcon name="copy" style={styles.chevronDownIcon} />
                  </Pressable>
                )}
              </View>
              <View style={[styles.innerScrollArea, { height: height * 0.6 }]}>
                <ScrollView
                  contentContainerStyle={
                    styles.innerScrollArea_contentContainerStyle
                  }
                  onScroll={(event) => {
                    const currentScrollPosition =
                      event.nativeEvent.contentOffset.y;
                    setScrollY(currentScrollPosition);
                  }}
                  scrollEventThrottle={16} // Adjust the throttle rate as needed
                  ref={scrollViewRef} // Step 2: Assign the ref to ScrollView
                >
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={changeHandler}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                  <View style={styles.imageUploadGroup}>
                    <Text style={styles.productImageUploadTxt}>
                      Product Image Upload
                    </Text>
                    <Pressable
                      onPress={handleClick}
                      style={[styles.productImageUpContainer]}
                    >
                      {selectedFile ? (
                        <>
                          <Image
                            source={{ uri: URL.createObjectURL(selectedFile) }}
                            style={{
                              width: 150,
                              height: 150,
                              resizeMode: "contain",
                            }}
                            key={selectedFile.name}
                          />
                          <Pressable
                            style={{
                              backgroundColor: "red",
                              padding: 5,
                              borderRadius: 5,
                              position: "absolute",
                              top: 10,
                              right: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              setSelectedFile(null);
                            }}
                          >
                            <Text style={{ color: "white" }}>Remove</Text>
                          </Pressable>
                        </>
                      ) : currentImgUrl ? (
                        <>
                          <Image
                            source={{ uri: currentImgUrl }}
                            style={{
                              width: 150,
                              height: 150,
                              resizeMode: "contain",
                            }}
                              key={currentImgUrl}
                          />
                          <Pressable
                            style={{
                              backgroundColor: "red",
                              padding: 5,
                              borderRadius: 5,
                              position: "absolute",
                              top: 10,
                              right: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => {
                              setSelectedFile(null);
                              setcurrentImgUrl(null);
                            }}
                          >
                            <Text style={{ color: "white" }}>Remove</Text>
                          </Pressable>
                        </>
                      ) : (
                        <View style={styles.uploadImageInner}>
                          <MaterialCommunityIconsIcon
                            name="folder-multiple-image"
                            style={styles.upProductImageIcon}
                          />
                          <Text style={styles.dragDropImageTxt}>
                            Drag &amp; drop or select a file to upload Image
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>
                  <View style={styles.spacer}></View>
                  <View style={styles.productSmallDetailsRow}>
                    <View style={styles.productNameInputGroup}>
                      <Text style={styles.productNameTxt}>Product Name</Text>
                      <TextInput
                        style={styles.productNameBox}
                        placeholder="Enter Product Name"
                        onChangeText={(val) =>
                          setnewProduct((prevState) => ({
                            ...prevState,
                            name: val,
                          }))
                        }
                        value={newProduct?.name}
                      />
                    </View>
                    <View style={styles.productPriceInputGroup}>
                      <Text style={styles.productPriceTxt}>Base Price</Text>
                      <TextInput
                        style={styles.productPriceBox}
                        placeholder="Enter Base Price"
                        onChangeText={(val) => {
                          const re = /^-?\d*\.?\d*$/;

                          // if value is not blank, then test the regex

                          if (re.test(val)) {
                            setnewProduct((prevState) => ({
                              ...prevState,
                              price: val.replace(/^0+/, ""),
                            }));
                          } else if (!val) {
                            setnewProduct((prevState) => ({
                              ...prevState,
                              price: "0",
                            }));
                          }
                        }}
                        value={newProduct?.price.toString()}
                      />
                    </View>
                    <View style={styles.productCategoryInputGroup}>
                      <Text style={styles.category}>Category</Text>
                      <GeneralDropdownStringOptions
                        placeholder="Choose Category"
                        value={
                          newProduct?.category ? newProduct.category : null
                        }
                        setValue={(val) => {
                          setnewProduct((prevState) => ({
                            ...prevState,
                            category: val,
                          }));
                        }}
                        options={selectValues}
                        scrollY={scrollY}
                      />
                    </View>
                    <View style={styles.productRankInputGroup}>
                      <Text style={styles.rankTxt}>Rank</Text>
                      <TextInput
                        style={styles.rankBox}
                        placeholder="N/A"
                        onChangeText={(val) => {
                          const re = /^[0-9]+$/;

                          // if value is not blank, then test the regex

                          if (re.test(val)) {
                            setnewProduct((prevState) => ({
                              ...prevState,
                              rank: val,
                            }));
                          } else if (!val) {
                            setnewProduct((prevState) => ({
                              ...prevState,
                              rank: undefined,
                            }));
                          }
                        }}
                        value={newProduct?.rank?.toString()}
                      />
                    </View>
                  </View>
                  <View style={styles.spacer2}></View>
                  <View style={styles.displayOnlineSwitchRow}>
                    <Text style={styles.displayOnlineStoreTxt}>
                      Dont display on online store?:
                    </Text>
                    {/* <View style={styles.onlineStoreSwitch}></View> */}
                    <GeneralSwitch
                      isActive={newProduct?.dontDisplayOnOnlineStore ?? false}
                      toggleSwitch={() => {
                        setnewProduct((prevState) => ({
                          ...prevState,
                          dontDisplayOnOnlineStore:
                            !prevState.dontDisplayOnOnlineStore,
                        }));
                      }}
                    />
                  </View>
                  <View style={styles.spacer3}></View>
                  <View style={styles.productDescriptionInputGroup}>
                    <Text style={styles.productDescriptionTxt}>
                      Product Description
                    </Text>
                    <TextInput
                      style={styles.productDiscBox}
                      placeholder="Enter Product Description"
                      onChangeText={(val) =>
                        setnewProduct((prevState) => ({
                          ...prevState,
                          description: val,
                        }))
                      }
                      multiline={true}
                      value={newProduct?.description}
                    />
                  </View>
                  <View style={styles.spacer4}></View>
                  <Text style={styles.optionsTxt}>Options</Text>
                  <View style={styles.spacer5}></View>
                  {newProduct.options.map((option, index) => {
                    return (
                      <OptionsItem
                        key={option.id}
                        style={styles.optionsItem}
                        item={option}
                        index={index}
                        setnewProduct={setnewProduct}
                        newProduct={newProduct}
                        newProductOptions={newProductOptions}
                        setnewProductOptions={setnewProductOptions}
                        indexOn={indexOn}
                        setindexOn={setindexOn}
                        scrollY={scrollY}
                        scrollViewRef={scrollViewRef}
                        selectedID={selectedID}
                        setselectedID={setselectedID}
                      />
                    );
                  })}
                  {newProduct.options.length === 0 && (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Pressable
                        onPress={() => {
                          setnewProductOptions([
                            {
                              label: null,
                              optionsList: [],
                              // selectedCaseKey: null,
                              // selectedCaseValue: null,
                              numOfSelectable: null,
                              id: Math.random().toString(36).substr(2, 9),
                              optionType: null,
                              selectedCaseList: [],
                              isRequired: false,
                            },
                          ]);
                          setindexOn(0);
                        }}
                        disabled={
                          newProduct?.options.length > 0 &&
                          newProduct?.options[newProduct?.options.length - 1]
                            .label === null
                        }
                        style={styles.createOptionBtn}
                      >
                        <Text style={styles.createOptionTxt}>
                          Create Option
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.createOptionBtn, { marginLeft: 20 }]}
                        onPress={() => {
                          navigator.clipboard.readText().then((text) => {
                            try {
                              const parsed = JSON.parse(text);
                              setnewProductOptions([parsed]);
                              setindexOn(0);
                            } catch (e) {
                              alertP.error("Invalid JSON");
                            }
                          });
                        }}
                      >
                        <Text style={styles.createOptionTxt}>Paste Option</Text>
                      </Pressable>
                    </View>
                  )}
                </ScrollView>
              </View>
              <View style={styles.cancelAndSaveBtns}>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => {
                    if (
                      existingProduct &&
                      JSON.stringify(existingProduct) !==
                        JSON.stringify(newProduct)
                    ) {
                      confirmText();
                    } else if (!existingProduct && newProduct.name.length > 0) {
                      confirmText();
                    } else {
                      setaddProductModal(false);
                      setexistingProduct(null);
                      setisProductTemplate(false);
                    }
                  }}
                >
                  <Text style={styles.cancelTxt}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.saveBtn} onPress={handleDataUpdate}>
                  <Text style={styles.saveTxt}>
                    {isProductTemplate
                      ? "Add"
                      : existingProduct
                      ? "Save"
                      : "Add"}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={[
                styles.container,
                { height: height * 0.9, width: width * 0.36 },
              ]}
            >
              <ProductBuilderView
                product={newProduct}
                imageUrl={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : currentImgUrl
                    ? currentImgUrl
                    : null
                }
              />
            </View>
          </View>
        </div>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "space-around",
  },
  topRow: {
    width: "95%",
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productAdd: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 21,
  },
  templateBtn: {
    width: 175,
    height: 48,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  templatesBtnLbl: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginRight: 10,
  },
  chevronDownIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  innerScrollArea: {
    width: "90%",
  },
  innerScrollArea_contentContainerStyle: {
    paddingRight: 20,
  },
  imageUploadGroup: {
    width: "100%",
    height: 179,
    justifyContent: "space-between",
  },
  productImageUploadTxt: {
    color: "#121212",
    fontSize: 17,
    marginBottom: 5,
  },
  productImageUpContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a8a8a8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  uploadImageInner: {
    width: 400,
    height: 98,
    alignItems: "center",
    justifyContent: "space-between",
  },
  upProductImageIcon: {
    color: "rgba(0,0,0,1)",
    fontSize: 70,
  },
  dragDropImageTxt: {
    color: "#121212",
    fontSize: 16,
  },
  spacer: {
    width: "100%",
    height: 53,
  },
  productSmallDetailsRow: {
    width: "100%",
    height: 79,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productNameInputGroup: {
    width: 195,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  productNameTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productNameBox: {
    width: 195,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  productPriceInputGroup: {
    width: 197,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  productPriceTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productPriceBox: {
    width: 197,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  productCategoryInputGroup: {
    width: 197,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  category: {
    color: "#121212",
    fontSize: 17,
    marginBottom: 5,
  },
  categoryDropDownBox: {
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
  },
  productRankInputGroup: {
    width: 156,
    height: 79,
    justifyContent: "space-between",
    marginTop: 0,
  },
  rankTxt: {
    color: "#121212",
    fontSize: 17,
  },
  rankBox: {
    width: 154,
    height: 52,
    backgroundColor: "rgba(255,255, 255,1)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9e9e9e",
    padding: 10,
  },
  spacer2: {
    width: "100%",
    height: 36,
  },
  displayOnlineSwitchRow: {
    width: 300,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  displayOnlineStoreTxt: {
    color: "#121212",
    fontSize: 17,
  },
  onlineStoreSwitch: {
    width: 40,
    height: 20,
    backgroundColor: "#E6E6E6",
  },
  spacer3: {
    width: "100%",
    height: 28,
  },
  productDescriptionInputGroup: {
    width: "100%",
    height: 141,
    justifyContent: "space-between",
  },
  productDescriptionTxt: {
    color: "#121212",
    fontSize: 17,
  },
  productDiscBox: {
    width: "100%",
    height: 114,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a8a8a8",
    padding: 10,
  },
  spacer4: {
    width: "100%",
    height: 31,
  },
  optionsTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 16,
  },
  spacer5: {
    width: "100%",
    height: 31,
  },
  optionsItem: {
    alignSelf: "stretch",
  },
  createOptionBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  createOptionTxt: {
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  cancelAndSaveBtns: {
    width: "95%",
    height: 47,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#eef2ff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  cancelTxt: {
    fontWeight: "700",
    color: "#121212",
    fontSize: 20,
  },
  saveBtn: {
    width: 173,
    height: 47,
    backgroundColor: "#1c294e",
    borderRadius: 20,
  },
  saveTxt: {
    fontWeight: "700",
    color: "#eef2ff",
    fontSize: 20,
    marginTop: 11,
    marginLeft: 65,
  },
});

export default AddProductModal;
