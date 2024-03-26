import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList'
import CategoryList from './CategoryList';

const ProductRoute = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/productlist-product`} />
        <Route path={`${match.url}/productlist-product`} component={ProductList} />
        <Route path={`${match.url}/categorylist-product`} component={CategoryList} />
    </Switch>
)

export default ProductRoute;