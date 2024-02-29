import React, { useState,useEffect } from 'react'
import './ProductDescription.css'
import reviewData from '../../reviewdata.json'
import userReview from '../../Assets/Images/review-user.svg'
import productData from '../../product-details.json'
import specData from '../../tech-detail.json'
import HandPickedItems from '../../Components/HandPickedItems/HandPickedItems'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../../Utils/axios/axiosConfig';


function ProductDescription() {
    const {slug}= useParams()
    const[index,setIndex]= useState(0) //tabs setting for product details and for review sections
    const action=(index)=>{
        setIndex(index)
        console.log(index)
    };
    const [product, setProducts] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {     //get request for accessing product details
     await AxiosInstance.get("/product/")
    .then(response => {
  
        setProducts(response.data)
        console.log('product description',response.data)     
    },
    
    )
    .catch(err=>
        console.log('errors',err))
    }
  return (
    <>
    <div className="container">
    <div className='product-description'>
          <div className='about-product'>
              <div className="about-product-button">
                <button className={index===0 ? "about-product-buttons-click active" : "about-product-buttons"} 
                onClick={() =>setIndex(0)}>About this Item</button>
              <button className={index===1 ? "about-product-buttons-click active" : "about-product-buttons"} 
              onClick={() =>setIndex(1)}>Customer Reviews</button>
          </div>
          <div className='about-item' hidden={index !=0 }>
          {product?.getActiveProducts?.filter(ProductDetail => ProductDetail.slug === slug).map(ProductDetail =>

                ProductDetail?.productDescription?.description?.map(description=>
            <ul>
                <li>
                    {description}
                </li>
            </ul>
            ))}

      </div>
          <div className='about-item' hidden={index !=1 }><select>
                <option className='options' value="recent">
                    <a  href=""> recent</a></option>
                <option value="recent">
                    <a href="">recent</a>
                    </option>
                <option value="recent">
                    <a href="">recent</a>
                    </option>
            </select>
              {reviewData.map((review) => {
        return (
            <>
            
            <div className='review-users'>
            <div className='review-users-img'>
                <img src={userReview} alt="" />
                </div><div className='review-users-details'>
            <p className='review-user-name'>By  {review.name}</p>
            <p>{review.date}</p>
            <p className='review-user-comment'>
                {review.description_head}
            </p>
            <p>
                {review.description_content}
            </p>
            </div></div>
            </>
        )})}
          </div>

      </div>
      <div className="technical-details">
        <p>Technical Details</p>
        {product?.getActiveProducts?.filter(ProductDetail => ProductDetail.slug === slug).map(ProductDetail =>
                    ProductDetail?.product_spec?.key?.map((spec,index)=>{
                        const value = ProductDetail?.product_spec?.value[index];
                        return(
            <table>
                <tbody>
                    <tr>
                        <td className='spec'>
                            {spec}
                        </td>
                        <td className='spec-cont'>{value}</td>
                    </tr>
                </tbody>
            </table>
)}))}
          </div>
          
    </div>
    <div className="product-suggetions-carousel">
        <div className="suggestion-head">
            <p className='suggestion-head'>
                You may also like
            </p>
            <p className='suggestion-polka'>
                only on polka
            </p>
            </div>
            <HandPickedItems/>
          </div>
          </div>
      </>
  )
}

export default ProductDescription