import React, { useEffect, useRef, useState } from 'react'
import { Upload } from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { employeesState, setEmployeesState, setUserStoreState, userState, userStoreState } from 'state/state';
import { updateData } from 'state/firebaseFunctions';
import { FlatList, Image, Modal, TouchableOpacity, View } from 'react-native';
import OptionView from 'components/OptionView';
import { Button } from 'react-native';
import { Link, useHistory } from 'react-router-dom';
import { auth, db, storage } from 'state/firebaseConfig';

const AddEmployee = () => {
    const [employee, setemployee] = useState(
        {
            name: "",
            id: Math.random().toString(36).substr(2, 9),
        }
    );

    const history = useHistory();
    const [error, seterror] = useState(false)
    const employees = employeesState.use()

    function handleDataUpdate() {
        // if (!newProduct.name) {
        //     seterror('Please enter a product name')
        //     return
        // }
        // if (!newProduct.category) {
        //     seterror('Please select a category')
        //     return
        // }
        // if (!newProduct.price) {
        //     seterror('Please enter a price')
        //     return
        // }

        // if (selectedFile) {
        //     storage
        //         .ref(auth.currentUser.uid + '/images/' + newProduct.id)
        //         .put(selectedFile);

        //     newProduct.hasImage = true
        // }

        // db.collection("users")
        //     .doc(userS.uid)
        //     .collection("products")
        //     .doc(newProduct.id.toString())
        //     .set(newProduct)
        // setUserStoreState({ categories: catalog.categories, products: [...catalog.products, newProduct] })
        // history.push("/authed/product/productlist-product");

        if (!employee.name) {
            seterror('Please enter a employee name')
            return
        }
        db.collection("users").doc(auth.currentUser.uid).collection("employees").doc(employee.id.toString()).set(employee)
        setEmployeesState([...employees, employee])
        history.push("/authed/report/employeesreport")
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Employee Add</h4>
                            <h6>Create new employee</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Employee Name</label>
                                        <input type="text" placeholder="Employee Name" onChange={(event) => setemployee((prevState) => ({
                                            ...prevState,
                                            name: event.target.value,
                                        }))} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-submit me-2" onClick={handleDataUpdate}>
                                        Add
                                    </button>
                                    <Link style={{ textDecoration: 'none' }} to="/authed/report/employeesreport" className="btn btn-cancel">
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
export default AddEmployee;