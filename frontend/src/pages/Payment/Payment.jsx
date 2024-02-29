import {React,useEffect} from 'react'
import PaymentDetails from '../../Components/PaymentDetails/PaymentDetails'
import PaymentCard from '../../Components/PaymentCard/PaymentCard'
import Header from '../../Components/Header/header'
import Footer from '../../Components/Footer/footer'
import {useNavigate} from 'react-router-dom'

function Payment() {
  const username = localStorage.getItem('username')

  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
},[])
  return (
    <div>
        <div>
        <Header/>
        <div className="container">
        <div className="address">
                <p className="product-path">{username}</p>
                
                <div className="payment-details">
                <PaymentDetails/>
                <div className='payment-card-view'>
                    <PaymentCard/>
                </div>
                </div>
            </div >
            </div>
            <Footer/>
    </div>
    </div>
  )
}

export default Payment