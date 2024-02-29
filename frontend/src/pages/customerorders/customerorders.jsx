import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/footer'
import Header from '../../Components/Header/header'
import cartImage from '../../Assets/Images/cart-product.svg'
import './customerorders.css'
import { useNavigate } from 'react-router-dom'
import AxiosInstance from '../../Utils/axios/axiosConfig'

export default function Customerorders() {
  const [orderStatusNo,setOrderStatusNo] = useState('Not updated')
  const [orderStatus,setOrderStatus]=useState('Not updated')
  const [orders,setOrders]=useState()
//   const getOrderStatus = () => {
    
//   }
  const getData = async () =>{
    const token = localStorage.getItem('token')                                                 
    await AxiosInstance.get('/account/order-history',{headers: {"Authorization" : `Bearer ${token}`} })       //API call to get customer order history
    .then(res=>{
        // console.log(res.data);
        setOrders(res.data)
    })

  }
  useEffect(()=>{
    getData()
  },[])
  console.log(orders);
  return (
    <div>
        <Header/>
        
        <div className='customer-orders'>
        <div className="container">
        <div className="cart-products-view"> 
                    <p>Order Summary</p>
                  

                    {orders?.order?.map(item=>                    //Displaying the orders
                            item.cartItems.map(row=>
                    <div className="cart-products"> 
                        <div className="cart-product-image">
                          {row.productPictures.map(item=>
                            <img src={item.img} alt="cartImage" />
                            )}
                        </div>
                          
                        <div className="cart-product-details">
                            <p className='cart-product-name'>{row.productName}</p>                          
                            <p className='order-product-price'>${row.productPrice}</p>
                            <p>Order Status:<span className='order-status-display'>{orderStatus}</span></p>
                        </div>
                      
                    </div>
                     ) )}
                    
                    {/* // <div className="cart-products">                     
                    //     <div className="cart-product-image">
                    //         <img src={cartImage} alt="cartImage" />
                    //     </div>
                    //     <div className="cart-product-details">
                    //         <p className='cart-product-name'>North wolf bag</p>                            
                    //         <p className='order-product-price'>9000$</p>
                    //         <p>Order Status:<span className='order-status-display'>{orderStatus}</span></p>
                    //     </div>
                    // </div>
                    // <div className="cart-products">                       
                    //     <div className="cart-product-image">
                    //         <img src={cartImage} alt="cartImage" />
                    //     </div>
                    //     <div className="cart-product-details">
                    //         <p className='cart-product-name'>North wolf bag</p>                            
                    //         <p className='order-product-price'>9000$</p>
                    //         <p>Order Status:<span className='order-status-display'>{orderStatus}</span></p>
                    //     </div>
                    // </div> */}
                    
                </div>
                </div>
        
    </div>
    <Footer/>
    </div>
  )
}
