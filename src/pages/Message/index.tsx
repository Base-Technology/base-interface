import React, { useEffect, useState, useRef } from 'react'
import { Button, Card, InputNumber, Input, Divider, Switch, Drawer } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined, SettingOutlined, TeamOutlined, PlusOutlined, ArrowLeftOutlined, MessageOutlined, UnlockOutlined, SearchOutlined, CloseOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MessageItem from './MessageItem';
import DetailItem from './DetailItem';
import HeadImg from './HeadImg';
import './index.less';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAppSelector } from '@/utils/hook';
import ChatFeed from './ChatFeed';
import NewConv from './NewConv';
const { TextArea } = Input;
export default function Message() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin, shallowEqual)
  const [action, setAction] = useState(0);
  const [twoHeight, settwoHeight] = useState(false);
  const [iw, setIw] = useState(100);
  const inputRef = useRef(null);
  const cves = useAppSelector((state: RootState) => state.cves.cves, shallowEqual)
  const [list, setList] = useState([{
    checked: false,
  }]);

  const cveList = useAppSelector((state: RootState) => state.cves.cves, shallowEqual)
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  return (
    <div>
      <div className='message'>
        <div className='msg_main' >
          <div className='friendlist msg_flex msg_flex_col'>
            <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
              <div><Input ref={inputRef} style={{ color: 'white', background: 'transparent', border: 'transparent', height: '30px' }} prefix={<SearchOutlined onClick={() => {
                inputRef.current.focus({
                  cursor: 'start',
                });
              }} style={{ color: 'var(--messagecolor)', cursor: 'pointer' }} />} /></div>
              <div ><TeamOutlined />&nbsp;<EditOutlined onClick={() => setAction(0)} /></div>
            </div>
            <div className='msg_list'>
              {
                cves.map((item, index) => <div onClick={() => {
                  setList(data => {
                    const newData = data.map(item => { item.checked = false; return item; }).map((item, index2) => {
                      if (index2 == index) {
                        item.checked = true;
                      }
                      return item;
                    })
                    return newData;
                  });
                  setAction(1);
                }}><MessageItem checked={item.checked} /></div>)
              }
              <p><br /></p>
            </div>
          </div>
          <div className='msgdetails msg-w-full msg_flex msg_flex_col'>
            {/* 新建聊天 */}
            {
              action == 0 && <NewConv setAction={setAction} />
            }
            {/* 聊天记录 */}
            {
              action == 1 && <ChatFeed />
            }

          </div>
        </div>
      </div>
    </div>
  )
}
