import React, { useEffect, useRef, useState } from "react";
import { Macbook, Upload } from "../../EntryFile/imagePath";
import { Link, useHistory } from "react-router-dom"
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { selectedProductState, userStoreState } from "state/state";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import { Button } from "react-native";
import OptionView from "components/OptionView";
import { updateData } from "state/firebaseFunctions";

const EditProduct = (props) => {
  const product = selectedProductState.use()

  const { existingProduct, existingProductIndex } = product

  const catalog = userStoreState.use();
  const [newProduct, setnewProduct] = useState(
    existingProduct
  );
  const newProductOptions = useRef(
    existingProduct ? existingProduct.options : []
  );
  const [indexOn, setindexOn] = useState(0);
  const { width, height } = useWindowDimensions();
  const [selectValues, setselectValues] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (catalog.categories) {
      const local = [];
      catalog.categories.map((val, index) => local.push({ id: index, text: val, }));
      setselectValues(local);
    }
  }, []);

  function handleDataUpdate() {
    let copy = structuredClone(catalog.products);

    if (existingProduct.id) {
      const newProductUseRef = {
        ...newProduct,
        options: newProductOptions.current,
      };
      const findIndex = copy.findIndex((e) => e.id === existingProduct.id);
      copy[findIndex] = newProductUseRef;
    } else {
      const newProductUseRef = {
        ...newProduct,
        options: newProductOptions.current,
        id: Math.random().toString(36).substr(2, 9),
      };
      copy[existingProductIndex] = newProductUseRef;
    }
    updateData([...catalog.categories], copy);
    history.push("/authed/product/productlist-product");
  }

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
                  <div className="image-upload">
                    <input type="file" />
                    <div className="image-uploads">
                      <img src={Upload} alt="img" />
                      <h4>Drag and drop a file to upload</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" defaultValue={newProduct.name} onChange={(event) => setnewProduct((prevState) => ({
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
                        placeholder: newProduct.catagory ? newProduct.catagory : newProduct.category,
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
                    <input type="text" defaultValue={parseFloat(newProduct.price)} onChange={(event) => setnewProduct((prevState) => ({
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
                        newProduct.description
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
                        data={newProduct.options}
                        keyExtractor={(item) => item.id?.toString()}
                        renderItem={({ item, index }) => (
                          <OptionView
                            item={item}
                            index={index}
                            newProduct={newProduct}
                            setnewProduct={setnewProduct}
                            newProductOptions={newProductOptions}
                            indexOn={indexOn}
                            setindexOn={setindexOn}
                          />
                        )}
                      />
                      {newProduct.options.length === 0 && (
                        <Button
                          title="Add Option"
                          onPress={() => {
                            newProductOptions.current.push({
                              label: null,
                              optionsList: [],
                              selectedCaseKey: null,
                              selectedCaseValue: null,
                              numOfSelectable: null,
                              id: Math.random().toString(36).substr(2, 9),
                              optionType: null,
                            });
                            setnewProduct((prevState) => ({
                              ...prevState,
                              options: newProductOptions.current,
                            }));
                            setindexOn(newProductOptions.current.length - 1);
                          }}
                          style={{ marginBottom: 25, backgroundColor: "#4050B5" }}
                          disabled={
                            newProduct.options.length > 0 &&
                            newProduct.options[newProduct.options.length - 1].label === null
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
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default EditProduct;
