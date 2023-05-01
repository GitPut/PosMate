import React, { useState } from 'react'
import { Upload } from '../../EntryFile/imagePath';
import { userStoreState } from 'state/state';
import { auth, db } from 'state/firebaseConfig';
import { Link, useHistory } from 'react-router-dom';
import firebase from "firebase/app";

const AddCategory = () => {
    const catalog = userStoreState.use();

    const [name, setname] = useState("");
    const history = useHistory();

    function AddToDb() {
        db.collection("users")
            .doc(auth.currentUser.uid)
            .update({
                categories: firebase.firestore.FieldValue.arrayUnion(name),
            })
        history.push("/authed/product/categorylist-product");
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Product Add Category</h4>
                            <h6>Create new product Category</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Category Name</label>
                                        <input type="text" onChange={(event) => setname(event.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Category Code</label>
                                        <input type="text" value={`${catalog.categories.length}`} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label> Category Image</label>
                                        <div className="image-upload">
                                            <input type="file" />
                                            <div className="image-uploads">
                                                <img src={Upload} alt="img" />
                                                <h4>Drag and drop a file to upload</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-submit me-2" onClick={AddToDb}>
                                        Submit
                                    </button>
                                    <Link style={{ textDecoration: 'none' }} to="/authed/product/categorylist-product" className="btn btn-cancel">
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
    )
}

export default AddCategory;