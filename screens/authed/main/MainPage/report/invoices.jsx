import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  Product1,
  Product7,
  Product8,
  Product9,
} from "../../EntryFile/imagePath";
import { storeDetailState, woocommerceState } from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");

const Sales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const storeDetails = storeDetailState.use();

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const [transList, settransList] = useState([]);
  const wooCredentials = woocommerceState.use()

  const getDate = (receipt) => {
    if (receipt.date_created) {
      const dateString = receipt.date_created;

      const newDate = new Date(dateString + "Z");

      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    } else if (receipt.date) {
      const newDate = new Date(receipt.date.seconds * 1000);
      const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = tz(newDate)
        .tz(targetTimezone, true)
        .format("YYYY-MM-DD HH:mm a");

      return result;
    }
  };

  useEffect(() => {
    try {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("transList")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            settransList((prevState) => [...prevState,
            {
              number: doc.data().transNum,
              name: doc.data().customer?.name ? doc.data().customer?.name : "N/A",
              date: getDate(doc.data()),
              Amount: doc.data().total,
              System: 'POS',
              Status: doc.data().method === "deliveryOrder" ? "Delivery" : "Pickup",
            }
            ]);
          });
        });
    } catch {
      console.log("Error occured retrieving tranasctions");
    }

    if (wooCredentials.useWoocommerce === true) {
      try {
        const WooCommerceAPI = require("woocommerce-api");

        const WooCommerce = new WooCommerceAPI({
          url: wooCredentials.apiUrl,
          consumerKey: wooCredentials.ck,
          consumerSecret: wooCredentials.cs,
          wpAPI: true,
          version: "wc/v1",
        });

        let page = 1;
        let orders = [];

        const getOrders = async () => {
          const response = await WooCommerce.getAsync(
            `orders?page=${page}&per_page=100`
          );
          const data = JSON.parse(response.body);
          orders = [...orders, ...data];
          if (data.length === 100) {
            page++;
            getOrders();
          } else {
            // console.log(orders);
          }
        };

        getOrders()
          .then(() => settransList((prevState) => [...prevState, ...orders]))
          .catch((e) => console.log("error has occured"));
      } catch {
        console.log("Something occured with woo");
      }
    }
  }, []);



  const columns = [
    {
      title: "Invoice number",
      dataIndex: "number",
      sorter: (a, b) => a.number.length - b.number.length,
      //make text uppercase
      render: (text, record) => (<>{text?.toUpperCase()}</>)
    },
    {
      title: "Customer name",
      dataIndex: "name",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Due date",
      dataIndex: "date",
      sorter: (a, b) => a.Brand.length - b.Brand.length,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: "System Type",
      dataIndex: "System",
      sorter: (a, b) => a.System.length - b.System.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text, record) => (
        <>
          {text === "Delivery" && (
            <span className="badges bg-lightgreen">{text}</span>
          )}
          {text === "Pickup" && (
            <span className="badges bg-lightgrey">{text}</span>
          )}
        </>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Invoices Report</h4>
            <h6>Manage your Invoices Report</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a
                    className={` btn ${inputfilter ? "btn-filter setclose" : "btn-filter"
                      } `}
                    id="filter_search"
                    onClick={() => togglefilter(!inputfilter)}
                  >
                    <img src={Filter} alt="img" />
                    <span>
                      <img src={ClosesIcon} alt="img" />
                    </span>
                  </a>
                </div>
                <div className="search-input">
                  <input
                    className="form-control form-control-sm search-icon"
                    type="text"
                    placeholder="Search..."
                  />
                  <a className="btn btn-searchset">
                    <img src={Search} alt="img" />
                  </a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                    >
                      <img src={Pdf} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                    >
                      <img src={Excel} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                    >
                      <img src={Printer} alt="img" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
              id="filter_inputs"
              style={{ display: inputfilter ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto">
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <Table columns={columns} dataSource={transList} />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Sales;
