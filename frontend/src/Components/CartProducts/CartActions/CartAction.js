import AxiosInstance from '../../../Utils/axios/axiosConfig';
const removeItem= async (itemId,quantity,onSuccess)=>{
    const token = localStorage.getItem('token')
    await AxiosInstance.delete(`/cart?quantity=${quantity}&productId=${itemId}`,
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
const addItem= async (itemId,quantity)=>{
    const token = localStorage.getItem('token')
    await AxiosInstance.post(`/cart/add-to-cart/?productId=${itemId}`,{
        "cartItems" : {
            "quantity" :quantity
        }
},
    { headers: { "Authorization": `Bearer ${token}` } }) //getting the cart products of current user
    .then(response => {
       console.log(response)
    }
    )
    .catch(err=>{
        console.log('axios error',err)
    })

}
export {removeItem,addItem}