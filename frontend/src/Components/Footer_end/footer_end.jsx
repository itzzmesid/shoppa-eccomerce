import React from 'react'
import ScrollToTop from 'react-scroll-to-top'
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import './footer_end.css'
export default function footer_end() {
  return (
    <div className='footer-end'>                                        
         <div className='copyright'>
                  <AiOutlineCopyrightCircle className='copyright-icon'/> 
                  <p>2022 Commerce, Inc.</p>
         </div>
              <div className='footer-links'>
                  <a href=''>Privacy</a>
                  <a href=''>Terms of use</a>
                  <a href=''>Cookies</a>
            </div>
            <div>
                <p className='scroll-text'>Scroll to top</p>
                <ScrollToTop smooth/>
            </div>  
            
    </div>
  )
}
