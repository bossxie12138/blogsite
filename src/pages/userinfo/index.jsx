import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { MyUpload } from '../../components'
import { editUserAction } from '../../redux/actionCreators'
import { md5 } from '../../utils'
import { EXIT } from '../../redux/actionTypes'
import './index.less'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16,
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

export default function UserInfo() {

  const [pwdConfirm, setPwdConfirm] = useState('')

  const dispatch = useDispatch()

  const userMsg = useSelector(state => state.userReducer)

  const history = useHistory()

  const [form] = Form.useForm()

  const onFinish = values => {
    const { nickname, email, password} = values
    let flag = nickname===undefined && email===undefined && password===undefined
    if (flag) {
      message.error('您没有填写信息！')
      return
    }
    if (password === undefined) {
      dispatch(editUserAction(values))
      message.success('修改成功！')
      form.resetFields()
    }else {
      let jwtConfig = {
        ...values,
        password: md5(password, userMsg.userInfo.username)
      }
      if (password === pwdConfirm) {
        dispatch(editUserAction(jwtConfig))
        message.error('身份已过期请重新登录！')
        setTimeout(() => {
          history.push('/login')
          dispatch({ type: EXIT })
          localStorage.removeItem('jwtToken')
        }, 1000)
      } else { message.error('两次密码输入不一致！') }
    }
  }
  
  const onFinishFailed = errorInfo =>  message.error(errorInfo)

  const changeConfirm = e => setPwdConfirm(e.target.value)

  return ( userMsg.isLogin ?
    <div className="user-info">
      <div className="wrap-upload">
        <MyUpload title="上传头像" />
      </div>
      <div className="wrap-form">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[
              {
                min: 4,
                max: 20,
                message: '请输入4~20位字符！'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                pattern:  /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                message: '请填写正确的邮箱格式！'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                pattern: /^.{6,12}$/,
                message: '密码应包括字母、数字以及下划线且长度在6~12位之间!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
          >
            <Input.Password value={pwdConfirm} onChange={changeConfirm} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button className="sub-btn" type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div> : <Redirect to="/ui/index" />
  )
}
