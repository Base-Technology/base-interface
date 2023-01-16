import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Input } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { DisplayConversationItem } from '@/store/types/cve';
import { WayConversationItem, WayMessageItem } from '@way-network/way-im/dist/types';

type MessageItemProps = {
  convItem: WayConversationItem
  checked: boolean
}

export default function MessageItem({ convItem, checked }: MessageItemProps) {

  let latestMsg = convItem.latestMsg?.content
  //console.log(latestMsg)
  //console.log(convItem)
  let displayAddrFunc = (addr: string): string => {
    let res = ""
    res = res.concat(addr.slice(0, 4))
    res = res.concat("...")
    res = res.concat(addr.slice(-4))
    return res
  }
  let displayTime = (time: number | undefined): string => {
    //TODO: should return different time format depends on date
    //console.log(time)
    if (typeof time === 'undefined') {
      return ""
    }
    let now = new Date(Date.now())
    let date = new Date(time)
    if (now.getDate() == date.getDate()) {
      //print as time
      let res = ""
      let hour = "0" + date.getHours()
      let mins = "0" + date.getMinutes()
      res = res.concat(hour.slice(-2) + ":" + mins.slice(-2))
      return res
    } else {
      //print as date
      let res = ""
      let month = "0" + date.getMonth()
      let day = "0" + date.getDay()
      res = res.concat(month.slice(-2) + "/" + day.slice(-2))
      return res
    }
  }
  let displayUnread = (count: number): string => {
    if (count == 0) {
      return ""
    } else {
      return count.toString()
    }
  }
  let displayMsg = (latestMsg: WayMessageItem | undefined) => {
    //show brief text
    //behave differently base on different content type
    if (typeof latestMsg === 'undefined') {
      return ""
    }
    if (latestMsg.contentType == 101) {
      return latestMsg.content
    } else {
      return ""
    }
  }

  return (
    <div className='msg_overflow_hidden msg_shrink_0'>
      <div className={`msg_flex msg_items_center msg_cursor_pointer msg_select_none msg_border_b msg_bg_subtle_hover ${checked && 'msg_bg_subtle_night'} msg-py-2 msg-px-4`}>
        <div className='msg_flex'>
          <div className='msg_flex msg_bg_neutral_900 msg-rounded-full msg-w-14 msg-h-14 msg_items_center msg-justify-center'>
            <div className='msg-text-lg'>
              <div className='msg-xs'>Base</div>
            </div>
          </div>
        </div>
        <div className='msg_flex msg-grow msg_flex_between msg-pr-2 msg-truncate'>
          <div className='msg-truncate msg-flex-col msg-max-w-full'>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '400' }}>doctor</div>
            </div>
            <div className='msg-truncate'>
              <div className='msg-truncate'>{convItem.unreadCount != 0 && <span style={{ display: 'inline-block', minWidth: '20px', height: '20px', borderRadius: '10px', textAlign: 'center', background: '#422DDD', padding: '0 5px', fontSize: '12px', color: '#ffffff' }}>{displayUnread(convItem.unreadCount)}</span>}&nbsp;{displayMsg(convItem.latestMsg)}</div>
            </div>
          </div>
          <div className='msg_flex msg-flex-col msg_items_end msg_flex_between'>
            <span style={{ fontSize: '12px', fontWeight: 'normal', color: 'rgba(255,255,255,0.4)' }}>{displayAddrFunc(convItem.receiver.address)}</span>
            <span className="msg-opacity-30 msg-xs-small">{displayTime(convItem.latestMsgSendTime)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
