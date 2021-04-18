import React from 'react'
import { Layout, Col, BackTop, Row, Affix } from 'antd'
import MyHeader from '../header'
import MySider from '../sider'
import './index.less'

const { Content } = Layout

export default function UiLayout(props) {

  return (
    <>
      <Layout className="wrapper" style={{minHeight: '100vh'}}>
        <Affix offsetTop={0}>
          <MyHeader />
        </Affix>
        <Layout className="wrapper-container">
          <Layout className="wrapper-content">
            <Content 
              style={{ 
                paddingTop: 24, 
                margin: 0
              }}
            >
              <Row>
                <Col
                  lg={{ span: 5, offset: 1 }}
                  md={{ span: 6, offset: 1 }}
                  xs={{ span: 0 }}
                >
                  <MySider />
                </Col>
                <Col
                  lg={{ span: 16, offset: 1 }}
                  md={{ span: 16, offset: 1 }}
                  xs={{ span: 24 }}
                >
                  { props.children }
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <BackTop visibilityHeight='1200' />
    </>
  )
}
