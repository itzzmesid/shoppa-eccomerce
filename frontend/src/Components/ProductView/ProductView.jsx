import React from 'react'
import '../../Assets/Images/cart-product.svg'
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'
import ImageGallery from 'react-image-gallery'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import '../ProductView/ProductView.css'
import StarRating from './starRating'
import { Button } from 'antd'
import { useState, useEffect } from 'react'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';  
import { AddCart } from '../../redux/cartSystem';
import {addItem} from '../CartProducts/CartActions/CartAction'
import ProductImage from './ProductImage/ProductImage'

function ProductView() {
    const {slug}= useParams()               //accessing slug from url 
    const dispatch= useDispatch();
    const [product, setProducts] = useState([]);  
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {          //get request for access product details
     await AxiosInstance.get("/product/")
    .then(response => {
  
        setProducts(response.data)
        console.log('hello',response.data)     
    },
    
    )
    .catch(err=>
        console.log('errors',err))
    }
    

    return (
        <>
        <div className="container">
        <div className='product-view'>

        {product?.getActiveProducts?.filter(ProductDetail => ProductDetail.slug === slug).map(ProductDetail =>

            <>
            <p className='product-path'>

                {ProductDetail.slug}
               
            </p>
            <div className='product-details-view'>
                    <div className='product-carousel'>

                        <ProductImage ProductDetail={ProductDetail} />

                    </div>
                    <div className='product-content'>
                        <p className='product-content-head'>
                            {ProductDetail.detailHeader}
                        </p>
                        <p className='product-vendor-name'>
                            by {ProductDetail.product_spec.value[0]}
                        </p>
                        <p className='product-price'>
                        ₹{ProductDetail.productPrice}
                        </p>
                        <div className='product-rating'> <p> 4/5</p><StarRating />
                            <a>see all 18 reviews</a></div>
                        <div className="product-content-buttons">
                            <div className='product-colors'>
                                <p>
                                    colors
                                </p>
                                <button className='color-button1' />
                                <button className='color-button2' />
                                <button className='color-button3' />
                                <button className='color-button4' />
                                <button className='color-button5' />
                            </div>
                            <div className='product-size'>
                                <p>
                                    size
                                </p>
                                <Button>
                                    <p className='product-size-name'> Small</p>
                                    <p className='product-size-inch'> 150 by 18 inches</p>
                                </Button>
                                <Button>
                                    <p className='product-size-name'>Large</p>
                                    <p className='product-size-inch'>120 by 18 inches</p>
                                </Button>
                            </div>

                            <div className='add-product'>
                                <Button className='product-cart' 
                                onClick={()=>{dispatch(AddCart(ProductDetail));addItem(ProductDetail._id,1)}}>
                                    Add to cart
                                </Button>
                                <br />
                                <Button className='product-wishlist'>Add to wishlist</Button>
                            </div>

                        </div>


                    </div>

                </div></>

        )}

        </div>
        </div>
        </>
    )
}

export default ProductView
