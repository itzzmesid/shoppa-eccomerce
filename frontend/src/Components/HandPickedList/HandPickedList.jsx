import { Button } from 'antd'
import React from 'react'
import HandPickedItems from '../HandPickedItems/HandPickedItems'
import {ArrowRightOutlined} from '@ant-design/icons'
import '../HandPickedList/HandPickedList.css'
function HandPickedList() { //listing hand picked items
  return ( 
    <>
    <div className="container">
    <div className='handpicked-list'>

    <div className="hand-picked-items">
      <div className="hand-pick-discover">
    <p>
    Discover unique hand-picked items
    </p></div>
    <div className='handpicked-showall'>
      <a>show all <ArrowRightOutlined /></a>
    </div>
    </div>
    <HandPickedItems />
    </div>
    </div>
    </>
  )
}

export default HandPickedList