import React from "react";
import {Button, Card, Modal} from "antd";

import './ui.less'

export default class Modals extends React.Component {

  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  }

  handleOpen = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleConfirm = (type) => {
    Modal[type]({
      title: '确认',
      content: '你确定你学会 react 了吗？',
      onOk() {
        console.log('ok')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }

  render() {
    return <div>
      <Card title='基础模态框' className='card-wrap'>
        <Button onClick={() => this.handleOpen('showModal1')}>Open</Button>
        <Button onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
        <Button onClick={() => this.handleOpen('showModal3')}>顶部20px弹窗</Button>
        <Button onClick={() => this.handleOpen('showModal4')}>水平居中</Button>
      </Card>
      <Card title='信息确认框' className='card-wrap'>
        <Button onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
        <Button onClick={() => this.handleConfirm('info')}>Info</Button>
        <Button onClick={() => this.handleConfirm('success')}>Success</Button>
        <Button onClick={() => this.handleConfirm('warning')}>Warning</Button>
      </Card>
      <Modal title='react'
             visible={this.state.showModal1}
             okText='下一步'
             onCancel={() => this.setState({showModal1: false})}
      >
        <p>慕课网学习 react 高级课程</p>
      </Modal>
      <Modal title='react'
             visible={this.state.showModal2}
             okText='好的'
             cancelText='算了'
             onCancel={() => this.setState({showModal2: false})}
      >
        <p>慕课网学习 react 高级课程</p>
      </Modal>
      <Modal style={{top: 20}}
             title='react'
             visible={this.state.showModal3}
             onCancel={() => this.setState({showModal3: false})}
      >
        <p>慕课网学习 react 高级课程</p>
      </Modal>
      <Modal wrapClassName='vertical-center-modal'
             title='react'
             visible={this.state.showModal4}
             onCancel={() => this.setState({showModal4: false})}
      >
        <p>慕课网学习 react 高级课程</p>
      </Modal>
    </div>
  }
}
