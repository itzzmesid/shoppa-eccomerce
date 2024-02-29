import {React,useEffect,useState} from 'react'
import './header.css'
import bag from '../../Assets/Images/shoppa_main.svg'
import user from '../../Assets/Images/user.svg'
import shopping_bag from '../../Assets/Images/shopping_bag.svg'
import Navbar from '../Navbar/navbar'
import SearchBar from '../SearchBar/searchbar'
import { Avatar, Badge, Dropdown,Select} from 'antd';
import { useNavigate,Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { SearchOutlined } from '@ant-design/icons'

export default function Header() {
    
    const navigate = useNavigate();
    const [items,setItems] = useState([{}])                        //contents of the dropdown depending on user_role
    const [Loggedin,setLoggedin] = useState('false')                        
    const products = useSelector((items)=>items.name)
    const [userName,setuserName] = useState('Account')
    const [categories,getCategories]=useState()
    const [productList,getProducts]=useState()
    useEffect(()=>{
        const user=localStorage.getItem('user_role')
        if(localStorage.getItem('token')){                          //Check if user is logged in 
            setLoggedin('true')                                     //or not                    
            setuserName(localStorage.getItem('username'))
            if(user=='user'){
            setItems(items1)                                                
            }
            else if(user=='vendor'){
                setItems(items3)
            }
        }
        else{
            setItems(items2)
        }
        getData()
    },[])
    const getData = async () => {
        const token = localStorage.getItem("token");
    await AxiosInstance.get("/category/list", {                           //fetching api to display
      Headers: { Authorization: `Bearer ${token}` },                      //in the category dropdown              
    }).then((response) => {
      console.log(response.data);
      getCategories(response.data);
      const dropdownItems=[]
    });
    await AxiosInstance.get('/product',{
        Headers: { Authorization: `Bearer ${token}` },                      //in the category dropdown              
    }).then((res) => {
      console.log(res.data);
      getProducts(res.data)
    });
    
    }
    const handleLogout = () => {                                //Function used to logout of the account
        localStorage.removeItem('username');
        localStorage.removeItem('token')
        localStorage.removeItem('user_role')
        navigate('/login');
    }
    const handleCart = () => {
        if(localStorage.getItem('token')){
        navigate('/cart');
        
    }
    
    }
    const onSearch = (value) => {
        console.log('search:', value);
      };
      const onChange = (value) => {
        console.log(`selected ${value}`);
        productList.getActiveProducts?.filter(item=>item.productName===value).map(item=>{
            navigate(`/products/${item.slug}`)
            console.log(item.slug);
        })
      };
    const items1 = [
        {
             label: (
                <a>Profile</a>
             ),
             key: '1' 
        },
        { 
            label:  (
                <a href='/customerorders'>My orders</a>
             ),
            key: '2' 
        },
        { 
            label:  (
                <a onClick={handleLogout}>Logout</a>
             ),
            key: '3' 
        },
      ];
      const items2 = [
        {
            label:(
                <a href='/login'>Log in</a>
            ),
            key:'1'
        },
      ]
      const items3 = [
        {
            label:(
                <a href='/vendorlanding'>Profile</a>
            ),
            key:'1'
        },
        {
            label:(
                <a onClick={handleLogout}>Logout</a>
            ),
            key:'2'
        },
      ]
    const goHome = () =>{                       //Called when the Shoppa logo is clicked
        navigate('/')                           //Navigated back to the landing page        
    }
    const handleChange = (value) => {            //function to get the selected value from 
        console.log(`selected ${value}`);        //the category dropdown
      };
    
  return (

    <div className='header'>
    <div className="container">
        

        <div className='header-content'>
            <div>
                <img src={bag} className='shoppa-header-logo' onClick={goHome}/>
            </div>
            <div className='search-bar-with-dropdown' type='input'>
                <div className='dropdown'>
                        <Select
                            defaultValue="All categories"
                            onChange={handleChange}
                            >
                                {categories?.categories
                        ?.filter((item) => !item.parentId)
                        .map((item) => {
                          return (
                            <option key={item._id} value={item.name}></option>
                          );
                        })}
                            </Select>
                     {/* <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Cascading menu
        <DownOutlined />
      </Space>
    </a>
  </Dropdown> */}
                </div>
                <div className='search-bar'>
                <Select                     //Search bar to search for different products
    showSearch
    placeholder="Search anything"
    suffixIcon=<SearchOutlined/>
    className='search-products'
    // optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    
>
{productList?.getActiveProducts
                        ?.map((item) => {
                          return (
                            <option key={item.slug} value={item.productName}></option>
                          );
                        })}
</Select>
                </div>
            </div>
            <div className='homepage-help-button'>
            {
                <button className='help-me-button'>Help me</button>
            }
            </div>
            <div className='Account-link'>
                <img src={user} className='header-images'/>
                <Dropdown menu={{ items }}>
                    <a>{userName}</a>
                </Dropdown>
            </div>
              <div onClick={handleCart} className='shopping-bag-link'>
              <Badge count={products?.cartQuantity} color='gold'>             {/*Badge whose count gets updated when a product is added to cart*/} 
                <Avatar src={shopping_bag} className='header-images'/>
            </Badge>
                <a >Shopping</a>
            </div>
        </div>
        <Navbar/>          {/*Navbar which shows products of the clicked category */}
    </div>
    </div>
  )
}
