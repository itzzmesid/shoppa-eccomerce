import React, { useEffect, useState } from 'react'
import { Popover, Table,Form,Input,InputNumber,Tag } from 'antd'
import './vendorProduct.css'
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'react-moment';
import { SlOptions } from "react-icons/sl";
import AxiosInstance from '../../Utils/axios/axiosConfig';
import noProduct from '../../Assets/Images/No-product.svg'
import { useNavigate } from 'react-router-dom';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const content = (                                         //Table popover content
  <div>
    <a style={{color:'black'}}>Edit</a><br/>
    <a style={{color:'black'}}>Disable</a><br/>
    <a style={{color:'red'}}>Delete</a>
  </div>
)
const columns =[
  {
    title:'Product Id',
    dataIndex:'productid',
    render: (text) => {return <div className="text">{`#${text}`}</div> }
  },
  {
    title:'Product',
    dataIndex:'productname',
    // render:(productname) => {
    //   return <div className="productname">{productname}</div>
    // }
  },
  {
    title:'Date',
    dataIndex:'date',
    
  },
  {
    title:'Stock',
    dataIndex:'stock',
  },
  {
    title:'Price',
    dataIndex:'price',
    render:(text) => {return<div>{`$${text}`}</div>},
  },
  
  {
    title:'',
    dataIndex:'changes',
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


export default function Vendorproduct() {
  const [form] = Form.useForm()
  const [productList,setProductList] = useState();
  const [productExistence,setProductExistence]=useState(null)
  const [noProductMessage,setnoProductMessage]=useState()
  const navigate=useNavigate()
  useEffect( () => {
    if(localStorage.getItem('user_role')!='vendor'){
      navigate('/')                                   //Redirecting if not a vendor
  }else{
    getData();
  }
  },[])
  const getData = async () => {
    const token=localStorage.getItem('token')
     await AxiosInstance.get('vendor/list-products/',{headers: {"Authorization" : `Bearer ${token}`} })   /*Getting product details from server*/
    .then(response=>{
      console.log(response.data);
      if(response.data.message==="You haven't added any products! Kindly add products to receive orders"){ /*Checking if there are any products*/
        setProductExistence(1)
        setnoProductMessage(response.data.message)
      }
      const v=[]
      response.data.items.map(row=>{                //Storing product details into array
        return (v.push({                            
                key:row._id,
                productid:row._id,
                productname:row.productName,
                date:row.createdAt,
                stock:row.stock,
                price:row.productPrice, })
        )
      })
      setProductList([...v])

      
    })
  }

  
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className='vendor-product-content'>
      { productExistence === 1 ? (                                  //Checking if there are any products or not
        <div className='no-product'>
          <img src={noProduct} className='no-product-image'/><br/>
          <p style={{fontSize:'20px'}}>{noProductMessage}</p>
        </div>
      ) : (
      <div>
      <div className='vendor-search-bar'>
            <SearchOutlined className='vendor-search-icon'/>
            <input type='text' placeholder='Search products'></input>
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
               dataSource={productList} 
               pagination={{defaultPageSize:5}}
               title={() => 'Products'}
               className='product-table' />
      </div>
      )
    }
    </div>
      
  )
}
