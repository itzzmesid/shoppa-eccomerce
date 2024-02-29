import React from 'react'
import {Form, Select, Button} from 'antd';
import './NetBankingDetails.css'

function NetBankingDetails() {
    const { Option } = Select;
    
  return (
    <div className='net-banking'>
        <Form  layout='vertical' name="nest-messages">
        <Form.Item name="prefix" label="Select the Bank">
          <Select  style={{ width: 360 }}>
            <Option value="86">Bank of India</Option>
            <Option value="86">State Bank of India</Option>
            <Option value="86">ICICI</Option>
            <Option value="86">Federal Bank</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{width:360}}>
          Proceed
        </Button>
        </Form>

    </div>
  )
}

export default NetBankingDetails
