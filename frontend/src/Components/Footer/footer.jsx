import React from 'react'
import './footer.css'
import footer_bag from '../../Assets/Images/shoppa_main.svg'
import facebook from '../../Assets/Icons/facebook.svg'
import twitter from '../../Assets/Icons/twitter.svg'
import linkedin from '../../Assets/Icons/linkedin.svg'
import dribble from '../../Assets/Icons/dribble.svg'
import Footer_end from '../../Components/Footer_end/footer_end'
import Footer_divider from '../footer_divider/footer_divider'

export default function Footer() {
  return (
    <div className='footer'>
        <Footer_divider/>                                     {/*Divides the footer from the rest of the page*/}
        <div className="container">                              

        <div className='footer-body'>
          <div className='footer-starting'>                   {/*Starting of the footer*/}
             <img src={footer_bag} className='footer-bag'/>
             <p>Cricklewood,London<br></br> NW2 6qg, Uk</p>
             <div className='social-media-icons'>
                <img src={facebook}/>
                <img src={twitter}/>
                <img src={linkedin}/>
                <img src={dribble}/>
             </div>
          </div>
          <div className='footer-navigations'>
            <div className='shop-column'>
                <a href='' className='footer-headings'>Shop</a>
                <div className='shop-column-contents'>
                    <a href=''>Gift cards</a>
                    <a href=''>Site map</a>
                    <a href=''>Polka blog</a>
                    <a href=''>Login</a>
                    <a href=''>Sign in</a>
                </div>
            </div>
            <div className='sell-column'>
                  <a href='' className='footer-headings'>Sell</a>
                      <div className='sell-column-contents'>
                          <a href=''>Sell on Polka</a>
                          <a href=''>Teams</a>
                          <a href=''>Forums</a>
                          <a href=''>Affiliates</a>
                      </div>
                  </div>
            <div className='about-columns'>
                    <a href='' className='footer-headings'>About</a>
                        <div className='about-column-contents'>
                            <a href=''>Polka, Inc.</a>
                            <a href=''>Policies</a>
                            <a href=''>Investors</a>
                            <a href=''>Careers</a>
                            <a href=''>Press</a>
                        </div>
                    </div>
            <div className='help-column'>
                      <a href='' className='footer-headings'>Help</a>
                          <div className='help-column-contents'>
                              <a href=''>Help Center</a>
                              <a href=''>Trust and safety</a>
                              <a href=''>Privacy settings</a>
                          </div>
              </div>  
            </div>
        </div>
        <Footer_end/>               
    </div>
    </div>
  )
}
