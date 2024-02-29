import { Button } from 'antd'
import React from 'react'
import '../SubscribePage/SubscribePage.css'
import { ArrowRightOutlined } from '@ant-design/icons'
function SubscribePage() {
  return (
    <div className="container">
    <div className="subscribe" >
      <div className="subscribe-page">
        <div className='subscribe-text'>
          <p>Yes!</p>
          <p>Send me exclusive offers, unique gift ideas, and personalized
            tips for shopping and selling on Commerce.</p>
        </div>
        <div className='subscribe-button'>
          <div className="subscribe-email">
            <form action="">
              <input type="email" name="email" id="" placeholder='Drop your Email' className='subscribe-email-input' />
              <Button>subscribe <ArrowRightOutlined /></Button>
            </form>
          </div>
          <div className='first-order'><a>First order only. You’re ready?</a></div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SubscribePage