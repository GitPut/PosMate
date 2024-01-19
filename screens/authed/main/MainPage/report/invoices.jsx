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
import { myDeviceDetailsState, storeDetailState, woocommerceState } from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");
import ReceiptPrint from "components/ReceiptPrint";
import { Excel as ExcelDownload } from "antd-table-saveas-excel";

const Sales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const storeDetails = storeDetailState.use();
  const [baseSelectedRows, setbaseSelectedRows] = useState(null)
  const [updateBaseSelectedRows, setupdateBaseSelectedRows] = useState(false)
  const [filteredTranLlist, setfilteredTransList] = useState([])
  const [search, setsearch] = useState(null)

  const [transList, settransList] = useState([]);
  const [transListTableOrg, settransListTableOrg] = useState([]);
  const wooCredentials = woocommerceState.use()

  const myDeviceDetails = myDeviceDetailsState.use();

  const togglefilter = (value) => {
    setInputfilter(value);
  };



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
            let orderType = "";
            if (doc.data().method === "deliveryOrder") {
              orderType = "Delivery";
            }
            if (doc.data().method === "pickupOrder") {
              orderType = "Pickup";
            }
            if (doc.data().method === "inStoreOrder") {
              orderType = "In Store";
            }

            settransList((prevState) => [...prevState, doc.data()]);
            settransListTableOrg((prevState) => [...prevState,
            {
              id: doc.data().transNum.toUpperCase(),
              number: doc.data().transNum,
              name: doc.data().customer?.name ? doc.data().customer?.name : "N/A",
              date: getDate(doc.data()),
              originalData: doc.data(),
              amount: doc.data().total,
              system: 'POS',
              type: orderType,
            }
            ]);
          });
          //sort by date
          settransListTableOrg((prevState) => [...prevState.sort((a, b) => new Date(b.originalData.date_created ? b.originalData.date_created : b.originalData.date.seconds * 1000) - new Date(a.originalData.date_created ? a.originalData.date_created : a.originalData.date.seconds * 1000))])

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
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      // sorter: (a, b) => a.number.length - b.number.length,
      // //make text uppercase
      // render: (text, record) => (<>{text?.toUpperCase()}</>)
    },
    {
      title: "Customer name",
      dataIndex: "name",
      key: "name",
      // sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // sorter: (a, b) => a.Brand.length - b.Brand.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      // sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: "System Type",
      dataIndex: "system",
      key: "system",
      // sorter: (a, b) => a.System.length - b.System.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      // render: (text, record) => (
      //   <>
      //     {text === "Delivery" && (
      //       <span className="badges bg-lightgreen">{text}</span>
      //     )}
      //     {text === "Pickup" && (
      //       <span className="badges bg-lightgrey">{text}</span>
      //     )}
      //   </>
      // ),
      // sorter: (a, b) => a.Name.length - b.Name.length,
    },
  ];

  useEffect(() => {
    console.log('Selected rows from base: ', baseSelectedRows)
    if (updateBaseSelectedRows === true) {
      if (baseSelectedRows.length >= 1) {
        let data = [];
        baseSelectedRows.forEach((idx) => {
          //find index of item in transList that matches id of selected row
          const orderIndex = transListTableOrg.findIndex((item) => item.id === idx)

          const element =
            transList[
            orderIndex
            ];
          console.log('THIS IS ELEMENT: ', element, ' This is Index: ', orderIndex)
          const formatedData = ReceiptPrint(element, storeDetails);
          data = data.concat(formatedData.data);
        });
        const qz = require("qz-tray");
        if (
          myDeviceDetails.sendPrintToUserID &&
          myDeviceDetails.useDifferentDeviceToPrint
        ) {
          console.log("Sending print to different user");
          db.collection("users")
            .doc(auth.currentUser?.uid)
            .collection("devices")
            .doc(myDeviceDetails.sendPrintToUserID.value)
            .collection("printRequests")
            .add({
              printData: data,
            });
        } else {
          qz.websocket
            .connect()
            .then(function () {
              const config = qz.configs.create(myDeviceDetails.printToPrinter);
              return qz.print(config, data);
            })
            .then(qz.websocket.disconnect)
            .catch(function (err) {
              console.error(err);
            });
        }
      } else {
        alert(
          "Higlight one or multiple receipt then click to print them"
        );
      }
      setupdateBaseSelectedRows(false)
      setbaseSelectedRows(null)
    }
  }, [baseSelectedRows])

  useEffect(() => {
    if (search) {
      const filtered = transListTableOrg.filter((item) => {
        return item.id.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())
      })
      setfilteredTransList(filtered)
    } else {
      setfilteredTransList([])
    }
  }
    , [search])

  const SearchDate = () => {
    console.log('Searching date')
    if (search) {
      const filtered = filteredTranLlist.filter((item) => {
        const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        let itemDateFormatted;

        if (item.originalData.date_created) {
          const dateString = item.originalData.date_created;

          const newDate = new Date(dateString + "Z");

          const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const result = tz(newDate)
            .tz(targetTimezone, true)

          itemDateFormatted = result;
        } else if (item.originalData.date) {
          const newDate = new Date(item.originalData.date.seconds * 1000);
          const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const result = tz(newDate)
            .tz(targetTimezone, true)

          itemDateFormatted = result;
        }

        const startFormatted = tz(startDate)
          .tz(targetTimezone, true)

        const endFormatted = tz(startDate1)
          .tz(targetTimezone, true)

        startFormatted.hour(0)
        startFormatted.minute(0)

        endFormatted.hour(23)
        endFormatted.minute(59)

        let bool1 = itemDateFormatted.isBetween(startFormatted, endFormatted)

        console.log('Date: ', itemDateFormatted, ' Start Date: ', startFormatted, ' End Date: ', endFormatted, ' Bool: ', bool1)
        return bool1
      })
      setfilteredTransList(filtered)
    } else {
      const filtered = transListTableOrg.filter((item) => {
        const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        let itemDateFormatted;

        if (item.originalData.date_created) {
          const dateString = item.originalData.date_created;

          const newDate = new Date(dateString + "Z");

          const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const result = tz(newDate)
            .tz(targetTimezone, true)

          itemDateFormatted = result;
        } else if (item.originalData.date) {
          const newDate = new Date(item.originalData.date.seconds * 1000);
          const targetTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const result = tz(newDate)
            .tz(targetTimezone, true)

          itemDateFormatted = result;
        }

        const startFormatted = tz(startDate)
          .tz(targetTimezone, true)

        const endFormatted = tz(startDate1)
          .tz(targetTimezone, true)

        startFormatted.hour(0)
        startFormatted.minute(0)

        endFormatted.hour(23)
        endFormatted.minute(59)

        let bool1 = itemDateFormatted.isBetween(startFormatted, endFormatted)

        console.log('Date: ', itemDateFormatted, ' Start Date: ', startFormatted, ' End Date: ', endFormatted, ' Bool: ', bool1)
        return bool1
      })
      setfilteredTransList(filtered)
    }
  }

  //Printing function
  const DownloadExcel = () => {
    const excelDownload = new ExcelDownload();
    excelDownload
      .addSheet("history")
      .addColumns(columns)
      .addDataSource(filteredTranLlist.length > 0 ? filteredTranLlist : transListTableOrg, {
        str2Percent: true
      })
      .saveAs("StoreReceipts.xlsx");
  };


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
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  {/* <a className="btn btn-searchset">
                    <img src={Search} alt="img" />
                  </a> */}
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                      onClick={DownloadExcel}
                    >
                      <img src={Excel} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                      onClick={() => {
                        setupdateBaseSelectedRows(!updateBaseSelectedRows)
                      }}
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
                      <a className="btn btn-filters ms-auto" onClick={SearchDate}>
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <Table columns={columns} dataSource={filteredTranLlist.length > 0 ? filteredTranLlist : transListTableOrg} updateBaseSelectedRows={updateBaseSelectedRows} setbaseSelectedRows={setbaseSelectedRows} />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Sales;
