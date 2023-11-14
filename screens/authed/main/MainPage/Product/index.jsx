import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import SubCategoryTable from './Unused/SubCategoryTable';
import AddSubCategory from './Unused/AddSubCategory';
import EditSubCategory from './Unused/EditSubCategory';
import BrandList from './Unused/BrandList';
import AddBrand from './Unused/AddBrand';
import EditBrand from './Unused/EditBrand';
import ImportProduct from './Unused/ImportProduct';
import PrintBarcode from './Unused/PrintBarcode';
import ProductDetails from './productDetails';

const ProductRoute = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/productlist-product`} />
        <Route path={`${match.url}/productlist-product`} component={ProductList} />
        <Route path={`${match.url}/addproduct-product`} component={AddProduct} />
        <Route path={`${match.url}/editproduct-product`} component={EditProduct} />
        <Route path={`${match.url}/categorylist-product`} component={CategoryList} />
        <Route path={`${match.url}/addcategory-product`} component={AddCategory} />
        <Route path={`${match.url}/editcategory-product`} component={EditCategory} />
        <Route path={`${match.url}/subcategorytable-product`} component={SubCategoryTable} />
        <Route path={`${match.url}/addsubcategory-product`} component={AddSubCategory} />
        <Route path={`${match.url}/editsubcategory-product`} component={EditSubCategory} />
        <Route path={`${match.url}/brandlist-product`} component={BrandList} />
        <Route path={`${match.url}/addbrand-product`} component={AddBrand} />
        <Route path={`${match.url}/editbrand-product`} component={EditBrand} />
        <Route path={`${match.url}/importproduct-product`} component={ImportProduct} />
        <Route path={`${match.url}/printbarcode-product`} component={PrintBarcode} />
        <Route path={`${match.url}/product-details`} component={ProductDetails} />

    </Switch>
)

export default ProductRoute;