import {React,useEffect} from 'react'
import HandPickedItems from '../../Components/HandPickedItems/HandPickedItems'
import PaymentCard from '../../Components/PaymentCard/PaymentCard'
import Header from '../../Components/Header/header'
import Footer from '../../Components/Footer/footer'
import CartProducts from '../../Components/CartProducts/CartProducts'
import {useNavigate} from 'react-router-dom'
function Cart() {
    const username = localStorage.getItem('username')

    const navigate=useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    return (
        <>
        <Header/>
        <div className='cart-page'>
            <div className="container">
            <div className="cart-items">
                <p className="product-path">{username}</p>
                <div className="cart-summary">
                <CartProducts/>
                <div className='payment-card-view'>
                    <PaymentCard />
                </div>
                </div>
            </div >
            <div className="recent-views">
                <p>You viewed these item recently</p>
                <HandPickedItems />
            </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default Cart