import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Form, Select, DatePicker, Row, Col } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EllipsisOutlined } from '@ant-design/icons';
import cbridge from '../assets/cbridge.png'
import sendFinance from '@/assets/Base.svg'
import { ReactComponent as Dark } from '@/assets/dark.svg'
import { ReactComponent as Light } from '@/assets/light.svg'
import Logo from '@/assets/logo.svg'
import LogoBlue from '@/assets/logoblue.svg'
import { get, post } from '@/utils/request';
import Tabs from './Tabs';
import UploadHeader from "./uploadHeader";
import SchoolData from "./schoolData";
import './index.less'

const Countdown = ({ seconds, onFinish }: any) => {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    // 如果计时器归零，则触发完成回调
    if (counter === 0) {
      onFinish();
    }

    // 创建一个定时器，每秒减少计数器
    const timer = setInterval(() => {
      setCounter((prevCounter: number) => prevCounter - 1);
    }, 1000);

    // 在组件卸载或计数器变为零时清除定时器
    return () => clearInterval(timer);
  }, [counter, onFinish]);

  return <div>{counter}s后重新发送</div>;
};
export default function Header() {
  const [dark, setDark] = useState(true);
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [switchModal, setSwitchModal] = useState(true);
  const switchTheme = (flag: boolean) => {
    setDark(flag);
    flag && (document.body.className = '') || (document.body.className = 'dark');
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if(switchModal){
      const data = {
        "password": values.password,
        "phone": values.phone
      }
      post('/api/v1/login', data).then((response:any) => {
        console.log('response', response);
        if (response.code == "0") {
          sessionStorage.setItem('token', response.token);
          setVisible(false);
        }
        else {
         alert(response.message);
        }
      })
    }
    else{
      const data = {
        "username": values.username,
        "password": values.password,
        "phone": values.phone,
        "area": "default",
        "school": values.school,
        "validate_code": values.verificationCode,
        "avatar": values.avatar
      }
      // return ;
      post('/api/v1/register', data).then((response: any) => {
        console.log('response', response);
        if (response.code == "0") {
        }
        else {
          // navigation.navigate('UserInfo');
          alert(response.message);
        }
      })
    }

  };
  useEffect(()=>{
    getUserInfo();
  },[]);
  const getUserInfo = async () => {
    // /api/v1/info
    const response =await get('/api/v1/info');
    // console.log('首页',response);
    if(response.code == "0"){
      
    }
    else{
      setVisible(true);
    }
  }

  const [showCode, setShowCode] = useState(false);

  const handleStartCountdown = () => {
    const data = {
      "phone": phone,
    }
    post('/api/v1/validate_code', data).then((response: any) => {
      console.log('response', response);
      if (response.code == 0) {
        // navigation.navigate('UserInfo');
        // 设置计时器为60秒
        setShowCode(true);
      }
      else {
        alert(response.message);
      }
    })

  };

  const handleCountdownFinish = () => {
    // 倒计时完成后的回调函数
    setShowCode(false);
  };
  const checkPrice = (_: any, value: { number: number }) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请上传头像!'));
  };
  return (
    <header style={{ padding: '0 30px' }}>

      <div className='left' style={{ display: 'flex', alignItems: 'center' }}>
        {/* <img src={sendFinance} className='topImage' ></img> */}
        <img src={!dark && Logo || LogoBlue} className='topImage' />
        {/* <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button>
                    <Button className='btn'>1</Button> */}
      </div>
      <div className='right'>
        <Button type='primary'>登录</Button>
        {/* {!dark && <Dark style={{ fill: '#422DDD', width: '30px' }} onClick={() => switchTheme(true)} /> || <Light style={{ width: '30px'}} onClick={() => switchTheme(false)} />} */}
      </div>
      <Modal
        open={visible}
        footer={null}
        width={400}
      >
        <h2>手机号登录</h2>
        {
          <Form
            style={{ marginTop: '30px' }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {switchModal && <>
              <Form.Item
                name="phone"
                initialValue={''}
                rules={[{ required: true, message: '请输入手机号!' }]}
              >

                <Input placeholder='请输入手机号' addonBefore={<span>+86</span>} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password placeholder='请输入密码' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType="submit">
                  登录
                </Button>
                <Button onClick={() => setSwitchModal(false)} style={{ marginLeft: '15px' }}>
                  注册
                </Button>
              </Form.Item></> ||
              <>
                <Form.Item
                  name="avatar"
                  rules={[{ validator: checkPrice }]}
                >
                  <UploadHeader />
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入昵称!' }]}
                >
                  <Input placeholder='请输入昵称' />
                </Form.Item>
                <Form.Item name="sex"
                  rules={[{ required: true, message: '请选择性别!' }]}>
                  <Select
                    placeholder="请选择性别"
                    options={[
                      {
                        value: '1',
                        label: '男',
                      },
                      {
                        value: '2',
                        label: '女',
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item name="birthday"
                  rules={[{ required: true, message: '请选择生日!' }]}>
                  <DatePicker style={{ width: '100%' }} placeholder='请选择生日' />

                </Form.Item>
                <Form.Item
                  name="school"
                  rules={[{ required: true, message: '请选择学校!' }]}>
                  <Select
                    showSearch
                    placeholder="请选择学校"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={SchoolData.map(item => {
                      return {
                        value: item.name,
                        label: item.name
                      }
                    })}
                  />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: '请输入手机号!' }]}
                >
                  <Input onChange={(e) => setPhone(e.target.value)} placeholder='请输入手机号' />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input.Password placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                  <Row gutter={8}>
                    <Col span={16}>
                      <Form.Item
                        name="validate_code"
                        noStyle
                        rules={[{ required: true, message: '请输入验证码!' }]}
                      >
                        <Input placeholder='请输入验证码' />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      {!showCode && <Button onClick={handleStartCountdown} style={{ width: '100%' }}>获取验证码</Button>
                        || (
                          <Button style={{ width: '100%' }}><Countdown seconds={60} onFinish={handleCountdownFinish} /></Button>
                        )}

                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType="submit">
                    注册
                  </Button>
                  <Button onClick={() => setSwitchModal(true)} style={{ marginLeft: '15px' }}>
                    登录
                  </Button>
                </Form.Item>
              </>
            }
          </Form>
        }

      </Modal>
    </header>
  )
}
