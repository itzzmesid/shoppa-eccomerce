import {React,useEffect,useState} from 'react'
import '../../Components/vendorPageLayout/vendorPage.css'
import invoice from '../../Assets/Icons/invoice.svg'
import './orderstatus.css'
import { Select,Steps} from 'antd'
import { SlOptions } from "react-icons/sl";
import { IoMdRadioButtonOn } from "react-icons/io";
import AxiosInstance from '../../Utils/axios/axiosConfig'

export default function OrderStatusPage() {
    const [orderDetails,setorderDetails]=useState()
    const [orderId,setorderId]=useState()                       //To store order ID
    const [productName,setProductName]=useState()
    const [productQty,setproductQty]=useState()
    const [orderChoice,setOrderChoice]=useState();              //To determine the status(Packed,shipped,etc)        

    useEffect(()=>{
        const id=localStorage.getItem('OrderId')
        if(id){
            setorderId(id)
            getData();
        }
    },[])
    const getData = async () => {
        const token = localStorage.getItem('token')
         await AxiosInstance.get('/vendor/orders', {headers: {"Authorization" : `Bearer ${token}`} })   //Getting order details from server
        .then(response=>{
        //   console.log(response.data);
          setorderDetails(response.data)
        //   response.data.nonEmptyOrders.map(row=>{
        //     return(
        //         setProductName(row.detailHeader)
        //     )
        //   })
            
        })
}
     
    const orderStatusOptions = [                    //Order status options
        {value:0,label:'Packed'},
        {value:1,label:'Shipped'},
        {value:2,label:'Out for delivery'},
        {value:3,label:'Delivered'}
    ]
    const saveStatus = async () =>{
    //   if(localStorage.getItem('orderstatus')){
    //     localStorage.removeItem('orderstatus')
    //     localStorage.setItem('orderstatus',orderChoice)
    //   }
    //   else{
    //     localStorage.setItem('orderstatus',orderChoice)
    //   }
   
    var orderStatus='';
    if(orderChoice===0){
        orderStatus='Packed'
    }
    else if(orderChoice===1){
        orderStatus='Shipped'
    }
    else if(orderChoice===2){
        orderStatus='Out for Delivery'
    }
    else if(orderChoice===3)
    {
        orderStatus='Delivered'
    }
    console.log(orderStatus);
    const token = localStorage.getItem('token')
    const getOrderStatus = await AxiosInstance.post(`/order/status-update?orderId=${orderId}&orderStatus=${orderStatus}`
    ,{ headers: { "Authorization": `Bearer ${token}` } })
    .then(res=>{
        console.log(res.data);
    })
    }
    
  return (
    
    <div>
            <div className='vendor-orderstatus-content'>                                        
                <div className='main-orderstatus-content'>
                    <p className='order-page-heading'>Order 2322</p>
                    <p style={{fontSize:'10px',color:'#3E3E3E'}}>Seller0001 > store01 > order 2322</p>  
                    <div className='order-cards-top'>
                        <div className='order-details'>
                            <div className='order-details-content'>
                                <div className='order-data'>
                                <h2>Order Details</h2>
                                <p>Order Id</p>       
                                <p>Product</p> 
                                <p>Date</p> 
                                <p>Ordered by</p> 
                                <p>Units</p> 
                                <p>Payment</p> 
                                <p>Delivery Address</p>    
                                </div>  
                                <div className='order-data-results'>
                                {orderDetails?.nonEmptyOrders?.filter(item=>item._id===orderId).map(item=>         //Display details of particular order ID
                                <div>
                                     <p>{item._id}</p>
                                        
                                     <p style={{textDecoration:'underline',color:'#F79320'}}>{item.cartItems.map(nice=>nice.productName)}</p> 
                                     
                                     <p>{item.createdAt}</p> 
                                     <p>{item.userName}</p> 
                                     <p>{item.cartItems.map(prod=>prod.quantity)}</p> 
                                     <p>{item.paymentMode}</p> 
                                     <p>Delivery Address</p>
                                </div>
                                
                                )}
                                </div>
                               
                            </div>
                               
                        </div>
                        <div className='invoice'>
                            <div className='invoice-data'>
                                <h2>Invoice</h2>
                                <p>Recipient</p>
                                <p>Invoice no.</p>
                                <p>Invoice date</p>
                            </div>
                            <div className='invoice-data-results'>
                                <p>Nice</p>
                                <p>Nice</p>
                                <p>Nice</p>
                            </div>
                            <img src={invoice} className='invoice-image'/>
                        </div>
                    </div>
                    <div className='order-cards-bottom'>
                        <div className='order-status'>
                            <h2>Order Status</h2>
                            <Steps
                            labelPlacement="vertical" 
                            current={orderChoice}
                            style={{
                                width:'90%',
                            }}
                            className='status-progress-bar'
                            items={[
                                {
                                    icon:<IoMdRadioButtonOn className='radio-icon'/>,
                                    description:'',
                                    title:'Packed',
                                    
                                    
                                },
                                {
                                    description:'',
                                    title:'Shipped',
                                    icon:<IoMdRadioButtonOn className='radio-icon'/>,
                                },
                                {
                                    description:'',
                                    title:'Out for Delivery',
                                    icon:<IoMdRadioButtonOn className='radio-icon'/>,
                                },
                                {
                                    description:'',
                                    title:'Delivered',
                                    icon:<IoMdRadioButtonOn className='radio-icon'/>,
                                },
                            ]}
                            ></Steps>
                            <Select defaultValue='UPDATE STATUS'
                             
                             className='update-status-button'
                            onChange={ (count) => setOrderChoice(count) } 
                            options={orderStatusOptions}

                            />
                            <div className='order-status-buttons'>
                                <button className='discard-button'>Discard</button>
                                <button onClick={saveStatus} className='save-changes-button'>Save Changes</button>
                            </div>
                        </div>
                        <div className='empty-box'>
                            <SlOptions className='options-icon'/>
                        </div>
                    </div>
                   
                </div>
                

            </div>
        </div>
  )
}
