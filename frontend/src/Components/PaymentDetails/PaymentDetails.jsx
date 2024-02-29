import React from 'react'
import { Button, Tabs } from 'antd';
import './PaymentDetails.css'
import CreditCardDetails from './CreditCardDetails/CreditCardDetails';
import NetBankingDetails from './NetBankingDetails/NetBankingDetails';
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

function PaymentDetails() { //payment details tabs for choosing payment options
  return (
    <div className='payment-tabs'>

      <Link to="/cart/address">
        <Button style={{marginBottom:10}}>
          <ArrowLeftOutlined />
          back to Address page
        </Button>
      </Link>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Credit / Debit Card" key="1" >
          <div className="credit-card">
            <CreditCardDetails />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Net Banking" key="2">
          <NetBankingDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="COD" key="3">
          <Button style={{ width: 380 }}>Proceed to buy</Button>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default PaymentDetails