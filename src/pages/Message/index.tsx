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
import { useAppDispatch, useAppSelector } from '@/utils/hook';
import ChatFeed from './ChatFeed';
import NewConv from './NewConv';
import { im } from '@/utils';
import { convParams, GetHistoryMsgConfig, OpResponse, WayConversationItem, WayID, WayInitConfig, WayMessageItem } from 'way-sdk-test/dist/types';
import { addCve, setCurCve } from '@/store/reducers/cve';
import { useReactive, useRequest } from 'ahooks';
import { userIDToWayID } from 'way-sdk-test';
const { TextArea } = Input;

export type HandlerResponse = {
  statusCode: number
  msg: any
}

export type ReactiveState = {
  historyMsgList: WayMessageItem[]
  // searchStatus: boolean
  // searchCve: WayConversationItem[]
}
export default function Message() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin, shallowEqual)
  const [action, setAction] = useState(0);
  const dispatch = useAppDispatch()
  const [twoHeight, settwoHeight] = useState(false);
  const [iw, setIw] = useState(100);
  const inputRef = useRef(null);
  const cves = useAppSelector((state: RootState) => state.cves.cves, shallowEqual)
  const curCve = useAppSelector((state: RootState) => state.cves.curCve, shallowEqual)
  const rs = useReactive<ReactiveState>({
    historyMsgList: []
  })

  const {
    loading,
    run: getMsg,
    cancel: msgCancel
  } = useRequest(getMsgWrapper, {
    manual: true,
    onSuccess: handleMsg,
    onError: (err) => {
      console.log("get message fail")
      console.log(err)
    }
  })
  //use wrapper to deliver context
  function getMsgWrapper(params: GetHistoryMsgConfig): Promise<OpResponse> {
    return im.getHistoryMsg(params)
  }
  function handleMsg(res: OpResponse) {
    if (res.data.length === 0) {
      //no more new message
      return
    }
    if (res.data[0] == rs.historyMsgList[rs.historyMsgList.length - 1]) {
      rs.historyMsgList.pop()
    }
    rs.historyMsgList = [...rs.historyMsgList, ...res.data]
    console.log(rs.historyMsgList);
  }
  function getHistoryMsg(opponent: WayID, sMsg?: WayMessageItem) {
    let startpoint = ""
    if (typeof sMsg !== 'undefined') {
      startpoint = sMsg.clientMsgID
    }
    const params: GetHistoryMsgConfig = {
      userID: opponent,
      startClientMsgID: startpoint,
      count: 20
    }
    console.log("running get msg!")
    console.log(params)
    getMsg(params)
  }
  const clickCveItem = (cve: WayConversationItem) => {
    //
    getHistoryMsg(cve.receiver)
    dispatch(setCurCve(cve))
    setAction(1);
  }
  useEffect(() => {
    if (curCve != undefined) {
      im.listAllConversation().then((val: OpResponse) => {
        console.log(val)
      })
    }
  }, [curCve])

  const handleSendMsg = async () => {

  }
  const checkCurrentCve = (c1: WayConversationItem | null, c2: WayConversationItem) => {
    if (c1 == null) {
      return false
    }
    if (c1.conversationID == c2.conversationID) {
      return true
    }
    return false
  }
  const addNewConvHandler = async (chainId: number, addr: string): Promise<HandlerResponse> => {
    let receiver: WayID = {
      network: chainId.toString(),
      type: 1,
      address: addr
    }
    let params: convParams = {
      receiver
    }
    try {
      let res = await im.initConversation(params)
      //success
      //TODO: should implement type guard for res.data
      dispatch(addCve(res.data))
      return {
        statusCode: 0,
        msg: "success"
      }
    } catch (error) {
      //error
      return {
        statusCode: -1,
        msg: error
      }
    }


  }
  useEffect(() => {
    if (isLogin) {
      //register callback

    }
  }, [isLogin])
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
                  clickCveItem(item)

                }}><MessageItem convItem={item} checked={checkCurrentCve(curCve, item)} /></div>)
              }
              <p><br /></p>
            </div>
          </div>
          <div className='msgdetails msg-w-full msg_flex msg_flex_col'>
            {/* 新建聊天 */}
            {
              action == 0 && <NewConv setAction={setAction} addNewConvHandler={addNewConvHandler} />
            }
            {/* 聊天记录 TODO:add place holder when non cve has been selected*/}
            {
              (action == 1 && curCve !== null) && <ChatFeed curCve={curCve} msgList={rs.historyMsgList} handleSendMsg={handleSendMsg} />
            }

          </div>
        </div>
      </div>
    </div>
  )
}
