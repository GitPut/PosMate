import React, { useEffect, useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Tabletop from "../../EntryFile/tabletop";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import { userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";

const CategoryList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const catalog = userStoreState.use();

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const [data, setData] = useState([
  ]);

  const confirmText = (props) => {
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
        if (localCatalog.categories.length > 1) {
          localCatalog.categories.splice(props.id - 1, 1);
        } else {
          localCatalog.categories = [];
        }

        updateData(localCatalog.categories, localCatalog.products);
      }
    });
  };

  // {
  //   id: 1,
  //     image: MacbookIcon,
  //       categoryName: "Macbook pro",
  //         categoryCode: "PT001",
  //           description: "Computer Description",
  //             createdBy: "Admin",
  //   },

  useEffect(() => {
    if (catalog.categories.length > 0) {
      catalog.categories.map((category, index) => {
        setData((prev) => [
          ...prev,
          {
            id: index + 1,
            image: AvocatImage,
            categoryName: category,
            numOfProducts: catalog.products.filter(
              (e) =>
                e.catagory === category ||
                e.category === category
            ).length,
            // categoryCode: `C00${index + 1}`,
            createdBy: "Admin",
          },
        ]);
      });
    }
  }, []);

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      render: (text, record) => (
        <div className="productimgname">
          <img alt="" src={record.image} />
          <p style={{ textDecoration: 'none' }} style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.categoryName}
          </p>
        </div>
      ),
    },
    // {
    //   title: "Category Code",
    //   dataIndex: "categoryCode",
    // },
    {
      title: "Number Of Products",
      dataIndex: "numOfProducts",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Action",
      render: () => (
        <>
          <>
            {/* <Link style={{ textDecoration: 'none' }} className="me-3" to="/authed/product/editcategory-product">
              <img src={EditIcon} alt="img" />
            </Link> */}
            <Link style={{ textDecoration: 'none' }} className="confirm-text" to="#" onClick={confirmText}>
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
              <h4>Product Category List </h4>
              <h6>View/Search product Category</h6>
            </div>
            <div className="page-btn">
              <Link style={{ textDecoration: 'none' }}
                to="/authed/product/addcategory-product"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Category
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
    </>
  );
};
export default CategoryList;
