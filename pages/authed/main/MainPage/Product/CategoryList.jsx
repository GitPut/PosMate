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
import { onlineStoreState, userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import FeatherIcon from "feather-icons-react";
import { auth, db } from "state/firebaseConfig";

const CategoryList = () => {
  const [inputfilter, setInputfilter] = useState(false);
  const catalog = userStoreState.use();
  const onlineStoreDetails = onlineStoreState.use()

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
          // localCatalog.categories.splice(props.id - 2, 1);
          console.log('Delete category', props.categoryName, ' Props: ', props)
          localCatalog.categories = catalog.categories.filter(
            (e) => e !== props.categoryName
          );
        } else {
          localCatalog.categories = [];
        }

        db.collection("users")
          .doc(auth.currentUser?.uid)
          .update({
            categories: localCatalog.categories,
          })
          .catch((e) => console.log("ERROR HAS OCCURE FB: ", e));
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(auth.currentUser?.uid)
            .update({
              categories: localCatalog.categories,
            })
            .catch((e) => console.log("ERROR HAS OCCURE FB: ", e));
        }
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
      render: (props) => (
        <>
          <>
            {/* <Link style={{ textDecoration: 'none' }} className="me-3" to="/authed/product/editcategory-product">
              <img src={EditIcon} alt="img" />
            </Link> */}
            <Link style={{ textDecoration: 'none' }} className="confirm-text" to="#" onClick={() => moveCategory(props, 'up')}>
              <FeatherIcon icon="arrow-up" />
            </Link>
            <Link style={{ textDecoration: 'none' }} className="confirm-text" to="#" onClick={() => moveCategory(props, 'down')}>
              <FeatherIcon icon="arrow-down" />
            </Link>
            <Link style={{ textDecoration: 'none' }} className="confirm-text" to="#" onClick={() => confirmText(props)}>
              <img src={DeleteIcon} alt="img" />
            </Link>
          </>
        </>
      ),
    },
  ];

  const moveCategory = (props, direction) => {
    const localCatalog = structuredClone(catalog);
    if (localCatalog.categories.length > 1) {
      const index = localCatalog.categories.indexOf(props.categoryName);
      if (direction === 'up') {
        if (index > 0) {
          const temp = localCatalog.categories[index];
          localCatalog.categories[index] = localCatalog.categories[index - 1];
          localCatalog.categories[index - 1] = temp;
        }
      } else {
        if (index < localCatalog.categories.length - 1) {
          const temp = localCatalog.categories[index];
          localCatalog.categories[index] = localCatalog.categories[index + 1];
          localCatalog.categories[index + 1] = temp;
        }
      }
    }

    updateData(localCatalog.categories);
  }

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
