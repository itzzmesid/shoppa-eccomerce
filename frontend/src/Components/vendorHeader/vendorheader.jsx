//Header component of vendor UI

import React, { useState,useEffect } from 'react'                     
import './vendorheader.css'
import main_logo from '../../Assets/Images/shoppa_main.svg'
import user from '../../Assets/Images/user.svg'
import { Link} from 'react-router-dom'
import {Dropdown} from 'antd'
import {useNavigate} from 'react-router-dom'

export default function Vendorheader() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token')
    localStorage.removeItem('user_role')
    navigate('/login');
}
  const [vendorName,setvendorName] = useState('Account')        //To display vendor name on the header
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setvendorName(localStorage.getItem('username'))
    }
    else{
      navigate('/login')
    }
  },[])
  const items = [                         //Dropdown in the header to navigate to profile and/or logout
    {
        label:(
            <a href=''>Profile</a>
        ),
        key:'1'
    },
    {
      label:  (
        <a onClick={handleLogout}>Logout</a>
     ),
    key: '2' 
    },
  ]
  const goHome = () =>{
    navigate('/')
}
  return (
    <div className='vendor-page-header'>
      
        <div>
           <img src={main_logo} className='vendor-header-logo' onClick={goHome}/>
        </div>
        <div className='vendor-header-end'>
         
           <button className='add-product-button'> <Link to="addproduct" >Add Product</Link></button>   {/*Button to add product */}
           <div className='Account-link-vendor'>
                <img src={user} className='header-images'/>
                <Dropdown menu={{ items }}>
                    <a>{vendorName}</a>
                </Dropdown>
            </div>
        </div>
    </div>
  )
}
