import React, { useEffect, useState } from "react";
import {
  Dash2,
  EarpodIcon,
  IphoneIcon,
  SamsungIcon,
  MacbookIcon,
} from "../EntryFile/imagePath";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import { auth, db } from "state/firebaseConfig";
import { View } from "react-native";

const Dashboard = (props) => {
  const [inStoreOrders, setinStoreOrders] = useState({ numberOfOrders: 0, total: 0 });
  const [deliveryOrders, setdeliveryOrders] = useState({ numberOfOrders: 0, total: 0 });
  const [pickupOrders, setpickupOrders] = useState({ numberOfOrders: 0, total: 0 });

  useEffect(() => {
    try {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .get()
        .then((querySnapshot) => {

          let inStoreOrders = { numberOfOrders: 0, total: 0 };
          let deliveryOrders = { numberOfOrders: 0, total: 0 };
          let pickupOrders = { numberOfOrders: 0, total: 0 };

          querySnapshot.forEach((doc) => {

            if (doc.data().customer?.name) {
              if (doc.data().method === "deliveryOrder") {
                deliveryOrders.numberOfOrders += 1;
                deliveryOrders.total += parseFloat(doc.data().total);
                console.log('Delivery order: ', doc.data().total)
              } else {
                pickupOrders.numberOfOrders += 1;
                pickupOrders.total += parseFloat(doc.data().total);
                console.log('Pickup order: ', doc.data().total)
              }
            } else {
              inStoreOrders.numberOfOrders += 1;
              inStoreOrders.total += parseFloat(doc.data().total);
              console.log('Instore order: ', doc.data().total)
            }

          });

          setinStoreOrders(inStoreOrders);
          setdeliveryOrders(deliveryOrders);
          setpickupOrders(pickupOrders);

        });
    } catch {
      console.log("Error occured retrieving tranasctions");
    }
  }, []);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <div className="page-wrapper">
        <Helmet>
          <title>Divine Pos - Manager</title>
          <meta name="description" content="Dashboard page" />
        </Helmet>
        <div className="content">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget  dash1">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash2} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    $
                    <span className="counters">
                      <CountUp end={inStoreOrders.total + pickupOrders.total + deliveryOrders.total} />
                    </span>
                  </h5>
                  <h6>Total Revenue</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash1">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash2} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    $
                    <span className="counters">
                      <CountUp end={pickupOrders.total} />
                    </span>
                  </h5>
                  <h6>Pickup Order Revenue</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash1">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash2} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    $
                    <span className="counters">
                      <CountUp end={deliveryOrders.total} />
                    </span>
                  </h5>
                  <h6>Delivery Order Revenue</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash1">
                <div className="dash-widgetimg">
                  <span>
                    <img src={Dash2} alt="img" />
                  </span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    $
                    <span className="counters">
                      <CountUp end={inStoreOrders.total} />
                    </span>
                  </h5>
                  <h6>In Store Order Revenue</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count">
                <div className="dash-counts">
                  <h4>{pickupOrders.numberOfOrders + deliveryOrders.numberOfOrders + inStoreOrders.numberOfOrders}</h4>
                  <h5>Total Orders</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="book-open" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das1">
                <div className="dash-counts">
                  <h4>{pickupOrders.numberOfOrders}</h4>
                  <h5>Pickup Orders</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="user" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das2">
                <div className="dash-counts">
                  <h4>{deliveryOrders.numberOfOrders}</h4>
                  <h5>Delivery Orders</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="truck" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12 d-flex">
              <div className="dash-count das3">
                <div className="dash-counts">
                  <h4>{inStoreOrders.numberOfOrders}</h4>
                  <h5>In Store Orders</h5>
                </div>
                <div className="dash-imgs">
                  <FeatherIcon icon="shopping-bag" />
                </div>
              </div>
            </div>
          </div>
          {/* Button trigger modal */}
          {/* <div className="row">
            <div className="col-lg-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Purchase &amp; Sales</h5>
                  <div className="graph-sets">
                    <div className="dropdown">
                      <button
                        className="btn btn-white btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        2022
                        <img src={Dropdown} alt="img" className="ms-2" />
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <Link style={{ textDecoration: 'none' }} to="#" className="dropdown-item">
                            2022
                          </Link>
                        </li>
                        <li>
                          <Link style={{ textDecoration: 'none' }} to="#" className="dropdown-item">
                            2021
                          </Link>
                        </li>
                        <li>
                          <Link style={{ textDecoration: 'none' }} to="#" className="dropdown-item">
                            2020
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Recently Added Products</h4>
                  <div className="dropdown dropdown-action profile-action">
                    <Link style={{ textDecoration: 'none' }}
                      to="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="dropset"
                    >
                      <i className="fa fa-ellipsis-v" />
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <Link style={{ textDecoration: 'none' }}
                          to="/authed/product/productlist-product"
                          className="dropdown-item"
                        >
                          Product List
                        </Link>
                      </li>
                      <li>
                        <Link style={{ textDecoration: 'none' }}
                          to="/authed/product/addproduct-product"
                          className="dropdown-item"
                        >
                          Product Add
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive dataview">
                    <Table
                      className="table datatable"
                      key={props}
                      columns={recentDataColumns}
                      dataSource={recentData}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </View>
  );
};

export default Dashboard;
