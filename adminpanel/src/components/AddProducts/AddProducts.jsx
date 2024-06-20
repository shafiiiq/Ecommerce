import React, { useState } from 'react'
import '../../cssHelper/helper.css'
import './AddProducts.css'

function AddProducts() {
    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState([
        {
            name: '',
            price: '',
            quality: '',
            brand: '',
            color: '',
            size: '',
            description: '',
            quality: '',
            weight: '',
            category: '',
            quantity: ''
        }
    ]);

    const setDetails = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
            [e.target.price]: e.target.value,
            [e.target.quality]: e.target.value,
            [e.target.brand]: e.target.value,
            [e.target.color]: e.target.value,
            [e.target.size]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.quantity]: e.target.value,
            [e.target.weight]: e.target.value,
            [e.target.category]: e.target.value,
        })
    }
    
    const addImage = (e) => {
        setImage(e.target.files[0])
    }

    const uploadDetails = async (e) => {
        e.preventDefault()
        let responseData;

        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image)

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body:formData,
        })
        .then((result) => result.json())
        .then((data) => {responseData = data})

        if(responseData.success) {
            product.image = responseData.image_url
            console.log(product );

            await fetch('http://localhost:4000/add-products', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(product),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    console.log("successfull updated");
                    window.location.replace('/products-lists')
                } else {
                    console.log("err");
                }
            })
        }
    }
    return (
        <div className="form scroll-y scroll-hidden-x w-full">
            <form action="" className="w-full flex flex-column gap-4 p-10">
                <div className="add-image-container w-full flex j-center">
                    <div className="add-image r-10 p-1 relative">
                        <div className="add-image-text absolute inset flex flex-col a-center j-center">
                            <span className="material-symbols-rounded for">
                                add
                            </span>
                            <p>
                                Add image
                            </p>
                        </div>
                        <input onChange={addImage} type="file" name='image' className='file-input size-full' />
                    </div>
                </div>
                <div className="details grid gap">
                    <div className="items flex flex-column gap">
                        Product name
                        <input onChange={setDetails} value={productDetails.name} type="text" name='name' placeholder="Product name" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Price
                        <input onChange={setDetails} value={productDetails.price} type="text" name='price' placeholder="Price" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Quality
                        <input onChange={setDetails} value={productDetails.quality} type="text" name='quality' placeholder="Quality" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Brand
                        <input onChange={setDetails} value={productDetails.brand} type="text" name='brand' placeholder="Brand" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Color
                        <input onChange={setDetails} value={productDetails.color} type="text" name='color' placeholder="Color" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Size
                        <input onChange={setDetails} value={productDetails.size} type="text" size='size' placeholder="Size" className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Description
                        <textarea onChange={setDetails} value={productDetails.description} name="description" id="decription" cols="30" rows="10" className="full radius pad-inline glass height white-clr" placeholder="Description"></textarea>
                    </div>
                    <div className="items flex flex-column gap">
                        Quantity
                        <input onChange={setDetails} value={productDetails.quantity} type="text" placeholder="Quantity" name='quantity' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Weight
                        <input onChange={setDetails} value={productDetails.weight} type="text" placeholder="Weight" name='weight' className="full radius pad-inline glass" />
                    </div>
                    <div className="items flex flex-column gap">
                        Category
                        <div className="custom-datalist radius height">
                            <input onChange={setDetails} value={productDetails.category} type="text" placeholder="Category" name='category' className="full radius pad-inline glass" />
                        </div>
                    </div>
                </div>
                <input onClick={uploadDetails} type="submit" className="radius red-bg white-clr flex a-center j-center height font-sm pointer ease hover-green" />
            </form>
        </div>
    )
}

export default AddProducts
