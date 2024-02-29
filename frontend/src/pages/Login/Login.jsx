import './Login.css'
import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd";
import mail_image from '../../Assets/Images/mail_image.svg'
import Formseparator from '../../Components/FormSeparator/formseparator';
import AxiosInstance from '../../Utils/axios/axiosConfig';
import shoppa_main from "../../Assets/Images/shoppa_main.svg";
import signup_image from "../../Assets/Images/signup_image.svg";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Login() {
  // const [user, setUser] = useState()
  useEffect(()=>{
    const loggedinUser = localStorage.getItem('token')
    if(loggedinUser){
      alert('User is already logged in')
      navigate('/')
    }
  },[])
  const navigate = useNavigate();
  const onFinish =async (values) => {
    const loginDetails = await AxiosInstance.post('/account/signin',values)         //Sending login details to server
      .then(response => {
        console.log(response.data)
          if(response.data.code===200 && response.data.user.isActive===true){
             if(response.data.user.user_role==='user'){                             //Rerouting according to user-role
              navigate('/')
             }
             else if(response.data.user.user_role==='vendor'){
              navigate('/vendorlanding')
             }
            }
          localStorage.setItem('token',(response.data.token))
          localStorage.setItem('username',(response.data.user.fullName))
          localStorage.setItem('user_role',response.data.user.user_role)
      })
      
      
  };
  
  return (
    <div className="container">
    <div className='loginpage_common'>
       <div className="background-yellow-login">
        <div className="Shoppa_1">
          <img src={shoppa_main} className="shoppa_main" />
          <p className="sub_title">Amazing Ecommerce platform for everyone.</p>
          <img src={signup_image} className="signup_image" />
        </div>
      </div>
      <div className='login-form-aligning'>
      <h1>Log in</h1>
      <Button type="primary" className="login_email_button">
        <img src={mail_image} className="mail_image" />
        Login with email
      </Button>
      <Formseparator />
      <Form                                 //Main login form
        name="normal_login"
        className="login-form"
        rules={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className='login-username-inputfield'
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          className='inputfield'
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item  valuePropName="checked" noStyle>
            <Checkbox className='remember-me-checkbox'>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a href="/signup" className='register_link'>Don't have an account?</a>
        </Form.Item>
      </Form>
      </div>
    </div>
    </div>
  );
}