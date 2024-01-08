import React, { useEffect, useRef, useState } from 'react'
import { Upload } from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { setUserStoreState, userState, userStoreState } from 'state/state';
import { updateData } from 'state/firebaseFunctions';
import { FlatList, Image, Modal, TouchableOpacity, View } from 'react-native';
import OptionView from 'components/OptionView';
import { Button } from 'react-native';
import { Link, useHistory } from 'react-router-dom';
import { auth, db, storage } from 'state/firebaseConfig';

const AddProduct = () => {
    const catalog = userStoreState.use();
    const [newProduct, setnewProduct] = useState(
        {
            name: "",
            price: 0,
            category: null,
            options: [],
            description: "",
            id: Math.random().toString(36).substr(2, 9),
        }
    );
    const userS = userState.use();

    const [newProductOptions, setnewProductOptions] = useState([])

    const [indexOn, setindexOn] = useState(0);

    const [selectValues, setselectValues] = useState([]);
    const categoryDropRef = useRef()
    const history = useHistory();

    const [error, seterror] = useState(false)

    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        if (catalog.categories) {
            const local = [];
            catalog.categories.map((val, index) => local.push({ id: index, text: val, }));
            setselectValues(local);
        }
    }, []);

    useEffect(() => {
        setnewProduct(
            (prev) => {
                const clone = structuredClone(prev);
                clone.options = newProductOptions;
                return clone;
            }
        )
    }, [newProductOptions])

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

        if (selectedFile) {
            storage
                .ref(auth.currentUser.uid + '/images/' + newProduct.id)
                .put(selectedFile);

            newProduct.hasImage = true
        }

        db.collection("users")
            .doc(userS.uid)
            .collection("products")
            .doc(newProduct.id.toString())
            .set(newProduct)
        setUserStoreState({ categories: catalog.categories, products: [...catalog.products, newProduct] })
        history.push("/authed/product/productlist-product");
    }

    const changeHandler = (event) => {
        if (event.target.files[0].size < 5368709120) {
            setSelectedFile(event.target.files[0]);
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
                            <h4>Product Add</h4>
                            <h6>Create new product</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="card">
                        <div className="card-body">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label> Product Image</label>
                                    <div className="image-upload" style={selectedFile ? { height: '180px' } : { height: '100px' }}>
                                        <input type="file"
                                            name="file"
                                            id="html_btn"
                                            onChange={changeHandler}
                                        />
                                        <div className="image-uploads" >
                                            {selectedFile ? <Image style={{ height: 100, width: '100%', resizeMode: 'contain' }} source={URL.createObjectURL(selectedFile)} alt="img" /> : <img src={Upload} alt="img" />}
                                            {/* <img src={Upload} alt="img" /> */}
                                            <h4>Drag and drop a file to upload</h4>
                                            {selectedFile?.name ? <Button title="Remove" onPress={() => {
                                                setSelectedFile(null)
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
                                        <input type="text" placeholder="Product Name" onChange={(event) => setnewProduct((prevState) => ({
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
                                                placeholder: newProduct?.category ? newProduct?.category : 'Category',
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
                                        <input type="text" placeholder={parseFloat(newProduct.price)} onChange={(event) => setnewProduct((prevState) => ({
                                            ...prevState,
                                            price: event.target.value,
                                        }))} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Rank</label>
                                        <input type="text" placeholder={newProduct.rank >= 0 ? newProduct.rank : 'N/A'} onChange={(event) => setnewProduct((prevState) => ({
                                            ...prevState,
                                            rank: event.target.value,
                                        }))} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed"
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
                                                        setnewProductOptions={setnewProductOptions}
                                                        indexOn={indexOn}
                                                        setindexOn={setindexOn}
                                                    />
                                                )}
                                            />
                                            {newProduct.options.length === 0 && (
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
                                                        console.log('Hello')
                                                        // setnewProduct((prevState) => {
                                                        //     setnewProductOptions([...prevState.options, {
                                                        //         label: null,
                                                        //         optionsList: [],
                                                        //         selectedCaseKey: null,
                                                        //         selectedCaseValue: null,
                                                        //         numOfSelectable: null,
                                                        //         id: Math.random().toString(36).substr(2, 9),
                                                        //         optionType: null,
                                                        //     }])

                                                        //     return ({
                                                        //         ...prevState,
                                                        //         options: [...prevState.options, {
                                                        //             label: null,
                                                        //             optionsList: [],
                                                        //             selectedCaseKey: null,
                                                        //             selectedCaseValue: null,
                                                        //             numOfSelectable: null,
                                                        //             id: Math.random().toString(36).substr(2, 9),
                                                        //             optionType: null,
                                                        //         }],
                                                        //     })
                                                        //   });
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
                                    <button className="btn btn-submit me-2" onClick={handleDataUpdate}>
                                        Add
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
    )
}
export default AddProduct;