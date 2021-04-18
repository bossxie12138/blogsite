import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  Input,
  Button,
  Menu
} from 'antd'
import {
  UserOutlined, 
  LockOutlined,
  MailOutlined
 } from '@ant-design/icons'
import { md5 } from '../../utils'
import { addUserAction } from '../../redux/actionCreators'
import './index.less'

export default function Register() {

  const history = useHistory()

  const dispatch = useDispatch()

  const user = useSelector(state => state.userReducer)

  useEffect(() => {
    user.isLogin && history.push('/ui/index')
  }, [history, user])

  const onFinish = value => {
    let userConfig = {
      ...value,
      password: md5(value.password, value.username)
    }
    dispatch(addUserAction(userConfig, history))
  }

  const toggleClick = e =>  history.push('/' + e.key)
  
  return (
    <div className="login">
      <div className="login-form">
        <div className="form-head">
          <Menu onClick={toggleClick} defaultSelectedKeys={['register']} mode="horizontal">
            <Menu.Item key="login">
              登录
            </Menu.Item>
            <Menu.Item key="register">
              注册
            </Menu.Item>
          </Menu>
        </div>
        <div className="form-area">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={ onFinish }
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '用户名不能为空!' },
                { pattern: /^[0-9A-Z_a-z]{6,12}$/, message: '用户名由6~12位字母、数字或者下划线组成!' }
              ]}
            >
              <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="用户名" 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码不能为空!' },
                { 
                  min: 6, max: 16, message: '密码必须为6~16位字符!' 
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请填写邮箱地址!' },
                { 
                  pattern: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
                  message: '邮箱格式不正确！'
                }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="邮箱"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
