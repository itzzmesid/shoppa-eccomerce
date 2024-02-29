import { Form } from 'react-router-dom';
import AxiosInstance from '../../../Utils/axios/axiosConfig';


const onFinish = (values, onSuccess) => {
    console.log('adddd',values);
    alert("address added successfully")
    const token = localStorage.getItem('token')
       AxiosInstance.post('/address', {

        "customerAddress":{
            "address":{
              "recipientName":values.recipientName,
              "unitNumber":values.unitNumber ,
              "addressLine1": values.addressLine1,
              "addressLine2": values.addressLine2,
              "city": values.city,
              "state": values.state,
              "country": values.country,
              "pincode": values.pincode,
              "addressType": values.addressType,
              "phoneNumber": values.phoneNumber
            }
        }
},{ headers: { "Authorization": `Bearer ${token}` } }) //getting the cart products of current user
      .then(response => {
          onSuccess()
          console.log(response)
      })
      .catch(err=>{
          console.log('axios error',err)
      })
  };
  const removeAddress=async(id, onSuccess)=>{
    console.log(id,'id')
        const token = localStorage.getItem('token')
        await AxiosInstance.delete(`/address/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } }) //getting the cart products of current user
        .then(response => {
           console.log(response)
           onSuccess()
        }
        )
        .catch(err=>{
            console.log('axios error',err)
        })
  }

export {onFinish,removeAddress}