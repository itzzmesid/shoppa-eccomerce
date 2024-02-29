import React from 'react'
import './CartProduct.css'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import store from '../../redux/store';
import { useDispatch } from 'react-redux';
import { AddCart, RemoveCart } from '../../redux/cartSystem';
import { Link } from 'react-router-dom';
import EmptyCart from '../../Assets/Images/emptyCart.svg'
import {removeItem} from './CartActions/CartAction'
import { Button } from 'antd';

function CartProducts(props){ 
                                                            //cart products listing
    const dispatch= useDispatch();
    const [tokenId,setTokenId]=useState('')    
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const token = localStorage.getItem('token')
        setTokenId(token)
        await AxiosInstance.get('/cart', { headers: { "Authorization": `Bearer ${token}`} }) 
                                                        
                                                            //getting the cart products of current user
        .then(response => {
            console.log('token', token)
            console.log('cart',response.data)
            response?.data?.cartItems?.map((item)=>        
                                                             //setting the initial state of redux store
            dispatch(AddCart(item))
            )
            setCarts(response.data)
            localStorage.setItem('totalPrice',(response.data.totalPrice))
            console.log('prices',response.data.totalPrice)
            
        }
        )
        .catch(err=>{
            console.log('axios error',err)
        })
       
    };

    const products = useSelector((items)=>items.name)
    console.log("product",products.cartItems)
    return (
       
        <div className="cart-products-view">
            <p>Cart Summary</p>
            {products?.cartItems?.length === 0 ? (
                <div className='empty-cart'>
                <div className='empty-cart-image'>
                    <img src={EmptyCart}/>
                </div>
                 <a href="/">
                <Button>Add some products</Button>
                </a>
                </div>
            
            ) : (

            products?.cartItems?.map((Item) =>
       
                    <div className="cart-products">
                        <select name="quantity" id="quantity" defaultValue={Item.quantity}>
                            {Item.quantity ?( 
                            <><option value={Item.quantity}>{Item.quantity}</option>
                            <option value='1'>3</option>
                            <option value='2'>5</option></>):(<option value='1'>1</option>)}
                            {/* <option key={3} value={Item.quantity}>{Item.quantity}</option> */}
                            
                        </select>
                        <div className="cart-product-image">
                            <img src={Item.productPictures[0].img} alt="cartImage" />
                        </div>
                        <div className="cart-product-details">
                            <p className='cart-product-name'>{Item.productName}</p>
                            <p className='cart-product-height'> </p>
                            <div className="cart-buttons">
                                <button className='card-add'>Add to favourites</button>
                                <button className='cart-remove' 
                                 onClick={()=>{dispatch(RemoveCart(Item));removeItem(Item.productId,Item.quantity,getData)}}>
                                    Remove
                                </button>
                            </div>
                            <p className='cart-product-price'>
                                {Item.productPrice}₹
                                </p>
                        </div>
                    </div>
                )
            )
            }

    </div>
   
     
    )
}

export default CartProducts