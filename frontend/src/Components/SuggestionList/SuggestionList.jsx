import React from 'react'
import { Link } from 'react-router-dom'
import '../SuggestionList/SuggestionList.css'
import suggestedData from '../../suggestedData.json'
import suggested from '../../Assets/Images/suggestion.svg'
import { HeartOutlined } from '@ant-design/icons';
import { HeartFilled } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { useState,useEffect } from 'react'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { useDispatch } from 'react-redux';  
import { AddCart } from '../../redux/cartSystem';
import { addItem } from '../CartProducts/CartActions/CartAction'
import { getCategoryData } from '../../Utils/axios/axiosRoutes'

function SuggestionList(props){
  const [notLoggedinAsUser,setnotLoggedinAsUser] = useState(false)
  const [quantity,setquantity]=useState(1) 
  const onChange = (value) => {
    setquantity(value)
  };
  const dispatch= useDispatch();
  const {suggestedItemsId}=props
  console.log(suggestedItemsId,'idddddd')
  const [suggestion, getSuggestion] = useState([]);
  useEffect(() => {
    getCategoryData().then(data=>{
    getSuggestion(data)
    SetWishList(data)
    if(!localStorage.getItem('token')||localStorage.getItem('user_role')=='vendor'){  //accessing user role from local storage
      setnotLoggedinAsUser(true)
    }
  }); }, []);
  const [WishList,SetWishList] = useState(suggestion) 
  const [ ,WishListDataEdit ] = useState({
    id: null,
    value: ''
  });
  const wishLists = id => {
    let wish = suggestion?.products?.map(suggestionsItem => {  //wishlist button designing 
      if (suggestionsItem._id === id) {
        suggestionsItem.isComplete = !suggestionsItem.isComplete
      }
    });
    WishListDataEdit(wish)
  };

  //filter functions = .filter(suggestionsItem=>suggestionsItem._id===suggestedItemsId)
  return ( 

    <div className="container">
    <div className="suggestions" >
      {suggestion?.products?.filter(suggestionsItem=>suggestionsItem?.category?._id===suggestedItemsId).slice(0,4).map((suggestionsItem) => {
        return (
        <>

        <div key={suggestionsItem._id} style={{ background: '#FBD3D3' }} className="suggested-products">
            <button className={suggestionsItem.isComplete ? "wishlist-click active" : "wishlist"} 
            type='primary' shape='rectangle' key={suggestionsItem._id} onClick={() => wishLists(suggestionsItem._id)}>
              {suggestionsItem.isComplete ? <HeartFilled /> : <HeartOutlined />}</button>
            <div className="suggested-products-container">
              <Link to={`/products/${suggestionsItem.slug}`}>
              <div className="suggested-products-image">
                <img src={suggestionsItem.productPictures[0].img} alt="products" />
              </div>
              </Link>

              <p>colors</p>
              <button className='color-button1' />
              <button className='color-button2' />
              <button className='color-button3' />
              <button className='color-button4' />
              <button className='color-button5' />
              <p className='product-name'>{suggestionsItem.productName}</p>
              <div className="product-price-tag">
                <p className='product-price-bottom'>₹{suggestionsItem.productPrice}</p>
              </div></div>
              {!notLoggedinAsUser ? (
            <div className="add-to-cart-buttons">
              <div className="item-quantity">
                <p style={{ marginLeft: 20, paddingTop: 10 }}>Quantity:</p>
                <InputNumber style={{ marginLeft: 5, width: 50 }} min={1} max={10} 
                defaultValue={1} initialValues={1} onChange={onChange} />
              </div>
              <Button onClick={()=>{dispatch(AddCart(suggestionsItem));addItem(suggestionsItem._id,quantity)}}>
                Add to Cart
                </Button>
            </div>
              ) : (
                <p style={{display:'none'}}></p>
              )
              }
      
          </div>
          </>)
      }
      )}
    </div>
    </div>
  )
}

export default SuggestionList