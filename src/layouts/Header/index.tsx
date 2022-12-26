import React, { useEffect, useRef } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import cbridge from '../assets/cbridge.png'
import sendFinance from '@/assets/Base.svg'
import { ReactComponent as Dark } from '@/assets/dark.svg'
import { ReactComponent as Light } from '@/assets/light.svg'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import Tabs from './Tabs';
import './index.less'
import { im } from '@/utils';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { WayInitConfig, WayLoginParams } from 'way-sdk-test/dist/types';
import { APPSERVER, IMURL } from '@/config';
import { RootState } from '@/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '@/store/actions/user';
import { getCveList } from '@/store/actions/cve';
import { useAppDispatch, useAppSelector } from '@/utils/hook';

export default function Header() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: RootState) => state.user.isLogin, shallowEqual);
  const injectedConnector = new InjectedConnector({})
  const { chainId, account, activate, active, library } = useWeb3React<Web3Provider>()
  const loginTry = useRef<number>(0)
  useEffect(() => {
    console.log(chainId, account, active, library)
    if (active && loginTry.current == 0) {
      login()
    }
  }, [chainId])
  const login = async () => {
    loginTry.current += 1
    await library?.send("eth_requestAccounts", [])
    let signer = library?.getSigner()
    console.log(signer)
    let addr = await signer?.getAddress()
    let networkId = await signer?.getChainId()
    let signature = await signer?.signMessage("hello")
    if (signature == undefined) {
      return
    }
    if (networkId == undefined) {
      return
    }
    if (addr == undefined) {
      return
    }
    console.log(networkId.toString)
    console.log("loggin in")
    let loginParams: WayLoginParams = {
      signature: signature,
      senderAddress: addr,
      network: networkId.toString()
    }
    let config: WayInitConfig = {
      msgServer: IMURL,
      appServer: APPSERVER,
      loginParams
    }
    try {
      let resLog = await im.loginWay(config)
      console.log(resLog)
    } catch (e) {
      //error handle
      return
    }
    dispatch(setLoginStatus(true))
    dispatch(getCveList())

  }
  const handleConnect = () => {
    //login, dispatch
    console.log("handle connect!")
    activate(injectedConnector)
    //login
    //connect should bind with login! not extensions connection.
    if (active && loginTry.current != 0) {
      login()
    }
  }
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
  const [dark, setDark] = React.useState(false);
  const switchTheme = (flag: boolean) => {
    setDark(flag);
    flag && (document.body.className = 'dark') || (document.body.className = '');
  }
  return (
    <header style={{ padding: '0 30px' }}>

      <div className='left' style={{ display: 'flex', alignItems: 'center' }}>
        {/* <img src={sendFinance} className='topImage' ></img> */}
        <Logo className='topImage' />

        {/* <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button> */}
      </div>

      <div className='mid' style={{ flex: '1' }}>
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
        {!isLogin ? (
          <Button onClick={handleConnect} type='primary' className='topConnect'>Connect Wallet</Button>
        ) : (
          <div style={{ color: 'white' }}>connected</div>
        )}

        {!dark && <Dark style={{ fill: '#ffffff', width: '30px' }} onClick={() => switchTheme(true)} /> || <Light style={{ width: '30px' }} onClick={() => switchTheme(false)} />}
      </div>
    </header>
  )
}
