import React, { useEffect, useState } from 'react'
import './Products.css'
import '../../cssHelper/helper.css'
import ProductsDetails from '../ProductDetails/ProductsDetails'
import { useNavigate } from 'react-router-dom'
// import { adv } from '../../../public/ad-1.jpg'


function Products() {

    const [productDetail, setProductDetail] = useState(false)
    const [sendProductDetail, setSendProductDetail] = useState([])
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        await fetch('http://localhost:4000/get-products')
            .then((result) => result.json())
            .then((data) => setProducts(data))
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const sendProduct = (product) => {
        setSendProductDetail(product)
        setProductDetail(true)
    }

    const navigate = useNavigate();
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };


    return (
        <div className='Products-wrapper scroll-hidden black-clr w-full'>
            <div className="products scroll-y scroll-hidden-x flex flex-col">

                <img src={process.env.PUBLIC_URL + '/ad-1.jpg'} className='w-full cover adv' />
                <div className="grid c-repeat-5 gap-2 p-3">
                    {products.map((product, index) => (
                        <div onClick={() => handleProductClick(product.id)} key={index} className="products-list flex flex-col gap-1 pointer ease-in-out duration-400">
                            <img src={product.image || ''} className='w-full cover product-image' alt={product.name} />
                            <div className="products-details flex flex-col">
                                <p className="product-name font-semibold text-sm">
                                    {product.name}
                                </p>
                                <p className='price font-bold text-md'>
                                    ${product.price}
                                </p>
                                <p className="description font-xs">
                                    {product.description}
                                </p>
                                <p className="category mt-1">
                                    <span className='category-title'>Category:</span> {product.category}
                                </p>
                                <p className="offer">
                                    Flash sale is now on!
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Products
