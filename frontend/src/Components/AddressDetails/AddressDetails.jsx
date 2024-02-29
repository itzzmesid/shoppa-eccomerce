
import phoneIcon from '../../Assets/Icons/phone.svg'
import Add from '../../Assets/Icons/add.svg'
import React, { useState, useEffect } from 'react'
import AxiosInstance from '../../Utils/axios/axiosConfig';
import './AddressDetails.css'
import AddressForm from './AddressForm'
import addressImg from '../../Assets/Images/address.svg'
import {removeAddress} from './AddressActions/AddressActions'
import { Button } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';


function AddressDetails() {

  const [border, setBorder] = useState('') //border of default address
  const [addressForm,setAddressForm ]=useState([]) //stores the address form values
  const chooseAddress = (addressForm) => {
    setAddressForm(addressForm);
  };
  const [address, setAddress] = useState(false) //address form display
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    getAddress();
  }, [])
  const getAddress = async () => {

    const token = localStorage.getItem('token')
    await AxiosInstance.get('/address', { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        setAddressList(response.data)
        
      })
  };
  console.log('address', addressList.data);
  const [bordercolor, setBorderColor] = useState({
    id: null,
    value: ''
  })

  const borderColors = (e, id) => { //setting border for checked radio button
    let selected = addressList?.data?.map(add => {
      if (e.target.checked===true && add._id===id) {
        add.isComplete = true
      }
      else {
        add.isComplete = false
      }
    });
  setBorder(selected)
  }
  const addAddress = () => {
    setAddress(!address)
    console.log("click")
  }
  return (
    <div className='address-details'>
      <p>
        Delivery Adress
      </p>
      <Link to="/cart"><Button><ArrowLeftOutlined />back to Cart</Button></Link>
      {addressList?.data?.length===0 ? ( //checking address is empty 
                <div className='empty-cart'>
                <div className='empty-cart-image'>
                    <img src={addressImg}/>
                </div>
                </div>
            
            ) : (
      <div className="address-main">
        {addressList?.data?.map(add =>
          <div key={add._id} className={add.isComplete ? "address-field active" : "address-field-border"}>
            <div className='place'>
              <p>{add.addressType}</p>
              </div>
            <input defaultChecked ={true} key={add._id} type="radio"
              className="option-input radio"
              name="address"
              
              onClick={(e) => { borderColors(e, add._id) }} />
            <label >
              <div className="address-content">
                <p className='user-name'>{add.recipientName}</p>
                <p>{add.unitNumber} {add.addressLine1}</p>
                <p>{add.addressLine2}</p>
                <div className="contact"><img src={phoneIcon}></img>
                  <p>{add.phoneNumber}</p></div>
                <div className="address-edit-buttons">
                  <button className='edit-address'>Edit</button>
                  <button className='remove-address'onClick={()=>{removeAddress(add._id, getAddress)}}>Remove</button>
                </div>
              </div>



            </label>
          </div>
        )}

      </div>
            )}
      <div className="add-address">
        <div>
          <Button className='add-address-button' onClick={() => { addAddress() }}>
            <img src={Add} alt="" />
            Add new Address
          </Button>
        </div>
        <div className={address ? "address-form-display active" : "address-form"}>
          <AddressForm addAddress={addAddress} getAddress={getAddress} chooseAddress={chooseAddress} /> 
        </div>
      
      </div>
    </div>
  )
}

export default AddressDetails