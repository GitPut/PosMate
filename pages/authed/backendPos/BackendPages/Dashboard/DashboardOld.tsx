import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import CountUp from "react-countup";
import { auth, db } from "state/firebaseConfig";
import { View } from "react-native";

const Dashboard = (props) => {
  const [inStoreOrders, setinStoreOrders] = useState({
    numberOfOrders: 0,
    total: 0,
  });
  const [deliveryOrders, setdeliveryOrders] = useState({
    numberOfOrders: 0,
    total: 0,
  });
  const [pickupOrders, setpickupOrders] = useState({
    numberOfOrders: 0,
    total: 0,
  });

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
                console.log("Delivery order: ", doc.data().total);
              } else {
                pickupOrders.numberOfOrders += 1;
                pickupOrders.total += parseFloat(doc.data().total);
                console.log("Pickup order: ", doc.data().total);
              }
            } else {
              inStoreOrders.numberOfOrders += 1;
              inStoreOrders.total += parseFloat(doc.data().total);
              console.log("Instore order: ", doc.data().total);
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
    <View style={{ height: "100%", width: "100%" }}>
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
                  <span></span>
                </div>
                <div className="dash-widgetcontent">
                  <h5>
                    $
                    <span className="counters">
                      <CountUp
                        end={
                          inStoreOrders.total +
                          pickupOrders.total +
                          deliveryOrders.total
                        }
                      />
                    </span>
                  </h5>
                  <h6>Total Revenue</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="dash-widget dash1">
                <div className="dash-widgetimg">
                  <span></span>
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
                  <span></span>
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
                  <span></span>
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
                  <h4>
                    {pickupOrders.numberOfOrders +
                      deliveryOrders.numberOfOrders +
                      inStoreOrders.numberOfOrders}
                  </h4>
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
        </div>
      </div>
    </View>
  );
};

export default Dashboard;
