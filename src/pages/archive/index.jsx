import React, { useEffect } from 'react'
import { Timeline, Card } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeList } from '../../redux/actionCreators'
import './index.less'

export default function Archive() {

  const dataList = useSelector(state => state.articleReducer.articleList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHomeList())
  }, [dispatch])
 
  return (
    <Card bordered={false} className="archive">
      <Timeline>
        <Timeline.Item 
          dot={<ClockCircleOutlined className="red-circle" />} 
          color="red" style={{ lineHeight:'20px' }}
        >
          <span style={{ fontSize:'20px' }}>发布历史</span>
        </Timeline.Item>
        {
          dataList.map(item => {
            return (
              <Timeline.Item key={item.key}>
                <Link to={`/ui/detail/${item.key}`}>
                  <span className='mr20'>{item.publish}</span>
                  <span style={{ marginLeft:'15px' }}>{item.title}</span>
                </Link>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    </Card>
  )
}
