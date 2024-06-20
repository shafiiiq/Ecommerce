import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddProducts from './components/AddProducts/AddProducts';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Products from './components/Products/Products';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './redux/account'
import Update from './components/Update/Update';


function App() {

  const dispatch = useDispatch()

  // fetch produts and store it into redux store 
  const fetchProducts = async () => {
    await fetch('http://localhost:4000/get-products')
      .then((result) => result.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((err) => alert('error :' + err))
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="container w-full h-full scroll-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/products-lists" element={<Products />} />
            <Route path="/update/product/:id" element={<Update />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
