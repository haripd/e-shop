import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Pnf from './Pages/Pnf'
import Menu from './components/Menu'
import Dashboard from './Pages/Dashboard/Dashboard'
import PrivateRoute from './PrivateRouter/PrivateRoute'
import UserDashboard from './Pages/Dashboard/user/UserDashboard'
import AdminDashboard from './Pages/Dashboard/admin/AdminDashboard'
import AdminProducts from './Pages/Dashboard/admin/Products/AdminProducts'
import AdminCategory from './Pages/Dashboard/admin/Category/AdminCategory'
import AdminOrders from './Pages/Dashboard/admin/Orders/AdminOrders'
import AdminUsers from './Pages/Dashboard/admin/Users/AdminUsers'
import NewProduct from './Pages/Dashboard/admin/Products/NewProduct'
import ProductsHome from './Pages/Products/ProductsHome'
import ProductDetails from './Pages/Products/ProductDetails'
import UpdateProduct from './Pages/Dashboard/admin/Products/UpdateProduct'

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
    <ToastContainer autoClose={4000} position={'top-right'}/>
    <Routes>
       <Route element={<PrivateRoute />}>
          <Route path={`/dashboard`} element={<Dashboard />}>
            <Route path={`user`} element={<UserDashboard />}></Route>

            <Route path={`superadmin`} element={<AdminDashboard />}>
                  <Route path={`products`} element={<AdminProducts />} />
                  <Route path={`products/new`} element={<NewProduct />}/>
                  <Route path={`products/update/:id`} element={<UpdateProduct />}/>
                  <Route path={`categories`} element={<AdminCategory />}/>
                  <Route path={`orders`} element={<AdminOrders />}/>
                  <Route path={`users`} element={<AdminUsers />}/>
            </Route>
          </Route>
       </Route>
       <Route path={`/`} element={<Home />}>
            <Route path={`/`} element={<ProductsHome />}/>
            <Route path={`/products/:id`} element={<ProductDetails />}/>
       </Route>

       <Route path={`/about`} element={<About />}/>
       <Route path={`/contact`} element={<Contact />}/>
       <Route path={`/login`} element={<Login />}/>
       <Route path={`/register`} element={<Register />}/>
       <Route path={`/*`} element={<Pnf />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App