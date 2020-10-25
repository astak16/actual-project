import React from "react";
import {Alert, Card, Spin} from "antd";
import './ui.less'
import {LoadingOutlined} from '@ant-design/icons'

export default class Loading extends React.Component{
  render() {
    return <div>
      <Card title='Spin用法' className='card-wrap'>
        <Spin size='small'/>
        <Spin style={{margin: '0 10px'}}/>
        <Spin size='large'/>
        <Spin indicator={<LoadingOutlined />} style={{margin: '0 10px'}}/>
      </Card>
      <Card title='内容遮罩' className='card-wrap'>
        <Spin>
          <Alert message='React'
                 description='欢迎来到React高级实战课程'
                 type='warning'
          />
        </Spin>
        <Spin tip='加载中...'>
          <Alert message='React'
                 description='欢迎来到React高级实战课程'
                 type='warning'
          />
        </Spin>
      </Card>
    </div>
  }
}
