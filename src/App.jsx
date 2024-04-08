import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/Nopage';
import Login from './pages/registeration/Login';
import Signup from './pages/registeration/Signup';
import { EcomProvider } from './context/EcomContext';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/Addproduct';
import UpdateProduct from './pages/admin/page/Updateproduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/allProducts/AllProducts';
import ProfileInfo from './pages/profileinfo/ProfileInfo';

function App() {
  return (
    <EcomProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/allproducts" element={<AllProducts/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard/>
          </ProtectedRouteForAdmin>
        } />

        <Route path='/productinfo/:id' element={<ProductInfo/>}/>
        <Route path='/profile' element={
           <ProtectedRoute>
            <ProfileInfo/>
           </ProtectedRoute>
        }/>
        <Route  path='/addproduct' element={
          <ProtectedRouteForAdmin>
            <AddProduct/>
            </ProtectedRouteForAdmin>
        }/>
        <Route  path='/updateproduct' element={
          <ProtectedRouteForAdmin>
            <UpdateProduct/>
          </ProtectedRouteForAdmin>
        }/>

        <Route path="/*" element={<NoPage/>} />
      </Routes>
      <ToastContainer/>
    </Router>
    </EcomProvider>
  )
}

export default App

// user

export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem('user')
   if(user){
    return children
   }
   else{
    return <Navigate to={'/login'}/>
   }
}

// admin
export const ProtectedRouteForAdmin=({children})=>{
  const admin = JSON.parse(localStorage.getItem('user'))
  if(admin.user.email === "webdev@gmail.com"){
    return children
  }
  else{
    return <Navigate to= {'/login'}/>
  }
}