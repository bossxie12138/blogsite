import React, { useEffect } from 'react'
import { List, Tag } from 'antd'
import {
  FireOutlined,
  FolderOutlined,
  CalendarOutlined,
  EyeOutlined,
  CommentOutlined,
  HeartOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { color } from '../../utils'
import { getHomeList } from '../../redux/actionCreators'
import './index.less'

export default function ListPage(props) {

  const dispatch = useDispatch()

  const articleList = useSelector(state => state.articleReducer.articleList)

  useEffect(() => {
    dispatch(getHomeList())
  }, [dispatch])


  const IconText = ({ type, text }) => <span>{type}{text}</span>

  const getCount = Str => {
    if (Str !== null) {
      let arr = Str.split('|')
      let newArr = arr.map(item => JSON.parse(item))
      return newArr.length
    }else return 0
  }

  return (
    <div className="list">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={articleList}
        renderItem={ item => (
          <List.Item
            style={{cursor:'pointer'}}
            key={item.key}
            onClick={() => props.history.push(`/ui/detail/${item.key}`)}
            actions={
            [ 
              <IconText type={<FireOutlined />} text={
                item.hot.split('&').map(v => (
                  <Tag
                    key={item + Math.random()}
                    color={color[Math.floor(Math.random() * color.length)]}
                  >
                    {v}
                  </Tag>
                ))
              } />,
              <IconText type={<FolderOutlined  className="move-icon" />} text={
                  <Tag
                    key={item.classify + Math.random()}
                    color='green'
                  >
                    {item.classify}
                  </Tag>
              }/>,
              <IconText 
                type={<CalendarOutlined className="move-icon" />} 
                text={`${item.publish}`} 
              />,
              <IconText 
                type={<HeartOutlined className="move-icon" />} 
                text={`${item.like}`} 
              />,
              <IconText 
                type={<CommentOutlined className="move-icon" />} 
                text={getCount(item.commentList)} 
              />,
              <IconText 
                type={<EyeOutlined className="move-icon" />} 
                text={`${item.look} 次预览`} 
              />
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.introduce}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
