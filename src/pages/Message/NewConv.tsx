import { ArrowLeftOutlined, CloseOutlined, MessageOutlined, SwapOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Input, Switch } from "antd";
import { useState } from "react";

type NewConvProps = {
  setAction: (value: React.SetStateAction<number>) => void
}
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
export default function NewConv({ setAction }: NewConvProps) {
  const [currentChain, setCurrentChain] = useState(0);
  const [openChain, setOpenChain] = useState(false);
  return (
    <>
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
  )
}