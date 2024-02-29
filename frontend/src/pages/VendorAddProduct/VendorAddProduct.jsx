import React from 'react'
import AddProductsForm from '../../Components/AddProductsForm/AddProductsForm'
import './VendorAddProduct.css'

function VendorAddProduct() {
  return (
    <div>
    <div className='vendor-add-products'>
        <p>Add Product</p>
        <p className='product-path'>item - item-item</p>
        <AddProductsForm/>
        
    </div>
    </div>
  )
}

export default VendorAddProduct