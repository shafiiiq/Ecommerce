import React, { useEffect, useState } from 'react';
import '../../cssHelper/helper.css';
import './ProductsDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ProductsDetails() {

    const navigate = useNavigate();
    let { id } = useParams();
    const cart = useSelector((state) => state.cart.cartItems);
    const [product, setProduct] = useState({});
    if (cart.length > 0) {
        var thisItem = cart.find(item => item.id === parseInt(id));
    }

    // add to cart 
    const addToCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ itemId: itemId })
            })
                .then((response) => response.json())
                .then((data) => {
                    // Reload the page or update the cart state if needed
                    window.location.replace(`/product/${id}`)
                })
                .catch(err => console.log(err))
        }
    }

    // get current icon with id from params
    const getItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:4000/product/${itemId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    };

    useEffect(() => {
        getItem(id);
    }, [id]);

    return (
        <div className='flex w-full p-3'>
            {product && (
                <div className="single-products-top flex w-full pl-6">
                    <img src={product.image} alt="" className="w-half cover single-img" />
                    <div className="single-details flex flex-col gap-05 p-inline-2 w-full">
                        <p className="signle-name font-sm bold-500">
                            {product.name}
                        </p>
                        <div className="star flex a-center">
                            <span className="material-symbols-rounded">
                                star
                            </span>
                            <span className="material-symbols-rounded">
                                star
                            </span>
                            <span className="material-symbols-rounded">
                                star
                            </span>
                            <span className="material-symbols-rounded">
                                star
                            </span>
                            <span className="material-symbols-rounded">
                                star
                            </span>
                        </div>
                        <div className="single-price font-lg bold-600">
                            <span>$</span> <span>433243</span>
                        </div>
                        <p className="single-description">
                            {product.description}
                        </p>
                        <p className="select-size font-sm mt-1">
                            Select size
                        </p>
                        <div className="size-div grid gap-1 c-repeat-5 mt-1">
                            <div className="size-items font-lg r-4 flex a-center j-center pointer">
                                S
                            </div>
                            <div className="size-items font-lg r-4 flex a-center j-center pointer">
                                M
                            </div>
                            <div className="size-items font-lg r-4 flex a-center j-center pointer">
                                L
                            </div>
                            <div className="size-items font-lg r-4 flex a-center j-center pointer">
                                XL
                            </div>
                            <div className="size-items font-lg r-4 flex a-center j-center pointer">
                                XXL
                            </div>
                        </div>
                        <p className="single-category mt-1">
                            <span className='bold-600'>Category: </span> <span>{product.category}</span>
                        </p>
                        <p className="single-type">
                            <span className='bold-600'>Type: </span> <span>{product.category}</span>
                        </p>
                        <p className="single-quality">
                            <span className='bold-600'>Quality: </span> <span>{product.quality}</span>
                        </p>
                        <p className="single-weight">
                            <span className='bold-600'>Weight: </span> <span>{product.weight}</span><span>g</span>
                        </p>
                        <p className="single-type">
                            <span className='bold-600'>Color: </span> <span>{product.color}</span>
                        </p>
                        <div className="add-cart flex j-end w-full gap-1 a-center">
                            <div className="quantity flex a-center j-center">
                                Cart Quantity : <span className='bold font-md ml-1'> {thisItem ? thisItem.count : null}</span>
                            </div>
                            <button onClick={() => localStorage.getItem('auth-token') ? addToCart(product.id) : navigate('/account/login')} className="add-to-cart mt-1 font-sm white-clr bold-600 pointer r-4 ease-4">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsDetails;
