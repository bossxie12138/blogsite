import React from 'react'
import { Input, Button, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { addMsgAction } from '../../redux/actionCreators'
import './index.less'

export default function Message(props) {

  const userInfo = useSelector(state => state.userReducer.userInfo)

  const isLogin = useSelector(state => state.userReducer.isLogin)

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  const onFinish = values => {
    if (!isLogin) {
      props.history.push('/login')
      return
    }
    const { username, avatar } = userInfo
    let createdAt = moment().format('YYYY-MM-DD')
    let sendRecord = {
      ...values,
      username,
      avatar,
      createdAt
    }
    dispatch(addMsgAction(sendRecord))
    form.resetFields()
  }

  return (
    <div className="msg-page">
      <div className="wrap-msg-form">
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: '请填写留言板！'
              }
            ]}
          >
            <Input.TextArea placeholder="向作者留言..." />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
