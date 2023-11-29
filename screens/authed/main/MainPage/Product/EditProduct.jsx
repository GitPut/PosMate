import React, { useEffect, useRef, useState } from "react";
import { Macbook, Upload } from "../../EntryFile/imagePath";
import { Link, useHistory } from "react-router-dom"
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { selectedProductState, userStoreState } from "state/state";
import { FlatList, Image, Modal, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Button } from "react-native";
import OptionView from "components/OptionView";
import { updateData } from "state/firebaseFunctions";
import { useParams } from "react-router-dom";
import { auth, storage } from "state/firebaseConfig";

const EditProduct = (props) => {
  const catalog = userStoreState.use();
  const history = useHistory();
  const { productId } = useParams();

  const product = {
    existingProduct: catalog.products[productId],
    existingProductIndex: productId,
  }

  const { existingProduct, existingProductIndex } = product

  const [newProduct, setnewProduct] = useState(
    existingProduct
  );
  const [newProductOptions, setnewProductOptions] = useState(existingProduct ? existingProduct.options : [])
  // const newProductOptions = useRef(
  //   existingProduct ? existingProduct.options : []
  // );
  const [indexOn, setindexOn] = useState();
  const [selectValues, setselectValues] = useState([]);

  const [error, seterror] = useState(false)

  const [selectedFile, setSelectedFile] = useState()

  const [currentImgUrl, setcurrentImgUrl] = useState()

  // const resetProduct = () => {
  //   setnewProduct(
  //     existingProduct
  //   );
  //   newProductOptions.current = existingProduct ? existingProduct.options : []
  //   setindexOn(0);
  //   setselectValues([]);
  //   console.log('Canceled Edit Product')
  // }

  useEffect(() => {
    setnewProduct(
      (prev) => {
        const clone = structuredClone(prev);
        clone.options = newProductOptions;
        return clone;
      }
    )
  }, [newProductOptions])

  // const getProductUrl = async (id) => await storage
  //   .ref(auth.currentUser.uid + '/images/' + id)
  //   .getDownloadURL()


  useEffect(() => {
    if (catalog.categories) {
      const local = [];
      catalog.categories.map((val, index) => local.push({ id: index, text: val, }));
      setselectValues(local);
    }

    if (existingProduct?.hasImage) {
      // (async () => {
      //   const url = await getProductUrl(existingProduct.id)
      //   setcurrentImgUrl(url)
      // }
      // )()
      setcurrentImgUrl(existingProduct.imageUrl)
    }
  }, []);

  function handleDataUpdate() {
    if (!newProduct.name) {
      seterror('Please enter a product name')
      return
    }
    if (!newProduct.category) {
      seterror('Please select a category')
      return
    }
    if (!newProduct.price) {
      seterror('Please enter a price')
      return
    }

    let copy = structuredClone(catalog.products);

    if (existingProduct.id) {
      const newProductUseRef = {
        ...newProduct,
        options: newProductOptions,
      };
      const findIndex = copy.findIndex((e) => e.id === existingProduct.id);

      // Upload Image

      if (selectedFile) {
        storage
          .ref(auth.currentUser.uid + '/images/' + existingProduct.id)
          .put(selectedFile);

        newProductUseRef.hasImage = true
      }

      if (newProductUseRef.hasImage && !selectedFile && !currentImgUrl) {
        storage
          .ref(auth.currentUser.uid + '/images/' + existingProduct.id).delete()
        newProductUseRef.hasImage = false
      }

      copy[findIndex] = newProductUseRef;

    } else {
      const newProductUseRef = {
        ...newProduct,
        options: newProductOptions,
        id: Math.random().toString(36).substr(2, 9),
      };
      copy[existingProductIndex] = newProductUseRef;
    }
    updateData([...catalog.categories], copy);
    history.push("/authed/product/productlist-product");
  }

  const changeHandler = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0])
    } else {
      alert("Sorry 5gb files are the max!");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Edit</h4>
              <h6>Update your product</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="col-lg-12">
                <div className="form-group">
                  <label> Product Image</label>
                  <div className="image-upload" style={selectedFile || currentImgUrl ? { height: '180px' } : { height: '100px' }}>
                    <input type="file"
                      name="file"
                      id="html_btn"
                      accept="image/*"
                      onChange={changeHandler}
                    />
                    <div className="image-uploads" >
                      {selectedFile ? <Image style={{ height: 100, width: '100%', resizeMode: 'contain' }} source={URL.createObjectURL(selectedFile)} alt="img" /> : currentImgUrl ? <Image style={{ height: 100, width: '100%', resizeMode: 'contain' }} source={currentImgUrl} alt="img" /> : <img src={Upload} alt="img" />}
                      {/* <img src={Upload} alt="img" /> */}
                      <h4>Drag and drop a file to upload</h4>
                      {selectedFile?.name || currentImgUrl ? <Button title="Remove" onPress={() => {
                        setSelectedFile(null)
                        setcurrentImgUrl(null)
                      }
                      } /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" defaultValue={newProduct?.name} onChange={(event) => setnewProduct((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))} />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    <Select2
                      className="select"
                      data={selectValues}
                      options={{
                        placeholder: newProduct?.catagory ? newProduct?.catagory : newProduct?.category,
                      }}
                      onSelect={(val) => {
                        console.log('val', val.params.data.text)
                        setnewProduct((prevState) => ({
                          ...prevState,
                          category: val.params.data.text,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" defaultValue={parseFloat(newProduct?.price)} onChange={(event) => setnewProduct((prevState) => ({
                      ...prevState,
                      price: event.target.value,
                    }))} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={
                        newProduct?.description
                      }
                      onChange={(event) => setnewProduct((prevState) => ({
                        ...prevState,
                        description: event.target.value,
                      }))}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Options</label>
                    <View>
                      <FlatList
                        // onLayout={() =>
                        //   window.scrollTo({
                        //     top: currentY,
                        //     behavior: "instant",
                        //   })
                        // }
                        getItemLayout={(data, index) => ({
                          length: index === indexOn ? 400 * data.optionsList?.length : 100,
                          offset: 400 * index,
                          index,
                        })}
                        data={newProduct?.options}
                        keyExtractor={(item) => item.id?.toString()}
                        renderItem={({ item, index }) => (
                          <OptionView
                            item={item}
                            index={index}
                            newProduct={newProduct}
                            setnewProduct={setnewProduct}
                            newProductOptions={newProductOptions}
                            setnewProductOptions={setnewProductOptions}
                            indexOn={indexOn}
                            setindexOn={setindexOn}
                          />
                        )}
                      />
                      {newProduct?.options.length === 0 && (
                        <Button
                          title="Add Option"
                          onPress={() => {
                            setnewProductOptions([
                              {
                                label: null,
                                optionsList: [],
                                selectedCaseKey: null,
                                selectedCaseValue: null,
                                numOfSelectable: null,
                                id: Math.random().toString(36).substr(2, 9),
                                optionType: null,
                              },
                            ],
                            );
                            // newProductOptions.current.push({
                            //   label: null,
                            //   optionsList: [],
                            //   selectedCaseKey: null,
                            //   selectedCaseValue: null,
                            //   numOfSelectable: null,
                            //   id: Math.random().toString(36).substr(2, 9),
                            //   optionType: null,
                            // });
                            // setnewProduct((prevState) => ({
                            //   ...prevState,
                            //   options: newProductOptions,
                            // }));
                            setindexOn(0);
                          }}
                          style={{ marginBottom: 25, backgroundColor: "#4050B5" }}
                          disabled={
                            newProduct?.options.length > 0 &&
                            newProduct?.options[newProduct?.options.length - 1].label === null
                          }
                        />
                      )}
                    </View>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={handleDataUpdate}
                    className="btn btn-submit me-2"
                  >
                    Update
                  </button>
                  <Link style={{ textDecoration: 'none' }} to="/authed/product/productlist-product" className="btn btn-cancel">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Modal visible={error} transparent={true}>
            <TouchableOpacity
              onPress={() => seterror(false)}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: "20%",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <div
                data-wf-user-form-error="true"
                className=" error-message "
              >
                <div className="user-form-error-msg">
                  {error}
                </div>
              </div>
            </TouchableOpacity>
          </Modal>
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
