import React, { useEffect } from 'react'
import './Navbar.css'
import '../../cssHelper/helper.css'
import { useSelector, useDispatch } from 'react-redux'
import { showAccount } from '../../redux/account'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const cartCount = useSelector((state) => state.cart.cartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(showAccount());
    navigate('/account/login');
  };

  return (
    <div className='Navbar w-full white-clr'>
      <div className="nav-bar-container p-inline-3 flex j-between a-center size-full">
        <p className='font-sm'>E- commerce </p>
        <div className="search r-vh relative">
          <input type="search" className='glass size-full white-clr pl-1' placeholder='Search Products' />
          <span className="material-symbols-rounded absolute abs-mid-y right search-icon">
            search
          </span>
        </div>
        <ul className="flex gap-1 a-center h-full navs">
          <li className='pointer address-nav'>
            Deliver to this address : <br />
            Florida, USA
          </li>
          <li onClick={() => navigate('/')} className='pointer flex a-center'>
            <span class="material-symbols-rounded">
              home
            </span>
            Home
          </li>
          <li className='pointer flex a-center'>
            <span class="material-symbols-rounded">
              category
            </span>
            Catogries
          </li>
          <li onClick={() => localStorage.getItem('auth-token') ? navigate('/cart') : navigate('/account/login')} className='pointer flex a-center relative'>
            <span class="material-symbols-rounded">
              shopping_cart
            </span>
            Cart
            <span className="absolute cart-count">
              {cartCount}
            </span>
          </li>
        </ul>
        <div className="account">
          {
            localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }} className='login-btn p-inline-3 font-sm r-vh pointer'>Logout</button> :
              <button onClick={handleLoginClick} className='login-btn p-inline-3 font-sm r-vh pointer'>Login</button>
          }
        </div>
      </div>
    </div >
  )
}

export default Navbar
