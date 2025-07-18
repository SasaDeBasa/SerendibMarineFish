import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";

import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Payment from "./component/Cart/Payment";
import Home from "./component/Home/Home";
import Services from "./Terms&Condtions/Service";
import Footer from "./component/layouts/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Signup from "./component/User/SignUp";
import Login from "./component/User/Login";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgetPassword from "./component/User/ForgetPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrder from "./component/order/MyOrder";
import ContactForm from "./Terms&Condtions/Contact";
import AboutUsPage from "./Terms&Condtions/Aboutus";
import ReturnPolicyPage from "./Terms&Condtions/Return";
import TermsUse from "./Terms&Condtions/TermsAndUse";
import TermsAndConditions from "./Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "./Terms&Condtions/Privacy";

// Lazy load admin components
const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() => import("./component/Admin/ProductList"));
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() => import("./component/Admin/UpdateProduct"));
const LazyProcessOrder = React.lazy(() => import("./component/Admin/ProcessOrder"));
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() => import("./component/Admin/ProductReviews"));
const LazySupplierList = React.lazy(() => import("./component/Admin/SupplierList"));
const LazyNewSupplier = React.lazy(() => import("./component/Admin/NewSupplier"));
const LazyUpdateSupplier = React.lazy(() => import("./component/Admin/UpdateSupplier"));
const LazyEmployeeList = React.lazy(() => import("./component/Admin/EmployeeList")); 
const LazyNewEmployee = React.lazy(() => import("./component/Admin/NewEmployee"));
const LazyUpdateEmployee = React.lazy(() => import("./component/Admin/UpdateEmployee"));

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("http://localhost:5001/api/v1/stripeapikey");
      if (data.stripeApiKey) {
        sessionStorage.setItem("stripeApiKey", JSON.stringify(data.stripeApiKey));
        setStripeApiKey(data.stripeApiKey);
      }
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    const stripeApiKey = sessionStorage.getItem("stripeApiKey");
    if (stripeApiKey) {
      setStripeApiKey(JSON.parse(stripeApiKey));
    } else {
      getStripeApiKey();
    }
    dispatch(load_UserProfile());
    // eslint-disable-next-line
  }, [dispatch]);

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (<><Header /><Home /><Services /><Footer /></>)} />
        <Route exact path="/product/:id" render={() => (<><Header /><ProductDetails /><Services /><Footer /></>)} />
        <Route exact path="/products" render={() => (<><Header /><Products /><Services /><Footer /></>)} />
        <Route path="/products/:keyword" render={() => (<><Header /><Products /><Services /><Footer /></>)} />
        <Route exact path="/signup" render={() => (<><Header /><Signup /><Services /><Footer /></>)} />
        <Route exact path="/login" render={() => (<><Header /><Login /><Services /><Footer /></>)} />
        <Route exact path="/password/forgot" render={() => (<><Header /><ForgetPassword /><Services /><Footer /></>)} />
        <Route exact path="/password/reset/:token" render={() => (<><Header /><ResetPassword /><Services /><Footer /></>)} />
        <Route exact path="/cart" render={() => (<><Header /><Cart /><Services /><Footer /></>)} />
        <Route exact path="/policy/return" render={() => (<><Header /><ReturnPolicyPage /><Services /><Footer /></>)} />
        <Route exact path="/policy/Terms" render={() => (<><Header /><TermsUse /><Services /><Footer /></>)} />
        <Route exact path="/policy/privacy" render={() => (<><Header /><PrivacyPolicy /><Services /><Footer /></>)} />
        <Route exact path="/terms/conditions" render={() => (<><Header /><TermsAndConditions /><Services /><Footer /></>)} />
        <Route exact path="/contact" render={() => (<><Header /><ContactForm /><Footer /></>)} />
        <Route exact path="/about_us" render={() => (<><Header /><AboutUsPage /><Footer /></>)} />
        <Route exact path="/account" render={() => (<><Header /><PrivateRoute exact path="/account" component={Profile} /><Services /><Footer /></>)} />
        <Route exact path="/profile/update" render={() => (<><Header /><PrivateRoute exact path="/profile/update" component={UpdateProfile} /><Services /><Footer /></>)} />
        <Route exact path="/password/update" render={() => (<><Header /><PrivateRoute exact path="/password/update" component={UpdatePassword} /><Services /><Footer /></>)} />
        <Route exact path="/orders" render={() => (<><Header /><PrivateRoute exact path="/orders" component={MyOrder} /><Services /><Footer /></>)} />
        <Route exact path="/shipping" render={() => (<><Header /><PrivateRoute exact path="/shipping" component={Shipping} /><Services /><Footer /></>)} />
        <Route exact path="/order/confirm" render={() => (<><Header /><PrivateRoute exact path="/order/confirm" component={ConfirmOrder} /><Services /><Footer /></>)} />
        <Route exact path="/success" render={() => (<><Header /><PrivateRoute exact path="/success" component={OrderSuccess} /><Services /><Footer /></>)} />
      </Switch>

      <Suspense fallback={<CricketBallLoader />}>
        <Switch>
          <PrivateRoute isAdmin={true} exact path="/admin/dashboard" component={LazyDashboard} />
          <PrivateRoute isAdmin={true} exact path="/admin/products" component={LazyProductList} />
          <PrivateRoute isAdmin={true} exact path="/admin/suppliers" component={LazySupplierList} />
          <PrivateRoute isAdmin={true} exact path="/admin/new/supplier" component={LazyNewSupplier} />
          <PrivateRoute isAdmin={true} exact path="/admin/supplier/:id" component={LazyUpdateSupplier} />
          <PrivateRoute isAdmin={true} exact path="/admin/product/:id" component={LazyUpdateProduct} />
          <PrivateRoute isAdmin={true} exact path="/admin/reviews" component={LazyProductReviews} />
          <PrivateRoute isAdmin={true} exact path="/admin/orders" component={LazyOrderList} />
          <PrivateRoute isAdmin={true} exact path="/admin/order/:id" component={LazyProcessOrder} />
          <PrivateRoute isAdmin={true} exact path="/admin/new/product" component={LazyNewProduct} />
          <PrivateRoute isAdmin={true} exact path="/admin/users" component={LazyUserList} />
          <PrivateRoute isAdmin={true} exact path="/admin/user/:id" component={LazyUpdateUser} />
          <PrivateRoute isAdmin={true} exact path="/admin/employees" component={LazyEmployeeList} />
          <PrivateRoute isAdmin={true} exact path="/admin/new/employee" component={LazyNewEmployee} />
          <PrivateRoute isAdmin={true} exact path="/admin/employee/:id" component={LazyUpdateEmployee} />
        </Switch>
      </Suspense>

      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Route exact path="/process/payment">
            <Header />
            <PrivateRoute exact path="/process/payment" component={Payment} />
          </Route>
        </Elements>
      )}
    </Router>
  );
}

export default App;
