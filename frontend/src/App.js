// App.js
import React, { useEffect } from 'react';
import './App.css';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Component/Login/Login';
import Sign from './Component/Sign/Sign';
import Cart from './Component/Cart/Cart';
import ProductsDetails from './Component/ProductDetails/ProductsDetails';
import { setCartItems } from './redux/account'

function App() {
  // get navbar state from store 
  const showNavbar = useSelector((state) => state.account.showNavbar);
  const dispatch = useDispatch();

  // get cart 
  const getCart = async () => {
    await fetch('http://localhost:4000/getcart', {
      method: 'get',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('auth-token')}`,
      }
    })
      .then((result) => result.json())
      .then((data) => {
        dispatch(setCartItems(data));
      })
      .catch((err) => alert('error :' + err))
  }
  useEffect(() => {
    getCart()
  }, [])

  return (
    <div className="App">
      <Router>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/sign" element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
