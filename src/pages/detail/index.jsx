import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { EditorState, ContentState } from 'draft-js'
import {useSelector, useDispatch } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  CalendarOutlined,
  EyeOutlined,
  HeartOutlined,
  FolderOutlined
} from '@ant-design/icons'
import { CommentApp } from '../../components'
import {
  addLikeAction,
  addLookAction,
  getArtByIdAction
} from '../../redux/actionCreators'
import './index.less'

export default function Detail(props) {

  const dispatch = useDispatch()

  const dataList = useSelector(state => state.articleReducer.articleList)

  const userLogin = useSelector(state => state.userReducer.isLogin)

  const [isAdd, setIsAdd] = useState(false)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if(dataList.length) {
      const { content } = dataList[0]
      const contentBlock = htmlToDraft(content)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [dataList])

  useEffect(() => {
    let pusharr = props.location.pathname.split('/')
    let pushId = Number(pusharr[pusharr.length-1])
    dispatch(addLookAction(pushId))
    dispatch(getArtByIdAction(pushId))
  }, [dispatch, props.location.pathname])

  const addLike = () => {
    let pusharr = props.location.pathname.split('/')
    let pushId = Number(pusharr[pusharr.length-1])
    dispatch(addLikeAction(pushId))
    setIsAdd(true)
  }

  const extra = (
    <div className='content-extra'>
      <CalendarOutlined style={{ marginRight: 4 }} />
      { dataList.length  > 0 && dataList[0].publish }
      <EyeOutlined style={{ marginRight: 4, marginLeft: 12 }} />
      { dataList.length  > 0 && dataList[0].look } 次预览
    </div>
  )

  return (
    <div className="detail">
      <Card
        title={ dataList.length  > 0 && dataList[0].title}
        extra={extra}
      >
        <Editor
          readOnly
          toolbarHidden
          editorState={editorState}
          editorClassName="editor"
        />
        <div className="like">
          <span className="heart-icon">
            <HeartOutlined 
              className={isAdd?'heart-add':''} 
              onClick={addLike} 
              style={{ marginRight: '5px', cursor: 'pointer' }}  
            />
            { dataList.length  > 0  && dataList[0].like }
          </span>
          <span className="folder-icon">
            <FolderOutlined style={{ marginRight: '5px' }}  />
            { dataList.length  > 0 && dataList[0].classify }
          </span>
        </div>
        <div className="comment">
          <CommentApp login={userLogin} way={props.location.pathname} />
        </div>
      </Card>
    </div>
  )
}
