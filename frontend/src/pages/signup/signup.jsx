import {useState,React} from "react";
import "./signup.css";
import AxiosInstance from "../../Utils/axios/axiosConfig";
import signup_image from "../../Assets/Images/signup_image.svg";
import mail_image from "../../Assets/Images/mail_image.svg";
import { Button, Checkbox, Form, Input } from "antd";
import bag from "../../Assets/Images/full_bag.svg";
import shoppa_main from "../../Assets/Images/shoppa_main.svg";
import Formseparator from "../../Components/FormSeparator/formseparator";
import { useNavigate} from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();
  const onFinish = async(values) => {                               //Function to pass user details
  const signupDetails = await AxiosInstance.post('/signup',{
  
   password:values.password,
    email: values.email,
    first_name:values.firstname,
    last_name:values.lastname
 }) 
    .then(response=>{console.log(response.data)
    if(response.data.code===200){                             
      navigate('/login');                       //If user doesnt already exist,and all
    }                                          //details are valid, they are navigated to login page
  })
    .catch(function (error) {
    if (error.response) {
      console.log(error);
      if(error.response.status===403){
          alert(error.response.data.message)
      }
    }
  });
};
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
  return (
    <div className="container">

   

    <div className="SignupPage">
      <div className="background_yellow">
        <div className="Shoppa_1">
          <img src={shoppa_main} className="shoppa_main" />
          <p className="sub_title">Amazing Ecommerce platform for everyone.</p>
          <img src={signup_image} className="signup_image" />
        </div>
      </div>
      <div className="form_part">
        <div className="sign_in">
          <p>Already a member?</p>
          <a href="/login" className="sign_in_link">
            Sign in
          </a>
          <br></br>
          <a href="/login" className="seller_login_link">
            I am a Seller
          </a>
        </div>
        <div className="signup_heading">
          <h1>Sign up</h1>
          <Button type="primary" className="signup_email_button">
            <img src={mail_image} className="mail_image" />
            Sign up with email
          </Button>
        </div>
        <Formseparator/>
        <div>
          <Form  onFinish={onFinish} className="signup_form" layout='vertical'>     {/*Form to store signup details of a user*/}
            <div className="form_beginning">
              <Form.Item
                className="inputfield"
                label="First Name"
                required={false}
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input className="inputfield_width" />
              </Form.Item>
              <Form.Item
                className="inputfield"
                label="Last Name"
                required={false}
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}
              >
                <Input className="inputfield_width" />
              </Form.Item>
            </div>
            <Form.Item
              className="inputfield"
              name="email"
              required={false}
              label="E-mail Address"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input className="email_inputfield" />
            </Form.Item>

            <Form.Item
              className="inputfield"
              name="password"
              required={false}
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password 
                placeholder="6+ characters"
                className="password_inputfield"
                style={{
                  padding:'0px',
                  border:'none',
                  borderRadius:'none',
                }}
              />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox className="agreement_checkbox">
                Creating an account means you're okay with{" "}
                <a href="" className="agreement_hyperlinks">
                  Terms of Service
                </a>
                ,{" "}
                <a href="" className="agreement_hyperlinks">
                  Privacy Policy{" "}
                </a>
                and our default{" "}
                <a href="" className="agreement_hyperlinks">
                  Notification Settings.
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="create_account_button"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="shopping_bag_image">
        <img src={bag} className="bag" />
      </div>
    </div>
    </div>

    

  );
}
