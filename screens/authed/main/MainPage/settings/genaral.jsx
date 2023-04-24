import React from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Upload } from "../../EntryFile/imagePath";

const GenaralSettings = () => {
  const options = [
    { id: 1, text: "Choose Time Zone", text: "Choose Time Zone" },
    { id: 2, text: "USD Time Zone", text: "USD Time Zone" },
  ];
  const options1 = [
    { id: 1, text: "INR", text: "INR" },
    { id: 2, text: "USA", text: "USA" },
  ];
  const options2 = [
    { id: 1, text: "DD/MM/YYYY", text: "DD/MM/YYYY" },
    { id: 2, text: "MM/DD/YYYY", text: "MM/DD/YYYY" },
  ];
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>General Setting</h4>
            <h6>Manage General Setting</h6>
          </div>
        </div>
        {/* /add */}
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Name <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Name" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Address <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Address" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Website Url <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Website Url" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Phone # <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Phone #" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Delivery Price <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Delivery Price" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Store Printer Name <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Store Printer Name" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Dashboard Password <span className="manitory">*</span>
                  </label>
                  <input type="text" placeholder="Enter Dashboard Password" />
                </div>
              </div>
              {/* <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>Time Zone </label>
                  <Select2
                    className="select"
                    data={options}
                    options={{
                      placeholder: "Choose Time Zone",
                    }}
                  />                  
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Currency <span className="manitory">*</span>
                  </label>
                  <Select2
                    className="select"
                    data={options1}
                    options={{
                      placeholder: "Choose Currency",
                    }}
                  />                   
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Date Format<span className="manitory">*</span>
                  </label>
                  <Select2
                    className="select"
                    data={options2}
                    options={{
                      placeholder: "Choose Date Format",
                    }}
                  />                  
                </div>
              </div> */}
              <div className="row">
                <div className="col-lg-12">
                  <Link style={{ textDecoration: 'none' }} to="#" className="btn btn-submit me-2">
                    Submit
                  </Link>
                  <Link style={{ textDecoration: 'none' }} to="#" className="btn btn-cancel">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /add */}
      </div>
    </div >
  );
};

export default GenaralSettings;
