import React from 'react'
import ProductDescription from '../../Components/ProductDescription/ProductDescription'
import ProductView from '../../Components/ProductView/ProductView'
import Header from '../../Components/Header/header'
import Footer from '../../Components/Footer/footer'
import { useParams } from 'react-router-dom'
import { ConsoleSqlOutlined } from '@ant-design/icons'

function ProductDetails() {
  const {id}=useParams()
  return (
        <>
        <Header/>
        <ProductView />
        <ProductDescription />
        <Footer/>

        </>

  )
}

export default ProductDetails