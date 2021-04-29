import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionAction } from '../../redux/actionCreators'
import './index.less'

export default function Collection() {

  const dataList = useSelector(state => state.collectionReducer.collectionList)

  const dispatch = useDispatch()

  const [pageNo, setPageNo] = useState(1)

  const [pageSize, setPageSize] = useState(8)

  useEffect(() => {
    dispatch(getCollectionAction())
  }, [dispatch])


  const handleOnChange = (page,pageSize) => {
    setPageNo(page)
    setPageSize(pageSize)
  }

  const pagination = {
    pageSize,
    size: 'small',
    current: pageNo,
    showTitle: false,
    total: dataList.length,
    onChange: handleOnChange
  }
  
  return (
    <div className="collection">
      <List
        className="star-list"
        header={<div className="star-header">收藏列表</div>}
        itemLayout="vertical"
        pagination={ dataList.length ? pagination : null }
        dataSource={dataList}
        renderItem={item => (
          <List.Item key={item.key} extra={item.publish} >
            <List.Item.Meta 
              className="item-des"
              description={[
                <a key={item.key} href={item.content} 
                  target='_blank' 
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ]}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
