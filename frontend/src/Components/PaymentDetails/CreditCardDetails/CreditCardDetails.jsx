import React from 'react'
import { Button, Form, Input,InputNumber,Checkbox} from 'antd';
// import '../../../../node_modules/antd/dist/antd.min.css'
import './CreditCardDetails.css'



function CreditCardDetails() { //credit card detail form
const onFinish = (values) => {
        console.log(values);
      };
      return (
        <div className='credit-card'>
         <Form  layout='vertical' name="nest-messages" onFinish={onFinish} validateMessages>
          
          <Form.Item
          

            name={['card', 'card_no']}
            label="Card Number"
            rules={[
              {
                required: true,
                message:"Card Number is required!"
              },
            ]}
          >
            <Input style={{width:360}} placeholder='Enter Card Number' />
    
          </Form.Item>
         
      
          
          <Form.Item
            name={['card', 'name']}
            label="Name on Card."
            rules={[
              {
                required: true,
                message:"Name is required!"
              },
            ]}
          >
            <Input style={{width:360}}  placeholder='Enter your Name' />
    
          </Form.Item>

          <div className="card-expiry">
            <Form.Item rules={[
              {
                required: true,
                message:"Expiry Month is required"
              },
            ]}
          name={['card', 'expiry_month']} label="Expiry Month">
            <InputNumber min={0} max={12} defaultValue={0} initialValues={0}style={{width:160,resize:'none',marginRight:40,background:'#F5F6F8'}} />
          </Form.Item>

          <Form.Item rules={[
              {
                required: true,
                message:"Expiry Year is required"
              },
            ]}
          name={['card', 'expiry_year']} label="Expiry Year">
            <InputNumber min={22} max={50} defaultValue={22} initialValues={22}style={{width:160,resize:'none',background:'#F5F6F8'}} />
          </Form.Item>
          </div>
          <div className="cvv-details">
          <Form.Item
          

          name={['card', 'cvv']}
          label="CVV"
          rules={[
            {
              required: true,
              message:"CVV is required!"
            },
          ]}
        >
          <Input style={{width:120}}/>
  
        </Form.Item>
        <div className="cvv-info">
        <p>
        Last 3 digits printed on the <br/>back of the card
        </p></div>
          </div>
          <Form.Item
        name="remember"
        valuePropName="checked"
        
      >
        <Checkbox>Save this card for faster payments in future</Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{width:360}}>
          Submit
        </Button>
            
          
        
        </Form>
        </div>
  )
}

export default CreditCardDetails
