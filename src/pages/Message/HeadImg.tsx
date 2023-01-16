import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Input } from 'antd';
import { Menu, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { WayID } from '@way-network/way-im/dist/types';

export type HeadImgProps = {
  id: WayID
  faceUrl: string
}

export default function MessageItem({ id }: HeadImgProps) {


  // useEffect(()=>{

  // },)
  return (
    <div className='msg_overflow_hidden msg_shrink_0' style={{ fontSize: '12px' }}>
      <div className='msg_flex msg_items_center  msg-py-2 msg-px-4'>
        <div className='msg_flex'>
          <div className='msg_flex msg_bg_neutral_900 msg-rounded-full msg-w-12 msg-h-12 msg_items_center msg-justify-center'>
            <div className='msg-text-base'>
              <div className='msg-xs-base'>Base</div>
            </div>
          </div>
        </div>
        <div className='msg_flex msg-grow msg_flex_between msg-pr-2 msg-truncate'>
          <div className='msg-truncate msg-flex-col msg-max-w-full'>
            <div>
              <div>{id.address}</div>
            </div>
            <div className='msg-truncate'>
              <LockOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
