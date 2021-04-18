import React, { useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import { SmileOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import moment from '../../utils/moment'
import Picker from 'emoji-picker-react'
import { addCommetAction, getCommentAction } from '../../redux/actionCreators'
import './index.less'

const { TextArea } = Input

const CommentList = ({ comments }) => {

  const [isExtended, setIsExtended] = useState(false)

  const openHandle = () => setIsExtended(!isExtended)

  return (
    <List
      dataSource={comments}
      header={(
        <Fragment>
          <span>{`${comments.length}条评论 `}</span>&nbsp;
          { 
            !isExtended ? <DownOutlined onClick={openHandle} /> :
            <UpOutlined onClick={openHandle} />
          }
        </Fragment>
      )}
      itemLayout="horizontal"
      renderItem={item => (
        <li style={{display: !isExtended ? 'none' : 'block'}}>
          <Comment
            author={item.author}
            avatar={item.avatar}
            content={
              React.createElement(item.content.type,null,item.content.props.children)
            }
            datetime={item.datetime}
          />
        </li>
      )}
    />
  )
}

const Editor = ({ onChange, onSubmit, submitting, value, onSetEmoji }) => {

  const [isShow, setIsShow] = useState(false)

  const setShow = () => setIsShow(!isShow)

  const onEmojiClick = (_, emojiObject) => onSetEmoji(emojiObject.emoji)

  return (
    <>
      <div className="face-icon"><SmileOutlined onClick={setShow} /></div>
      { 
        isShow && (
          <div className="menu-icons">
            <Picker onEmojiClick={onEmojiClick} />
          </div> 
        )
      }
      <Form.Item>
        <TextArea 
          placeholder="写下你的评论...." 
          rows={4}
          className="comment-input"
          onChange={onChange} 
          value={value} 
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          发布
        </Button>
        <Button style={{marginLeft: '24px'}}  type="primary">
          取消
        </Button>
      </Form.Item>
    </>
  )
}

class CommentApp extends React.Component {

  state = {
    submitting: false,
    value: ''
  }

  componentDidMount() {
    let pusharr = this.props.way.split('/')
    let getId = Number(pusharr[pusharr.length-1])
    this.props.getComments(getId)
  }

  handleSubmit = () => {
    if (!this.props.login) {
      this.props.history.push('/login')
      return
    } else if(this.state.value === '') {
      message.error('内容不能为空！')
      return 
    }
    let pusharr = this.props.way.split('/')
    let articleId = Number(pusharr[pusharr.length-1])
    const { nickname, avatar } = this.props.userinfo
    let obj = {
      author: nickname,
      avatar,
      content: <p>{this.state.value}</p>,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    this.props.addComments(obj, articleId)
    message.success('添加评论成功！')
    this.setState({ value: '' })
  }

  handleChange = e => this.setState({ value: e.target.value })

  setEmoji = emoji => this.setState({value: this.state.value + emoji})

  render() {

    const { submitting, value } = this.state

    const { avatar, nickname } = this.props.userinfo

    return (
      <Fragment>
        {
          this.props.commentList.length > 0 && <CommentList 
          comments={this.props.commentList} 
          />
        }
        <Comment
          avatar={
            <Avatar
              src={avatar}
              alt={nickname}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              onSetEmoji={this.setEmoji}
            />
          }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    commentList: state.commentReducer.commentList,
    userinfo: state.userReducer.userInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComments: (config, id) => {
      dispatch(addCommetAction(config, id))
    },
    getComments: id => dispatch(getCommentAction(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentApp))