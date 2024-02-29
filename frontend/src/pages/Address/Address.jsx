import {React,useEffect} from 'react'
import AddressDetails from '../../Components/AddressDetails/AddressDetails'
import PaymentCard from '../../Components/PaymentCard/PaymentCard'
import Header from '../../Components/Header/header'
import Footer from '../../Components/Footer/footer'
import {useNavigate} from 'react-router-dom'

function Address() {
  const username = localStorage.getItem('username')
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
},[])
  return (
    <div>
        <Header/>
        <div className="container">
        <div className="address">
                <p className="product-path">{username}</p>
                <div className="delivery-address">
                <AddressDetails/>
                
                <div className='payment-card-view'>
                    <PaymentCard  />
                </div>
                </div>
            </div >
            </div>
            <Footer/>
    </div>
  )
}

export default Address