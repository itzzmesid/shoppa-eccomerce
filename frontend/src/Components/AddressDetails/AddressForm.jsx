import { Button, Form, Input, Select, Radio } from 'antd';
// import '../../../node_modules/antd/dist/antd.min.css'
import 'antd/dist/antd.css'
import './AddressForm.css'
import React from 'react';
import AxiosInstance from '../../Utils/axios/axiosConfig';
import { useEffect, useState } from 'react';
import {onFinish} from './AddressActions/AddressActions'
import { Link, NavLink } from 'react-router-dom';

function AddressForm({addAddress,getAddress}){
  const [form] = Form.useForm()
  const [address, setAddress] = useState([]);
  useEffect(() => {
  }, [])

  // const onFinish = async (values) => {
  //   console.log('adddd',values);
  //   chooseAddress(values)}

  const prefixSelector = () => (                    // adding a country code before the input box
    <Form.Item noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );
  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onSuccess = ()=>{
    getAddress()
    form.resetFields()
  }

  const { Option } = Select;
  return (
    <div className='address-forms'>
      <Form layout='vertical' form = {form} name="add-address" onFinish={(val)=>onFinish(val, onSuccess)} autoComplete='off'>
        <div className="address-field1">
          <Form.Item


            name='recipientName'
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required!"
              },
            ]}
          >
            <Input style={{ width: 250 }} />

          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector()} style={{ width: 250 }} />
          </Form.Item>

        </div>
        <Form.Item
          name='unitNumber'
          label="Building No."
          rules={[
            {
              required: true,
              message: "Building No. is required!"
            },
          ]}
        >
          <Input style={{ width: 625 }} />

        </Form.Item>
        <div className='address-line'>
          <Form.Item rules={[
            {
              required: true,
              message: "Address is required"
            },
          ]}
            name='addressLine1' label="Address Line1">
            <Input.TextArea style={{ width: 625, resize: 'none' }} />
          </Form.Item>

          <Form.Item name='addressLine2' label="AddressLine2">
            <Input.TextArea style={{ width: 625, resize: 'none' }} />
          </Form.Item>
        </div>
        <div className="address-field1">
          <Form.Item


            name='country'
            label="Country"
            rules={[
              {
                required: true,
                message: "Country is required!"
              },
            ]}
          >
            <Input style={{ width: 250 }} />

          </Form.Item>
          <Form.Item


            name='state'
            label="State"
            rules={[
              {
                required: true,
                message: "State is required!"
              },
            ]}
          >
            <Input style={{ width: 250 }} />

          </Form.Item>

        </div>
        <div className="address-field1">
          <Form.Item


            name='city'
            label="City"
            rules={[
              {
                required: true,
                message: "City is required!"
              },
            ]}
          >
            <Input style={{ width: 250 }} />

          </Form.Item>
          <Form.Item


            name='pincode'
            label="Pin code"
            rules={[
              {
                required: true,
                message: "Pin code is required!"
              },
            ]}
          >
            <Input style={{ width: 250 }} />

          </Form.Item>

        </div>
        <Form.Item >
          <Form.Item name='addressType'>
          <Radio.Group onChange={onChange} initialValues="a" defaultValue="a">
            <Radio.Button style={{ width: 150, margin: 6 }} value="home">Home</Radio.Button>
            <Radio.Button style={{ width: 150, margin: 6 }} value="office">Office</Radio.Button>
          </Radio.Group>
          </Form.Item>
          <br />
          <div className="address-form-submit">
           <Button onClick={()=>{addAddress()}} type="primary" htmlType="submit" style={{ width: 200 }} >
           Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>

  );
};
export default AddressForm;