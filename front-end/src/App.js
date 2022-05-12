import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Product from './pages/Product';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import './App.css';
import OrderDetails from './pages/OrderDetails';
import OrderDetailsSeller from './pages/OrderDetailsSeller';
import OrdersCustomer from './pages/OrdersCustomers';
import SellerOrders from './pages/SellerOrders';
import SuccessfulPurchase from './components/SuccessfulPurchase';
import AdminManager from './pages/AdminManager';

function App() {
  return (
    <Switch>
      <Route exact path="/admin/manage" component={ AdminManager } />
      <Route exact path="/customer/products" component={ Product } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route
        exact
        path="/customer/orders/:id"
        render={ (props) => <OrderDetails { ...props } /> }
      />
      <Route
        exact
        path="/seller/orders/:id"
        render={ (props) => <OrderDetailsSeller { ...props } /> }
      />
      <Route exact path="/customer/checkout/success" component={ SuccessfulPurchase } />
      <Route exact path="/customer/orders" component={ OrdersCustomer } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default App;
