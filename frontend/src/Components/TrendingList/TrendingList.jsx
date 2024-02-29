import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../../Components/TrendingList/TrendingList.css'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { getCategoryList } from '../../Utils/axios/axiosRoutes';

function TrendingList() {
  const [categories, getCategories] = useState([]);
  useEffect(() => {
    getCategoryList().then(data=>{
      getCategories(data)
    });
  }, []);
  return (

    <div className='container'>
      <div className="trending">
        {categories?.categories?.filter(item => !item.parentId).slice(1, 4).map(item =>


         
            <div className="trending-box"
              style={{ backgroundImage: "url(" + item.categoryImage + ")", backgroundSize: 'cover' }}>
               <Link to={`/shop/${item.name}`}><p className='trends-text'>{item.name}</p> </Link>
            </div>
         
        )}
      </div>
    </div>

  )
}

export default TrendingList
