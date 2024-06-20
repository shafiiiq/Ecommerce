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
  const showNavbar = useSelector((state) => state.account.showNavbar);

  const dispatch = useDispatch();

  const getCart = async () => {
    await fetch('http://localhost:4000/getcart', {
      method: 'get',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json', // Add this line
        'auth-token': `${localStorage.getItem('auth-token')}`,
      }
    })
      .then((result) => result.json())
      .then((data) => {
        dispatch(setCartItems(data));
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getCart()
    // console.log(cart);
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
