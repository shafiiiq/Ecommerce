import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import './Home.css'
import '../../cssHelper/helper.css'
import Products from '../Products/Products'
import { useSelector, useDispatch } from 'react-redux'
import { resetNavbar } from '../../redux/account';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetNavbar());
  }, [dispatch]);
  return (
    <div className='Home size-full'>
      <Products/>
    </div>
  )
}

export default Home
