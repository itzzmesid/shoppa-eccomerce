import React, { useEffect } from 'react'                                    //Common layout used for the vendor side
import VendorHeader from '../../Components/vendorHeader/vendorheader'
import Sidebar from '../../Components/Sidebar/sidebar'
import Footer_divider from '../../Components/footer_divider/footer_divider'
import Footer_end from '../../Components/Footer_end/footer_end'
import {useNavigate, Outlet} from 'react-router-dom'
import './vendorPage.css'


export default function VendorPage() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('user_role')!='vendor'){
        navigate('/')
    }
  },[])
  return (
    <div>
        <VendorHeader/>
           
        <div className='vendor-content'>
        <Sidebar/>
        
            <div>
                <Outlet/>                           {/*Vendor Side content that keeps changing depending on what the user clicks */}
            </div>
        
        </div>
        <div className='footer-divider-vendor-page'>  
            <Footer_divider/>                        {/*Divides content from the footer */}
        </div>
        <div className="container">
        <div className='vendor-footer-end'>
            <Footer_end/>
        </div>
       </div>
    </div>
  )
}
