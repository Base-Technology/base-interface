import React, { useEffect, useState, useRef } from 'react'
import { Button, Card, InputNumber, Input, Divider, Switch, Drawer } from 'antd';
import { Menu, Space } from 'antd';
import { EditOutlined, SettingOutlined, TeamOutlined, PlusOutlined, ArrowLeftOutlined, MessageOutlined, UnlockOutlined, SearchOutlined, CloseOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MessageItem from './MessageItem';
import './index.less';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/utils/hook';
import ChatFeed from './ChatFeed';
import NewConv from './NewConv';
import { im } from '@/utils';
import { convParams, GetHistoryMsgConfig, OpResponse, WayConversationItem, WayID, WayInitConfig, WayMessageItem, WaySendMsgParams } from 'way-sdk-test/dist/types';
import { addCve, markReadCve, setCurCve, updateCve } from '@/store/reducers/cve';
import { useReactive, useRequest } from 'ahooks';
import { WayCbEvents, wayIDToUserID } from 'way-sdk-test';

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

  const [iw, setIw] = useState(100);
  const inputRef = useRef(null);
  const cves = useAppSelector((state: RootState) => state.cves.cves, shallowEqual)
  const curCve = useAppSelector((state: RootState) => state.cves.curCve, shallowEqual)
  const rs = useReactive<ReactiveState>({
    historyMsgList: []
  })
  useEffect(() => {
    im.on(WayCbEvents.ONRECVNEWMESSAGE, newMsgHandler)
    return () => {
      im.off(WayCbEvents.ONRECVNEWMESSAGE, newMsgHandler)
    }
  }, [curCve])
  async function newMsgHandler(data: OpResponse) {
    console.log(data)
    const msg = data.data as WayMessageItem
    if (curCve) {
      if (inCurCve(msg)) {
        rs.historyMsgList = [msg, ...rs.historyMsgList]
      }
    }
    //update conversations...
    let getConvRes = await im.getOneConversation(msg.sender)
    if (getConvRes.errCode == 0) {
      dispatch(updateCve(getConvRes.data))
    }

  }
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
  function inCurCve(msg: WayMessageItem): boolean {
    if (curCve) {
      if (wayIDToUserID(msg.sender) == wayIDToUserID(curCve.receiver)) {
        return true
      } else {
        return false
      }
    }
    return false

  }
  function handleMsg(res: OpResponse) {
    if (res.data.length === 0) {
      //no more new message
      return
    }
    console.log(res.data.reverse())
    if (JSON.stringify(res.data.reverse()[0]) == JSON.stringify(rs.historyMsgList[rs.historyMsgList.length - 1])) {
      rs.historyMsgList.pop()
    }
    rs.historyMsgList = [...rs.historyMsgList, ...res.data.reverse()]
    //console.log(rs.historyMsgList);
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
  const clickCveItem = async (cve: WayConversationItem) => {
    //
    if (cve.conversationID == curCve?.conversationID) {
      return
    }
    rs.historyMsgList = []
    msgCancel()
    getHistoryMsg(cve.receiver)
    await markCveHasRead(cve)
    setAction(1);

    dispatch(setCurCve(cve))
  }
  async function markCveHasRead(cve: WayConversationItem) {
    try {
      let markRes = await im.markAsRead(cve.receiver)
      if (markRes.errCode == 0) {
        let conv = await im.getOneConversation(cve.receiver)
        dispatch(markReadCve(conv.data))
      }
    } catch (e) {
      console.log(e)
    }

  }

  const sendMsgHandler = async (content: string, receiver: WayID) => {
    console.log("Handle send msg")
    console.log(content, receiver)
    console.log(rs.historyMsgList)
    let params: WaySendMsgParams = {
      content: content,
      receiver: receiver
    }
    try {
      let sendMsgRes = await im.sendMessage(params)
      console.log(sendMsgRes.data)
      rs.historyMsgList = [sendMsgRes.data, ...rs.historyMsgList]
      return {
        statusCode: 0,
        msg: sendMsgRes.data
      } as HandlerResponse
    } catch (e) {
      return {
        statusCode: -1,
        msg: e
      } as HandlerResponse
    }

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
              (action == 1 && curCve !== null) && <ChatFeed curCve={curCve} msgList={rs.historyMsgList} handleSendMsg={sendMsgHandler} />
            }

          </div>
        </div>
      </div>
    </div>
  )
}
