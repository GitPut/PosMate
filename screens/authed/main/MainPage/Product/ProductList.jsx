import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import {
  PlusIcon,
  AvocatImage,
  EditIcon,
  DeleteIcon,
  DuplicateIcon,
} from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { setSelectedProductState, userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import { auth, storage } from "state/firebaseConfig";
import { Image } from "react-native";

const ProductList = () => {
  const catalog = userStoreState.use();
  const [inputfilter, setInputfilter] = useState(false);
  const [searchFilterValue, setsearchFilterValue] = useState('')
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmText = (props) => {
    console.log("COnfirm Text: ", props);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      if (t.value) {
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
        const localCatalog = structuredClone(catalog);
        if (localCatalog.products.length > 1) {
          localCatalog.products.splice(props.id - 1, 1);
        } else {
          localCatalog.products = [];
        }

        updateData(localCatalog.categories, localCatalog.products);
      }
    });
  };

  useEffect(() => {
    if (catalog.products.length > 0) {
      catalog.products.map((product, index) => {

        setData((prev) => [
          ...prev,
          {
            id: product.id,
            index: index + 1,
            image: product.imageUrl ? product.imageUrl : AvocatImage,
            productName: product.name,
            // sku: "PT0012",
            category: product.catagory ? product.catagory : product.category,
            // brand: "N/D",
            price: product.price,
            // unit: "N/D",
            // qty: "N/D",
            createdBy: "Admin",
            hasImage: product.hasImage
          },
        ]);

      });
    }
  }, []);

  // useEffect(() => {
  //   if (data.length > 0 && hasDataBeenMapped === false) {
  //     const newMapData = structuredClone(data)
  //     data.map((item, index) => {
  //       if (item.hasImage) {
  //         (async () => {
  //           let url = await getProductUrl(item.id)
  //           console.log('url: ', url)
  //           newMapData[index].image = url
  //         }
  //         )().then(() => {
  //           setfilteredData(newMapData)
  //         }
  //         )
  //       }
  //     }
  //     )
  //     setData(newMapData)
  //     sethasDataBeenMapped(true)
  //   }
  // }, [data])


  // const getProductUrl = async (id) => await storage
  //   .ref(auth.currentUser.uid + '/images/' + id)
  //   .getDownloadURL()


  useEffect(() => {
    if (searchFilterValue.length > 0) {

      const filtered = data.filter((item) => {
        return item.productName.toLowerCase().includes(searchFilterValue.toLowerCase()) || item.category.toLowerCase().includes(searchFilterValue.toLowerCase())
      })

      setfilteredData(filtered)
    } else {
      setfilteredData([])
    }

  }, [searchFilterValue])

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => {

        return (
          <div className="productimgname">
            <Link
              style={{ textDecoration: "none" }}
              className="product-img"
              to={`/authed/product/editproduct-product/${record.index - 1}`}
            // onClick={() =>
            //   setSelectedProductState({
            //     existingProduct: catalog.products[record.index - 1],
            //     existingProductIndex: record.index - 1,
            //   })
            // }
            >
              < img alt="" src={record.image} />
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              style={{ fontSize: "15px", marginLeft: "10px" }}
              to={`/authed/product/editproduct-product/${record.index - 1}`}
            // onClick={() =>
            //   setSelectedProductState({
            //     existingProduct: catalog.products[record.index - 1],
            //     existingProductIndex: record.index - 1,
            //   })
            // }
            >
              {record.productName}
            </Link>
          </div>
        )
      },
    },
    // {
    //   title: "SKU",
    //   dataIndex: "sku",
    // },
    {
      title: "Category",
      dataIndex: "category",
    },
    // {
    //   title: "Brand",
    //   dataIndex: "brand",
    // },
    {
      title: "Price",
      dataIndex: "price",
    },
    // {
    //   title: "Unit",
    //   dataIndex: "unit",
    // },
    // {
    //   title: "Qty",
    //   dataIndex: "qty",
    // },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Action",
      render: (props) => (
        <>
          <>
            <Link
              style={{ textDecoration: "none" }}
              className="me-3"
              // to="/authed/product/product-details"
              onClick={() => {
                let copy = structuredClone(catalog.products[props.id - 1]);
                copy.name = copy.name + " Copy";
                copy.id = Math.random().toString(36).substr(2, 9);
                updateData(
                  [...catalog.categories],
                  [...catalog.products, copy]
                );
              }}
            >
              <img src={DuplicateIcon} alt="img" />
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="me-3"
              to={`/authed/product/editproduct-product/${props.id - 1}`}
            // onClick={() =>
            //   setSelectedProductState({
            //     existingProduct: catalog.products[props.id - 1],
            //     existingProductIndex: props.id - 1,
            //   })
            // }
            >
              <img src={EditIcon} alt="img" />
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="confirm-text"
              to="#"
              onClick={() => confirmText(props)}
            >
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            <div className="page-btn">
              <Link
                style={{ textDecoration: "none" }}
                to="/authed/product/addproduct-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Product
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} removePrintAndFilter={true} searchFilterValue={searchFilterValue} setsearchFilterValue={setsearchFilterValue} />
              {/* /Filter */}

              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={filteredData.length > 0 ? filteredData : data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default ProductList;
