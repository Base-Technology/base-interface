import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import cbridge from '../assets/cbridge.png'
import sendFinance from '@/assets/logo.svg'
import Tabs from './Tabs';
import styles from './index.less'

export default function Header() {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white' }}>
              Docs
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white' }}>
              FAQ
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="" style={{ color: 'white', }}>
              3rd menu item
            </a>
          ),
        },
        // {
        //     label: (
        //       <Button type='primary' style={{borderRadius:'12px'}}>Connect Wallet</Button>
        //     ),
        //   }
      ]}
      className="menu" style={{ textAlign: 'center', backgroundColor: 'rgb(35, 37, 48)', borderRadius: '12px' }} />
  );
  return (
    <header style={{ padding: '0 30px' }}>

      <div className='left' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={sendFinance} className='topImage' ></img>
        {/* <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button> */}
      </div>

      <div className='mid' style={{flex:'1'}}>
      <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
              lineHeight: '64px',
              marginLeft: '24px',
              transform: 'translateY(-1px)',
              background: 'transparent',
              justifyContent: 'center',
            }}
          >
            <Menu.Item key="1">
              DashBoard
            </Menu.Item>

            <Menu.Item key="2">
              Houses
            </Menu.Item>

            <Menu.Item key="3">
              Chat
            </Menu.Item>
            <Menu.Item key="4">
              Talks
            </Menu.Item>
            <Menu.Item key="5">
              Assets
            </Menu.Item>
          </Menu>
      </div>
      <div className='right'>
        <Button type='primary' className='topConnect' style={{ marginTop: '3px' }}>Connect Wallet</Button>
      </div>
    </header>
  )
}
