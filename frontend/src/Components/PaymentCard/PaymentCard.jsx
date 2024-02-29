import React, { useState } from 'react'
import './PaymentCard.css'
import { Link } from 'react-router-dom'
import info from '../../Assets/Icons/info.svg'
import visaIcon from  '../../Assets/Icons/visa.svg'
import maestroIcon from  '../../Assets/Icons/maestro.svg'
import bitmapIcon from  '../../Assets/Icons/bitmap.svg'
import shieldIcon from  '../../Assets/Icons/shield.svg'
import { useSelector } from 'react-redux'

const PaymentCard = ()=> {
    const[cartButton,setCartButton]=useState(true)
    const[checkoutButton,setCheckoutButton]=useState(true)
    const total = localStorage.getItem('totalPrice')  //accessing totalcart price from local storagegit 
    const products = useSelector((items)=>items.name)
    console.log("product",products.cartTotalPrice)
  return (
    <div className='payment-card'>
        <div className="payment-cards">
            <table>
                <tbody>
                    <tr>
                        <td>
                            Total
                        </td>
                       <td className='price-tag'>
                       ₹{total}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Shipping
                        </td>
                        <td className='price-tag'>
                        ₹0
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tax
                        </td>
                        <td className='price-tag'>
                        ₹0
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className='price-tag'>subtotal</p>
            <p className='total-price'>
            ₹{total}
            </p>
            <hr />
            <div className="info">
                <div className="info-icon"><img src={info} alt="info" /></div>
                <div className="info-text"><p >Price Additional shipping rate may apply on checkout</p></div>

            </div>
            <div className="payment-card-buttons">
            <Link to='/cart/address'>
                <button className={checkoutButton && cartButton ? "cart-show active" : "cart-buy"}> Proceed to buy 
                </button>
            </Link>
                <button className="checkout">Proceed to Checkout</button>
            </div>
            <div className="credit-cards">
                <p>we accept</p>
                <img src={visaIcon} alt="accept" />
                <img src={maestroIcon} alt="accept" />
                <img src={bitmapIcon} alt="accept" />

            </div>
            <div className="secure">
                <img src={shieldIcon} alt="secure" />
                <p>100% secure</p>
            </div>
        </div>

    </div>
  )
}

export default PaymentCard