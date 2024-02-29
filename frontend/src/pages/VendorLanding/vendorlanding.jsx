import { DatePicker,Table, Divider } from 'antd';
// import 'antd/dist/antd.css';
import React from 'react';
import './vendorlanding.css'
import vendorgraph from '../../Assets/Images/vendorgraph.svg'
import piechart from '../../Assets/Images/analytics.svg'
import Shoe_image from '../../Assets/Images/shoe_image.svg'
import Iphone12 from '../../Assets/Images/iphone12.svg'
import Star_rating from '../../Components/ProductView/starRating'

const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const data = [              //Dummy data for table
  {
    key: '1',
    trackingno: '87636',
    product: 'Camera Lens',
    price: 178,
    totalorder:25,
    totalamount:3333,
  },
  {
    key: '2',
    trackingno: '99999',
    product: 'Camera Lens',
    price: 278,
    totalorder:325,
    totalamount:1000,
  },
  {
    key: '3',
    trackingno: '99999',
    product: 'Camera Lens',
    price: 278,
    totalorder:325,
    totalamount:1000,
  },
  {
    key: '4',
    trackingno: '99999',
    product: 'Camera Lens',
    price: 278,
    totalorder:325,
    totalamount:1000,
  },
];

const columns = [
  {
    title: 'Tracking no',
    dataIndex: 'trackingno',
    key:'trackingno',
    sorter:(a,b) => a.trackingno - b.trackingno,
    sortDirections:['descend'],
    render: (text) => {return <div className="text">{`#${text}`}</div> }
  },
  {
    title: 'Product Name',
    dataIndex: 'product',
    key:'product',
    sorter:(a,b) => a.product.length - b.product.length,
    sortDirections:['descend'],
    
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key:'price',
    sorter:(a,b) => a.price - b.price,
    sortDirections:['descend'],
    render:(text) => {return<div>{`$${text}`}</div>}
  },
  {
    title: 'Total Orders',
    dataIndex: 'totalorder',
    key:'totalorder',
    sorter:(a,b) => a.totalorder - b.totalorder,
    sortDirections:['descend'],
    render: (text) => <div className="total-order">{text}</div>
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalamount',
    key:'totalamount',
    // render: (text) => {return<div className="total-amount">{text=totalorder*price}</div>}
  }
];
export default function vendorlanding() {
  
  return (
    <div>
            <div className='content'>
              <div className='dates'>
                 <DatePicker onChange={onChange} />
                 <DatePicker onChange={onChange} />
              </div>
            <div className='analytics'>
                <img src={vendorgraph} className='vendorgraph'/>
                <img src={piechart} className='pie-chart'/>
            </div>
            <div className='vendor-statistics'>
              <div className='recent-orders'>
                <Table columns={columns}            //Recent orders table
                        dataSource={data} 
                        pagination={false} 
                        title={() => 'Recent Orders'}
                        onChange={onChange}
                        className='table' />
              </div>
              <div className='top-selling-products'>
                <p className='top-selling-products-heading'>Top Selling Products</p>
                <div className='top-selling-images'>
                    <img src={Shoe_image} className='shoe-image'/>
                    <div className='product-alignment'>
                        <p>NIKE Shoes Black Pattern</p>
                        <div className='star-rating-alignment'>
                          <Star_rating />
                        </div>
                        <p style={{fontWeight:'bold'}}>$87.00</p>
                    </div>
                </div>
                <Divider />
                <div className='top-selling-images'>
                    <img src={Iphone12} className='iphone-image'/>
                    <div className='product-alignment' style={{marginTop:'10px'}}>
                        <p>iPhone 12</p>
                        <div className='star-rating-alignment'>
                          <Star_rating />
                        </div>
                        <p style={{fontWeight:'bold'}}>$987.00</p>
                    </div>
                </div>
              </div>
            </div>
            </div>
          
        
    </div>
  )
}
