import React from 'react'
import { Divider, Card, Button } from 'antd'
import { GithubOutlined, QqOutlined, MailOutlined } from '@ant-design/icons'
import './index.less'

export default function About(props) {

  const goMsgPage = () => props.history.push('/ui/message')

  return (
    <Card bordered={false} className="about-card">
      <div className="content-inner-wrapper about">
        <Divider orientation="left">Blog</Divider>
        <p>
          {
            `目前作者还处于学习阶段，搭建此站点的目的是为了记录自己平常所学，
            博客功能可能较为单一以及一些开发细节没有考虑到。
            后期会进行版本的迭代开发出更多功能，敬请期待。。。`
          }
        </p>
        <p>
          {
            `博客的前台展示以及中后台管理系统项目已经发布到github上了，欢迎各位大佬前来点星。
            由于服务端代码为简单的CRUD所以就不上传了。`
          }
        </p>
        <p>
          {
            `前端：React Hooks + antd + Redux + axios + 
            moment + localStorage + md5加盐加密 + jsonwebtoken + 
            webpack + less `
          }
        </p>
        <p>
          {`作者服务端的知识水平有限，这里简单使用了开源框架egg.js以及mysql进行博客各项内容的
            CRUD。当然如果有问题的话也可以向我留言，在后台看到的话我会尽快回复你！`}
          <Button onClick={goMsgPage} type="link" style={{ color: '#40A9FF'}}>
            向作者留言
          </Button>
        </p>
        <p className='code'>源码戳这里</p>
        <p>
          <a
          target="_blank"
          className='link'
          rel="noreferrer noopener"
          href="https://github.com/bossxie12138/blogAdmin">
            前台展示
          </a>
        </p>
        <p>
          <a
          target="_blank"
          className='link'
          rel="noreferrer noopener"
          href="https://github.com/bossxie12138/blogAdmin">
            后台管理系统
          </a>
        </p>
        <Divider orientation="left">Me</Divider>
        <ul className="about-list">
          <li>nickname：七羊老鬼</li>
          <li>
            <GithubOutlined />：
            <a
            target="_blank"
            className='link'
            rel="noreferrer noopener"
            href="https://github.com/bossxie12138">
              github
            </a>
          </li>
          <li>
            <QqOutlined />：
            <span>429473169</span>
            <Divider type="vertical" />
            <MailOutlined />：
            <span>xie20210312@163.com</span>
          </li>
          <li>坐标：贵州省</li>
          <li>学历专业：本科<Divider type="vertical" />电气工程自动化</li>
          <li>
            skill：
            <ul>
              <li>
               前端：React技术栈、ES6、Axios、Antd
              </li>
              <li>
                服务端：Node、egg.js
              </li>
              <li>
                数据库：Mysql
              </li>
              <li>
                其他：webpack、git、网站部署
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Card>
  )
}
