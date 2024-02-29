import { React, useState,useEffect } from 'react'
import { Table,Popover,Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SlOptions } from "react-icons/sl";
import AxiosInstance from '../../Utils/axios/axiosConfig';
import {Link} from 'react-router-dom'
import noOrder from '../../Assets/Images/emptycart2.svg'
import './vendororder.css'
import {useNavigate} from 'react-router-dom'


const content = (                                                     //options for order table popover
  <div>                                                                 
    <Link to='orderstatus' style={{color:'black'}}>Edit</Link><br/>
    <a style={{color:'black'}}>Disable</a><br/>
    <a style={{color:'red'}}>Delete</a>
  </div>
)

const columns =[
  {
  title:'Order Id',
  dataIndex:'orderid',
  },
  {
    title:'Product',
    dataIndex:'product',
  },
  {
    title:'Date',
    dataIndex:'date',
  },
  {
    title:'Ordered by',
    dataIndex:'customer',
  },
  {
    title:'Units',
    dataIndex:'units',
  },
  {
    title:'Payment',
    dataIndex:'payment',
  },
  {
    title:'Order Status',
    dataIndex:'status',
    render: (text) => {
      let color='brown'
      if (text === 'pending') {
        color = 'orange';
      }
      if (text === 'shipped') {
        color = 'green';
      }
      if (text === 'initiated') {
        color = 'blue';
      }
      return(<div><Tag className="product-tag-style" color={color}>{text}</Tag> </div>);
      
    }
  },
  {
    title:'',
    dataIndex:'actions',
    render:(record)=>{
      return (
      <>
        <Popover
          content={content}
          trigger='hover'>
            <SlOptions/>
        </Popover>
      </>
      )
    },
  },       
]
export default function Vendororder() {
  const [orderExistence,setOrderExistence]=useState(null)
  const [noOrderMessage,setnoOrderMessage]=useState()
  const [orderList,getOrderList] = useState([{}]);
  const navigate=useNavigate()
  
  useEffect( () => {
    localStorage.removeItem('OrderId')
    if(localStorage.getItem('user_role')!='vendor'){        
      navigate('/')                             //Redirect to user landing page if not vendor
  }                 
  else{
    getData();
  }
  },[])
  const getData = async () => {
    const token = localStorage.getItem('token')
     await AxiosInstance.get('/vendor/orders', {headers: {"Authorization" : `Bearer ${token}`} })
    .then(response=>{
      console.log(response.data);
      if(response.data.message==="You don't have any active orders yet"){           //Implies there are no orders for this vendor
        setOrderExistence(1)
        setnoOrderMessage(response.data.message)
      }
      const v=[]
      response.data.nonEmptyOrders.map(row=>{                             //Order details are stored into array as key:value pairs
        return (v.push({
                key:row._id,
                orderid:row._id,
                product:row.cartItems.map(item=>item.productName),
                date:row.createdAt,
                customer:row.userName,
                units:row.cartItems.map(item=>item.quantity),
                payment:row.paymentMode,
                status:row.orderStatus,
                  })
        )
      })
      getOrderList([...v])    //Order details are stored in the state
      
    })
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);         //state to determine whether a row is selected or not

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    
  };
  const setOrderId=()=>{
    if(selectedRowKeys){
      localStorage.setItem('OrderId',selectedRowKeys[0])
    }
  }
  useEffect(()=>{
    localStorage.setItem('OrderId',selectedRowKeys[0])
  },[selectedRowKeys])
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  
  return (
    <div className='vendor-order-content'>
       { orderExistence === 1 ? (                               
        <div className='no-product'>
          <img src={noOrder} className='no-product-image'/><br/>          {/*To display when there is no order*/}
          <p style={{fontSize:'20px'}}>{noOrderMessage}</p> 
        </div>
      ) : (
      <div>
      <div className='order-search-bar'>
            <SearchOutlined className='vendor-search-icon'/>
            <input type='text' placeholder='Search orders'></input>
       </div>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table 
               rowSelection={rowSelection}
               columns={columns} 
               dataSource={orderList} 
               title={() => 'Orders'}
               className='order-table' />
      </div>
      )
        }
    </div>
  )
}

