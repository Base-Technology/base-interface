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
const { TextArea } = Input;
export default function Message() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin, shallowEqual)
  const [action, setAction] = useState(0);
  const [twoHeight, settwoHeight] = useState(false);
  const [iw, setIw] = useState(100);
  const inputRef = useRef(null);
  const [list, setList] = useState([{
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }, {
    checked: false,
  }]);
  const [openChain, setOpenChain] = useState(false);
  const chainList = [
    {
      'symbol': 'Ethereum',
      'icon': '/eth.svg',
      'network_id': 1
    },
    {
      'symbol': 'BNB Chain',
      'icon': '/bnb.svg',
      'network_id': 56
    },
    {
      'symbol': 'Polygon',
      'icon': '/polygon.svg',
      'network': 137
    },
    {
      'symbol': 'Optimism',
      'icon': '/optimism.png',
      'network': 10
    }
  ];
  const cveList = useSelector((state: RootState) => state.cve.cves, shallowEqual)
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  const handleTest = () => {
    console.log("message!")
    console.log(chainId, account, active, library)
  }
  useEffect(() => {
    console.log(cveList)
  }, [cveList])
  const [currentChain, setCurrentChain] = useState(0);
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
                list.map((item, index) => <div onClick={() => {
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
              action == 0 && <>
                <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                  <div onClick={() => setAction(1)}><ArrowLeftOutlined />&nbsp;&nbsp;&nbsp;&nbsp;Send Message</div>
                </div>
                {/* <div className='tokenwrap'> */}
                <div className='msg-max-w-sm tokenwrap'>
                  {/* <h1 className='msg-mt-8 msg-mb-4'>Create thread</h1> */}
                  <p style={{ marginTop: '15px' }}>Select Target Chain</p>
                  <div className='chainselect flex flex-between flex-align-center'
                    onClick={() => setOpenChain(true)}>
                    <div>
                      <img style={{ width: '30px', marginRight: '20px' }} src={chainList[currentChain].icon} />
                      <span>{chainList[currentChain].symbol}</span>
                    </div>
                    <SwapOutlined />
                  </div>
                  <p>Enter Recipient Address</p>
                  <Input style={{ color: 'white', background: '#040000', height: '50px', border: '1px solid var(--bordercolor)' }} />
                  {/* <p className='mst-opacity-50 msg-font-base'>Link twitter twitter.cardinal.so and domain naming.bonfida.org</p> */}
                  <Divider className='mst-opacity-50' style={{ background: '#ffffff' }} />
                  <div className='msg_flex msg_flex_between msg_bg_subtle_night msg-py-3 msg-px-4 msg-rounded-2xl'>
                    <span><MessageOutlined />&nbsp;&nbsp;Off-chain</span>
                    <Switch />

                  </div>
                  <br />
                  <div className='msg_flex msg_flex_between msg_bg_subtle_night msg-py-3 msg-px-4 msg-rounded-2xl'>
                    <span><UnlockOutlined />&nbsp;&nbsp;Unencrypted</span>
                    <Switch />

                  </div>
                  <br />
                  {/* </div> */}
                  <Drawer
                    bodyStyle={{
                      background: 'var(--selectbg)'
                    }}
                    headerStyle={{ display: 'none' }}
                    width="100%"
                    height="100%"
                    title="Basic Drawer"
                    placement="bottom"
                    getContainer={false}
                    open={openChain}
                    mask={false}
                  >
                    <div className='flex flex-between'>
                      <span>Select Target Chain</span>
                      <CloseOutlined onClick={() => setOpenChain(false)} />
                    </div>
                    <div className='tokenlist'>
                      {
                        chainList.map((item, index) => <div
                          className='item'
                          onClick={() => { setCurrentChain(index); setOpenChain(false); }}
                        >
                          <div>
                            <img src={item.icon} style={{ marginRight: '15px' }} />
                            <p>{item.symbol}</p>
                          </div>
                        </div>)
                      }
                    </div>
                  </Drawer>
                </div>

                <Button style={{ width: '384px', margin: '20px auto' }} type='primary' size='large' className='cardButton'>Send Message</Button>

              </>
            }
            {/* 聊天记录 */}
            {
              action == 1 && <>
                <div className='header msg_flex msg_flex_between msg_items_center msg_border_b'>
                  <HeadImg data={list} />
                  <Button onClick={handleTest}>test</Button>
                  <div><SettingOutlined /></div>
                </div>
                <div className='detail_list msg_flex msg-flex-col-reverse'>
                  {/* {
                    list.map((item, index) => <DetailItem />) reverse!!
                  } */}

                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem self />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem /><DetailItem self /><DetailItem self /><DetailItem self /><DetailItem self />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  {/* <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem />
                  <DetailItem /> */}
                </div>
                <div style={{ padding: '10px' }}>
                  <TextArea
                    placeholder=""
                    autoSize={{ minRows: 1, maxRows: 6 }}
                  />
                  {/* <Input style={{ height: twoHeight && '44px' || '30px', transition: 'all 0.1s' }} onFocus={() => settwoHeight(true)} onBlur={() => settwoHeight(false)} /> */}
                  <p>0/100</p>
                </div>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}
