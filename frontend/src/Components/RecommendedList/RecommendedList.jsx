import React from 'react'
import { useState, useEffect } from 'react'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import '../RecommendedList/RecommendedList.css'
import imgs from '../../Assets/Images/reccomended.svg'
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getCategoryData } from '../../Utils/axios/axiosRoutes';
function RecommendedList() {
  const [recommended, setRecommended] = useState([]);
  
  useEffect(() => {
                                          //get request for access category list
       getCategoryData()
      .then(response => {
        setRecommended(response)
      }
      )
    ;
   
  }, []);

  const settings = {                       //settings for slider
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };
  return (
    <>
      <div className="container">
      <div className="recommended">
        <p className='recommended-head'>Find things you'll love. Support independent sellers.</p>
        <p className='recommended-polka'>Only on polka.</p>
        <div className="recommended-products-carousel">
          <Slider {...settings}>
            {recommended?.categories?.filter(recommendedItem => recommendedItem.parentId).slice(0,9).map(recommendedItem =>

              <div className="recommended-products-main">
                <div className='recommended-products'>

                  <div className="recommended-products-image">
                    <img src={recommendedItem.categoryImage} alt="" />
                  </div>
                  <div className="item-name">
                    <p className='recommended-product-name'>{recommendedItem.name}</p>
                  </div>
                </div>
              </div>
            )}
          </Slider>
          </div>
      </div>
      <div>
      </div>
      </div>
    </>

  )
}


export default RecommendedList