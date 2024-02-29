import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './PaymentCard.css'
// import '../../../node_modules/antd/dist/antd.min.css'
import AxiosInstance from '../../Utils/axios/axiosConfig';

// import PaymentCard from './PaymentCard'
// import {categories} from '../../categories'
function CardTesting() {
  const [categories, setCategories] = useState([]);
  useEffect(() => { getCategories(); }, []);
  const getCategories = async () => {
    const categoryLists = await AxiosInstance.get("/category/list/")

      .then(response => {
        console.log(response.data);
        setCategories(response.data)
        return (response.data)
      }
      )
      .catch(response => {

      })
  console.log('test',categories.categories[0]._id)
  }
  return (
    <DisplayTest categories={categories} />
  )
}

function DisplayTest(props) {
  const { categories } = props
  console.log('props',categories)
  return (

    <div>
      {categories?.categories?.map((item) =>

        <div key={item.index}>{item.name}</div>

      )}

    </div>

  )






}

export default CardTesting