import './App.css';
import 'antd/dist/antd.min.css'
import Signup from '../src/pages/signup/signup';
import Home from '../src/pages/Home/home'
import Login from '../src/pages/Login/Login'
import Cart from './pages/Cart/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Address from './pages/Address/Address';
import CardTesting from './Components/PaymentCard/cardTesting';
import Vendorlanding from './pages/VendorLanding/vendorlanding';
import VendorProduct from '../src/pages/vendorproduct/vendorproduct'
import VendorOrder from './pages/vendororder/vendororder';
import VendorRevenue from './pages/vendorRevenue/vendorRevenue';
import VendorPage from './Components/vendorPageLayout/vendorPage';
import Payment from './pages/Payment/Payment';
import OrderStatus from './pages/Orderstatus/orderstatus'
import VendorAddProduct from './pages/VendorAddProduct/VendorAddProduct';
import ShopItems from './pages/ShopItems/ShopItems';
import ShopItemLists from './Components/ShopItemLists/ShopItemLists';
import { Provider } from 'react-redux';
import store from './redux/store'
import Customerorders from './pages/customerorders/customerorders'
import OrderStatusPage from './pages/Orderstatus/orderstatus';
import { useState } from 'react';
import axios from 'axios';



function App() {
 
  const [stripeKey,setStripeKey] = useState('')
  async function getStripeKey(){
    const {data} = axios.get('api/v1/stripeapikey')
    setStripeKey(data.stripeApiKey)
  }
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });

  //   store.dispatch(loadUser());

  //   getStripeApiKey();
  // }, []);

  return (
    <Provider store = {store}>
    <BrowserRouter>
      <Routes>
        <Route index path='/*' element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='products/:slug' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />}/>
        <Route path='shop' element={<ShopItems />}>
          <Route path='electronics' element={<ShopItemLists/>}/>
          <Route path='clothing' element={<ShopItemLists/>}/>
          <Route path='homeLiving' element={<ShopItemLists/>}/>
          <Route path='fashion' element={<ShopItemLists/>}/>
          <Route path='mobiles' element={<ShopItemLists/>}/>
          <Route path='pets' element={<ShopItemLists/>}/>
        </Route>
        <Route path='vendorlanding' element={<VendorPage />}>
          <Route path='dashboard' element={<Vendorlanding />} />
          <Route path='product' element={<VendorProduct />}></Route>
          <Route path='addproduct' element={<VendorAddProduct/>}/>
          
          <Route path='order' element={<VendorOrder />}/>
            <Route path='order/orderstatus' element={<OrderStatusPage/>}/>
          
          <Route path='revenue' element={<VendorRevenue />} />
        </Route>
        <Route path='cart/payment' element={<Payment/>} />
        <Route path='test' element={<CardTesting/>}/>
        <Route path='cart/address' element={<Address/>}/>
        {/* <Route path='orderstatus' element={<OrderStatusPage/>}/> */}
        <Route path='customerorders' element={<Customerorders/>}/>
     </Routes>
    </BrowserRouter>
    </Provider>
  )
}




export default App;
