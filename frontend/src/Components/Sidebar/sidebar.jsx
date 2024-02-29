import { Menu,Icon } from 'antd';
import React from 'react';
import './sidebar.css'
import profilephoto from '../../Assets/Images/profilephoto.svg'
import logout from '../../Assets/Images/logout.svg'
import { DashboardIcon,StoreIcon,ProductIcon,OrderIcon,RevenueIcon } from '../../Components/svgtoicons/svgtoicons'
import { Link,Outlet } from 'react-router-dom'

const App = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <div className='sidebar'>
            <Menu theme='none' mode='inline' style={{backgroundColor:'#F5F6F8'}}>   {/*Sidebar to navigate through the vendors interface */}
              <Menu.Item key='1' title='Dashboard' icon={<DashboardIcon/>}>
                Dashboard
                <Link to='/vendorlanding/dashboard'></Link>
              </Menu.Item>
              <Menu.SubMenu key='SubMenu' title='Store' icon={<StoreIcon/>}>
              
                <Menu.Item key='2' icon={<ProductIcon/>}>
                     Products                                                         {/*Display the product table */}
                     <Link to='/vendorlanding/product'></Link>
                </Menu.Item>
                <Menu.Item key='3' icon={<OrderIcon/>}>
                  Orders                                                              {/*Display the order table */}
                  <Link to='/vendorlanding/order'></Link>
                  
                </Menu.Item>
                {/* <Menu.Item key='4'icon={<RevenueIcon/>}>
                  Revenue                                                             
                  <Link to='/vendorlanding/revenue'></Link>
                  
                </Menu.Item> */}
              </Menu.SubMenu>
            </Menu>
            <div className='sidebar-images'>
                <img src={profilephoto} className='profilephoto'/>
                <img src={logout} className='logout'/>     
            </div>
                 
    </div>
  );
};
export default App;