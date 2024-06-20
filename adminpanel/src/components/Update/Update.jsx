import React, { useEffect, useState } from 'react'
import '../../cssHelper/helper.css'
import './Update.css'
import { useParams } from 'react-router-dom';


function Update() {

    let { id } = useParams();

    const [product, setProduct] = useState([])
    const [image, setImage] = useState(false)
    const [newDetails, setNewDetails] = useState([
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
        }
    ]);
    const handleUpdate = (e) => {
        setNewDetails({
            ...newDetails,
            [e.target.name]: e.target.value,
        })
    }

    // handle image change while uploading 
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };

    // get item using item id from param to update the details 
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
    }, [])

    // Update details 
    const updateDetails = async (e) => {
        e.preventDefault()
        let responseData;
        let product = newDetails;
        let formData = new FormData();
        formData.append('product', image)

        // if image exist for updating, includes image for updating ; else update only the details 
        if (image) {
            await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData,
            })
                .then((result) => result.json())
                .then((data) => { responseData = data })

            if (responseData.success) {
                console.log(product);
                product.image = responseData.image_url

                // if have image only for updating then send only image with body ; else add both details and image 
                const bodyContent = product.name ? JSON.stringify(product) : JSON.stringify({ image: responseData.image_url });
                await fetch(`http://localhost:4000/update-product/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyContent,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            console.log("success");
                            window.location.replace('/products-lists')
                        } else {
                            console.log("err");
                        }
                    })
            }
        } else {
            await fetch(`http://localhost:4000/update-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log("success");
                        window.location.replace('/products-lists')
                    } else {
                        console.log("err");
                    }
                })
        }
    };

    return (
        <div className="form scroll-y scroll-hidden-x w-full">
            <form action="" className="w-full flex flex-column gap-4 p-10">
                <div className="div flex w-full j-center">
                    <p className="update-product font-md">
                        Update Product
                    </p>
                </div>
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
                        <input onChange={handleImageChange} type="file" name='image' className='file-input size-full' />
                    </div>
                </div>
                <div className="details grid gap">
                    <div className="items flex flex-column gap">
                        Product name
                        <input onChange={handleUpdate} value={newDetails.name} placeholder={product.name} type="text" name='name' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Price
                        <input onChange={handleUpdate} value={newDetails.price} placeholder={product.price} type="text" name='price' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Quality
                        <input onChange={handleUpdate} value={newDetails.quality} placeholder={product.quality} type="text" name='quality' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Brand
                        <input onChange={handleUpdate} value={newDetails.brand} placeholder={product.brand} type="text" name='brand' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Color
                        <input onChange={handleUpdate} value={newDetails.color} placeholder={product.color} type="text" name='color' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Size
                        <input onChange={handleUpdate} value={newDetails.size} placeholder={product.size} type="text" name='size' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Description
                        <textarea onChange={handleUpdate} value={newDetails.description} placeholder={product.description} name="description" id="decription" cols="30" rows="10" className="full radius pad-inline glass height white-clr" ></textarea>
                    </div>
                    <div className="items flex flex-column gap">
                        Quantity
                        <input onChange={handleUpdate} value={newDetails.quantity} placeholder={product.quality} type="text" name='quantity' className="full radius pad-inline glass height" />
                    </div>
                    <div className="items flex flex-column gap">
                        Weight
                        <input onChange={handleUpdate} value={newDetails.weight} placeholder={product.weight} type="text" name='weight' className="full radius pad-inline glass" />
                    </div>
                    <div className="items flex flex-column gap">
                        Category
                        <div className="custom-datalist radius height">
                            <input onChange={handleUpdate} value={newDetails.category} placeholder={product.category} type="text" name='category' className="full radius pad-inline glass" />
                        </div>
                    </div>
                </div>
                <input onClick={(e) => updateDetails(e)} type="submit" className="radius red-bg white-clr flex a-center j-center height font-sm pointer ease hover-green" value='Update' />
            </form>
        </div>
    )
}

export default Update
