import React, { useEffect } from 'react'
import { Card, Tag, Divider, Input, Affix } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { color } from '../../utils'
import { 
  getClassifyAction,
  getHomeList,
  getRecentAction,
  searchAction,
  seartchClassifyAction
} from '../../redux/actionCreators'
import './index.less'

const { Search } = Input

export default function Sider() {

  const history = useHistory()

  const recentDatas = useSelector(state => state.recentReducer.recentList)

  const classifyList = useSelector(state => state.classifyReducer.classifyList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClassifyAction())
    dispatch(getRecentAction())
  }, [dispatch])

  const siderClick = (v) => history.push(`/ui/detail/${v.key}`)

  const onSearch = v => v !== '' && dispatch(searchAction(v))

  const searchByClassify = value =>  dispatch(seartchClassifyAction(value))
  
  return (
    <div className="sider-container">
      <div className="search">
        <Search 
          placeholder="搜索文章" 
          onSearch={onSearch} 
          enterButton 
          allowClear
        />
      </div>
      <div className="tags-wrapper">
        <Card bordered={false} hoverable >
          <Divider orientation="left">文章导航</Divider>
          <div className="tags-content">
            <Tag
              onClick={() => dispatch(getHomeList())}
              color={color[Math.floor(Math.random()*color.length)]}
            >
              全部文章
            </Tag>
            {
              classifyList.map(v => (
                <Tag
                  key = {v.key}
                  onClick={ () => searchByClassify(v.classify) }
                  color={color[Math.floor(Math.random()*color.length)]}
                >
                  {v.classify}
                </Tag>
              ))
            }
          </div>
        </Card>
      </div>
      <div className="recent-article">
        <Affix offsetTop={86}>
          <Card bordered={false} hoverable>
            <Divider orientation="left">最近文章</Divider>
            <ul className="recent-list">
              {
                recentDatas.map(v => (
                  <li key={v.key} onClick={ () => siderClick(v) }>
                    {v.title}
                  </li>
                ))
              }
            </ul>
          </Card>
        </Affix>
      </div>
    </div>
  )
}
