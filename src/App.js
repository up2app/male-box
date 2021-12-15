import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home'
import GalleryPage from '../src/pages/GalleryPage';
import Store from '../src/pages/Store';
import ProductPage from '../src/pages/ProductPage';
import Register from '../src/pages/Register';
import Order from '../src/pages/Order'
import OrdersHistory from '../src/pages/OrdersHistory'
import OrderConfirm from '../src/pages/OrderConfirm'
import Dashboard from './SystemManager/pages/Dashboard'
import UserManagement from './SystemManager/pages/UserManagement'
import './color.css'
import NavBar from './components/NavBar';
import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import EditUser from './SystemManager/pages/EditUser';
import AddUser from './SystemManager/pages/AddUser';
import ItemManagement from './SystemManager/pages/ItemMamagement';
import AddItem from './SystemManager/pages/AddItem';
import EditItem from './SystemManager/pages/EditItem';
import CategoriesManagement from './SystemManager/pages/CategoriesManagement';
import AddCategory from './SystemManager/pages/AddCategory';
import OrderManagement from './SystemManager/pages/OrderManagement';
import EditOrder from './SystemManager/pages/EditOrder';


function App() {


  const IfTokenUser = async (tokenfromls) => {
    try {
      let res = await fetch('/api/users/selectuserbytoken/' + tokenfromls, { method: 'GET' })
      let data = await res.json()
      if (data.recordset.length === 0) {
        alert("פג תוקף אישור משתמש יש לבצע התחברות מחדש")
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.reload(true)
      }
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if(localStorage.getItem('setupTime'))
      {
      let tokenfromLS = JSON.parse(localStorage.getItem('token'))
      IfTokenUser(tokenfromLS)
      }
      else
      {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        localStorage.removeItem('setupTime')
        localStorage.removeItem('tokenadmin')
        alert("פג תוקף אישור משתמש יש לבצע התחברות מחדש")
        window.location.reload(true)

      }
    }

    var hours = 8; // to clear the localStorage after 8 hour(if someone want to clear after 1hrs simply change hours=1)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime !== null) {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        localStorage.removeItem('setupTime')
        localStorage.removeItem('tokenadmin')
        window.location.reload(true)
      }
    }
  }, [])


  return (


    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route path="/store" component={Store} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/Register" component={Register} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/ordershistory" component={OrdersHistory} />
          <Route path="/orderconfirm/:id" component={OrderConfirm} />

          {/* admin */}
          <Route path="/admin" component={Dashboard} />
          <Route path="/usermanagement" component={UserManagement} />
          <Route path="/edituser" component={EditUser} />
          <Route path="/adduser" component={AddUser} />
          <Route path="/itemmanagement" component={ItemManagement} />
          <Route path="/additem" component={AddItem} />
          <Route path="/edititem" component={EditItem} />
          <Route path="/categorymanagement" component={CategoriesManagement} />
          <Route path="/addcategory" component={AddCategory} />
          <Route path="/ordermanagement" component={OrderManagement} />
          <Route path="/editorder" component={EditOrder} />



        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
