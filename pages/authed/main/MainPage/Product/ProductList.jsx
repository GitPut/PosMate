import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { onlineStoreState, setStoreDetailState, setUserStoreState, userState, userStoreState } from "state/state";
import { updateData } from "state/firebaseFunctions";
import { auth, db, storage } from "state/firebaseConfig";
import ProductImage from "pages/non-authed/OnlineOrderPages/components/cartOrder/ProductImage";
import { Text, TouchableOpacity, View } from "react-native";

const ProductList = () => {
  const catalog = userStoreState.use()
  const [inputfilter, setInputfilter] = useState(false);
  const [searchFilterValue, setsearchFilterValue] = useState('')
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const userS = userState.use();
  const onlineStoreDetails = onlineStoreState.use()
  const history = useHistory()
  const [selectedCategory, setselectedCategory] = useState()

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
        let localCatalog = structuredClone(catalog);
        if (localCatalog.products.length > 1) {
          localCatalog.products = localCatalog.products.filter((item) => item.id !== props.id);
        } else {
          localCatalog.products = [];
        }
        setUserStoreState({ categories: localCatalog.categories, products: localCatalog.products })
        db.collection("users")
          .doc(userS.uid)
          .collection("products")
          .doc(props.id.toString())
          .delete()
        if (onlineStoreDetails.onlineStoreSetUp) {
          db.collection("public")
            .doc(userS.uid)
            .collection("products")
            .doc(props.id.toString())
            .delete()
        }
      }
    });
  };

  useEffect(() => {
    if (catalog.products.length > 0) {
      setData([]);
      catalog.products.map((product, index) => {
        setData((prev) => {

          const productsWithCategory = prev.filter((item) => item.category === product.category)
          if (productsWithCategory.length > 0) {
            const indexOfLastItem = prev.indexOf(productsWithCategory[productsWithCategory.length - 1])
            prev.splice(indexOfLastItem + 1, 0, {
              id: product.id,
              index: index + 1,
              image: product.imageUrl ? product.imageUrl : AvocatImage,
              productName: product.name,
              category: product.catagory ? product.catagory : product.category,
              price: product.price,
              createdBy: "Admin",
              hasImage: product.hasImage
            })
            return prev
          }

          return [
            ...prev,
            {
              id: product.id,
              index: index + 1,
              image: product.imageUrl ? product.imageUrl : AvocatImage,
              productName: product.name,
              category: product.catagory ? product.catagory : product.category,
              price: product.price,
              createdBy: "Admin",
              hasImage: product.hasImage
            },
          ]
        }
        );

      });
    }
  }, [catalog]);

  useEffect(() => {
    if (searchFilterValue.length > 0 || selectedCategory) {

      const filtered = data.filter((item) => {
        return item.productName.toLowerCase().includes(searchFilterValue.toLowerCase()) && item.category === selectedCategory || item.category.toLowerCase().includes(searchFilterValue.toLowerCase()) && item.category === selectedCategory
      })

      setfilteredData(filtered)
    } else {
      setfilteredData([])
    }

  }, [searchFilterValue, selectedCategory])

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
              to={`/authed/product/editproduct-product/${record.id}`}
            >
              <ProductImage source={{ uri: record.image }} resizeMode="contain" style={{ height: 96, width: 95 }} />
            </Link>
            <Link
              style={{ fontSize: "15px", marginLeft: "10px", textDecoration: "none" }}
              to={`/authed/product/editproduct-product/${record.id}`}
            >
              {record.productName}
            </Link>
          </div>
        )
      },
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
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
            <Link
              style={{ textDecoration: "none" }}
              className="me-3"
              onClick={() => {
                let copy = structuredClone(catalog.products[catalog.products.findIndex((item) => item.id === props.id)]);
                copy.name = copy.name + " Copy";
                copy.imageUrl = "";
                copy.hasImage = false;
                copy.id = Math.random().toString(36).substr(2, 9);
                db.collection("users")
                  .doc(userS.uid)
                  .collection("products")
                  .doc(copy.id.toString())
                  .set(copy)
                if (onlineStoreDetails.onlineStoreSetUp) {
                  db.collection("public")
                    .doc(userS.uid)
                    .collection("products")
                    .doc(copy.id.toString())
                    .set(copy)
                }
                setUserStoreState({ categories: catalog.categories, products: [...catalog.products, copy] })
                history.push(`/authed/product/editproduct-product/${copy.id}`)
              }}
            >
              <img src={DuplicateIcon} alt="img" />
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="me-3"
              to={`/authed/product/editproduct-product/${props.id}`}
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
              {catalog.categories.length > 0 && <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '98%', height: 50, flexWrap: 'wrap', margin: 10 }}>
                {catalog.categories.map((category, index) => (
                  <TouchableOpacity key={index}
                    style={[{ padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }, selectedCategory === category ? { backgroundColor: 'black' } : { backgroundColor: 'grey' }]}
                    onPress={() => setselectedCategory(prev => prev === category ? null : category)}>
                    <Text style={{ fontSize: 18, color: 'white' }}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>}
              {/* /Filter */}
              <div className="table-responsive">
                <Table columns={columns} dataSource={filteredData.length > 0 ? filteredData : data} noPagnation={true} />
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
