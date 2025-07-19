import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  
} from "react-router-dom";
import Dashboard from "../component/Admin/Dashboard";
import ProductList from "../component/Admin/ProductList";
import OrderList from "../component/Admin/OrderList";
import UserList from "../component/Admin/UserList";
import UpdateProduct from "../component/Admin/UpdateProduct";
import ProcessOrder from "../component/Admin/ProcessOrder";
import UpdateUser from "../component/Admin/UpdateUser";
import NewProduct from "../component/Admin/NewProduct";
import ProductReviews from "../component/Admin/ProductReviews";
import PrivateRoute from "../component/Route/PrivateRoute";
import SupplierList from "../component/Admin/SupplierList";
import NewSupplier from "../component/Admin/NewSupplier";
import NewEmployee from "../component/Admin/NewEmployee";
import EmployeeList from "../component/Admin/EmployeeList";
import UpdateEmployee from "../component/Admin/UpdateEmployee";

const Admin = () => {
     
    return (
      
        <Router>
            <Switch>
             <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/suppliers"
            component={SupplierList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/supplier/:id"
            component={SupplierList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/supplier"
            component={NewSupplier}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/employees"
            component={EmployeeList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/employee"
            component={NewEmployee}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/employee/:id"
            component={UpdateEmployee}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}
          />
          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/new/product"
            component={NewProduct}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UserList}
          />

          <PrivateRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
            </Switch>
        </Router>
    
    );
    }
export default Admin;