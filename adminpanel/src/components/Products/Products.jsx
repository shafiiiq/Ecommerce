import React, { useState } from 'react'
import '../../cssHelper/helper.css'
import './Products.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Products() {

    const products = useSelector((state) => state.cart.products);
    const count = useSelector((state) => state.cart.productCount);
    const navigate = useNavigate();

    // delete product using item id 
    const deleteProduct = async (itemId) => {
        console.log(itemId);
        await fetch('http://localhost:4000/delete-product', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                id: itemId
            })
        })
            .then((result) => result.json())
            .then((data) => {
                window.location.replace('/products-lists')
            })
            .catch((error) => console.error('Error:', error));
    }

    // navigate to update form 
    const controlUpdate = (itemId) => {
        navigate(`/update/product/${itemId}`)
    }

    return (
        <div className="Products scroll-y scroll-hidden-x w-full p-8 white-clr flex flex-col">
            <p className="font-sm flex j-between">
                Lists of products
                <span className='flex results'>Showing<span className='bold-600'>{count}</span><span>results</span></span>
            </p>
            <div className="prod-head w-full mt-2 r-3 flex a-center">
                <ul className="w-full flex">
                    <li className='bold-600 this-title'>
                        Image
                    </li>
                    <li className='bold-600 this-title'>
                        ID
                    </li>
                    <li className='bold-600 this-title'>
                        Name
                    </li>
                    <li className='bold-600 this-title'>
                        Category
                    </li>
                    <li className='bold-600 this-title'>
                        Price
                    </li>
                    <li className='bold-600 this-title'>
                        Action
                    </li>
                </ul>
            </div>
            {
                products.length > 0 ? (
                    products.map((product, index) => (
                        <div className="product-lists-item flex mt-1 a-center gap-1">
                            <div className="this-item">
                                <img src={product.image} alt="" className="product-img cover" />
                            </div>
                            <p className="product-id this-item">
                                {product.id}
                            </p>
                            <p className="product-name this-item">
                                {product.name}
                            </p>
                            <p className="product-name this-item">
                                {product.category}
                            </p>
                            <p className="product-name this-item">
                                {product.price}.RS
                            </p>
                            <div className="action this-item flex">
                                <button onClick={() => deleteProduct(product.id)} className='btn btn-del font-sm r-10'>Delete</button>
                                <button onClick={() => controlUpdate(product.id)} className='btn btn-upt font-sm r-10'>Update</button>
                            </div>
                        </div>
                    ))
                ) : ''
            }
        </div>
    )
}

export default Products
