import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Input } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { WayMessageItem } from '@way-network/way-im/dist/types';
import { useAppSelector } from '@/utils/hook';
import { Root } from 'react-dom/client';
import { RootState } from '@/store';
import { wayIDToUserID } from '@way-network/way-im';

type DetailItemProps = {
  msg: WayMessageItem
}

export default function MessageItem({ msg }: DetailItemProps) {
  const id = useAppSelector((state: RootState) => state.user.identity)
  const self = wayIDToUserID(id) == wayIDToUserID(msg.sender);
  // useEffect(()=>{

  // },)
  const displayTime = (time: number) => {
    let date = new Date(time)
    let res = ""
    let hour = "0" + date.getHours()
    let mins = "0" + date.getMinutes()
    res = res.concat(hour.slice(-2) + ":" + mins.slice(-2))
    return res
  }
  return (
    <div style={{ marginBottom: '10px' }}>
      <div className={`msg_flex ${self && 'msg-justify-end'}  msg-ml-10`}>
        <div className='msg_flex msg-flex-col' style={{ paddingRight: '20px' }}>
          <div className={`msg_flex msg-flex-col msg-justify-end msg_items_center msg-border ${self && 'msg_bg_subtle_night'}`}>
            <div className='msg-py-2 msg-px-4'>
              <div>{msg.content}</div>
              <div className='mst-opacity-50 msg-xs-small'>{displayTime(msg.sendTime)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
