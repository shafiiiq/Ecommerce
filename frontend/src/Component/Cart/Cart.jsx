import React, { useEffect, useState } from 'react'
import '../../cssHelper/helper.css';
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    const dispatch = useDispatch();

    // get cart from store 
    const cart = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        console.log("Cart count:", cart);
    }, [cart])

    // romove item from cart 
    const removeFromCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json', // Add this line
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ itemId: itemId })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    window.location.replace('/cart')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='Cart-wrapper w-full scroll-hidden'>
            <div className="cart scroll-y scroll-hidden-x grid c-repeat-2 w-full gap-1 p-inline-4 p-block-3 p-center">
                {
                    cart.length > 0 ? (
                        cart.map((product, prodId) => (
                            <div className="cart-items flex a-center p-2">
                                <img src={product.image ? product.image : ''} alt="" className='cart-img cover' />
                                <div className="single-details flex flex-col gap-05 p-inline-2 w-full">
                                    <p className="signle-name font-sm bold-500">
                                        {product.name}
                                    </p>
                                    <div className="single-price font-lg bold-600">
                                        <span>$</span> <span>
                                            {product.price}
                                        </span>
                                    </div>
                                    <p className="single-descripion-cart">
                                        {product.description}
                                    </p>
                                    <p className="single-category thisnone">
                                        <span className='bold-600'>Category: </span> <span>
                                            {product.category}
                                        </span>
                                    </p>
                                    <p className="single-type thisnone">
                                        <span className='bold-600'>Color: </span> <span>
                                            {product.color}
                                        </span>
                                    </p>
                                    <p className="single-quality thisnone">
                                        <span className='bold-600'>Weight: </span> <span>
                                            {product.weight}
                                            <span>g</span>
                                        </span>
                                    </p>
                                    <div className="add-cart add-cart-this flex j-between w-full">
                                        <div className="quantity">
                                            Quantity: <span className='font-md bold-600'>{product.count}</span>
                                        </div>
                                        <button onClick={() => (removeFromCart(product.id))} className="remove-cart font-sm white-clr bold-600 pointer r-4 ease-4">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='w-full no-cart flex j-center a-center black-clr'>
                            <p className="font-xl">
                                Empty cart. Cart has no data
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart
