import React from 'react'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { Button, InputNumber } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';
import '../HandPickedItems/HandPickedItems.css'
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { AddCart } from '../../redux/cartSystem';
import { addItem } from '../CartProducts/CartActions/CartAction';
import { getCategoryData } from '../../Utils/axios/axiosRoutes';
 
function HandPickedItems() {
  const [notLoggedinAsUser,setnotLoggedinAsUser] = useState(false)
  const [quantity,setquantity]=useState(1)
  const onChange = (value) => {
    setquantity(value)
  };
  
  const dispatch= useDispatch();
  const [handPicks, setHandPicks] = useState([]);
  useEffect(() => {
    getCategoryData().then(response => {
    // console.log(response.data);
    setHandPicks(response)
    SetWishList(response)
    if(!localStorage.getItem('token')||localStorage.getItem('user_role')==='vendor'){
      setnotLoggedinAsUser(true)
    }
  }
  
  ) ; }, []);
  const [WishList,SetWishList] = useState(handPicks)
  const [ ,WishListDataEdit ] = useState({
    id: null,
    value: ''
  });
  const wishLists = id => {
    let wish = handPicks?.products?.map(handPickedItem => {
      if (handPickedItem._id === id) {
        handPickedItem.isComplete = !handPickedItem.isComplete
      }
    });
    WishListDataEdit(wish)
    
  };
    const settings = { //slider for hand picked products
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };
  return (
<div className="container">
    <div className='hand-picked'>
       <Slider {...settings}>
       {handPicks?.products?.filter(handPickedItem=>handPickedItem.isActive!==false).map((handPickedItem) => {
        return (
          <>
          <div key={handPickedItem._id} className="handpicked-products">
            <button className={handPickedItem.isComplete ? "wishlist-click active" : "wishlist"} type='primary' shape='rectangle' key={handPickedItem._id} onClick={() => wishLists(handPickedItem._id)}>
              {handPickedItem.isComplete ? <HeartFilled /> : <HeartOutlined />}
            </button>
            <div className='handpicked-products-container'>
            <Link to={`/products/${handPickedItem.slug}`}>
            <div className='hand-picked-item-image'>
              <img src={handPickedItem.productPictures[0].img} alt="products" />
            </div></Link>
            <p className='product-name'>{handPickedItem.productName}</p>
            <div className="product-price-tag">
              <p className='product-price-bottom'>₹{handPickedItem.productPrice}
              </p>
              </div>
          </div>
          {!notLoggedinAsUser ? (
          <div className="add-to-cart-buttons">
              <div className="item-quantity">
                <p style={{ marginLeft: 20, paddingTop: 10 }}>Quantity:</p>
                <InputNumber style={{ marginLeft: 5, width: 50 }} min={1} max={10} initialValues={1} 
                defaultValue={1} onChange={onChange} />
              </div>
              
              <Button onClick={()=>{dispatch(AddCart(handPickedItem));addItem(handPickedItem._id,quantity)}}>Add to Cart</Button>
            </div>
          ) : (
            <p style={{display:'none'}}></p>
          )
       }
          </div>
            </>
            )
          }
          )}
      </Slider>
    </div>
  </div>
  )
}
export default HandPickedItems