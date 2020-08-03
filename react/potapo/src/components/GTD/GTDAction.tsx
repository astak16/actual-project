import React, {Component} from 'react'
import {CloseCircleOutlined} from '@ant-design/icons';
import {Button, Input, Modal} from 'antd';

import CountDown from './countDownHooks'
import http from '../../config/http'

import './GTDAction.styl'

interface IGTDActionProps {
  startGTD: () => void
  updateGTD: (payload: any) => any
  unFinishedGTD: any
}

interface IGTDActionState {
  description: string
  visible: boolean
  audioUrl: string
}

const timeup = '/meta/timeup.mp3'
const timeStart = '/meta/dida.mp3'

export class GTDAction extends Component
  <IGTDActionProps, IGTDActionState> {
  audio: React.RefObject<HTMLAudioElement>

  constructor(props: IGTDActionProps) {
    super(props)
    this.audio = React.createRef()
    this.state = {
      description: '',
      visible: false,
      audioUrl: timeStart
    }
  }

  onEnd = () => {
    this.forceUpdate()
  }

  onKeyUp = (e: any) => {
    const {description} = this.state
    const ended_at = new Date()
    if (e.keyCode === 13 && description !== '') {
      // 更新该番茄土豆的 description 以及 ended_at aborted
      this.updateGTD({description, ended_at})
      this.setState({description: ''})
    }
  }

  abortGTD = (e: any) => {
    const {description} = this.state
    if (e.keyCode === 13 && description !== '') {
      this.updateGTD({aborted: true})
      this.setState({description: '', visible: false})
    }
  }

  updateGTD = async (params: any) => {
    const {id} = this.props.unFinishedGTD
    try {
      const response = await http.put(`/tomatoes/${id}`, params)
      this.props.updateGTD(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  handleOk = (e: any) => {
    this.audioPause()
    const {description} = this.state
    const ended_at = new Date()
    this.updateGTD({description, ended_at})
    this.setState({
      description: '',
      visible: false,
    })
  }

  handleCancel = (e: any) => {
    this.setState({visible: false})
  }

  abort = () => {
    this.setState({visible: true})
  }

  startGTD = async () => {
    await this.props.startGTD()
    this.audioPlay()
  }

  audioPlay = () => {
    this.audio.current && this.audio.current.play()
  }

  audioPause = () => {
    this.audio.current && this.audio.current.pause()
  }

  render() {
    let GTD = this.props.unFinishedGTD
    let html = <div/>

    // eslint-disable-next-line
    const modal = <Modal
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okText="放弃"
      cancelText="取消"
    >
      <h3 style={{
        textAlign: 'center'
      }}>你被什么事情打断了?</h3>
      <Input
        value={this.state.description}
        onChange={e => this.setState({description: e.target.value})}
        onKeyUp={e => this.abortGTD(e)}
      />
    </Modal>
    const closeIcon = <CloseCircleOutlined
      className="icon-close"
      style={{
        color: '#bbb',
        cursor: 'pointer'
      }}
      onClick={this.abort}/>
    if (GTD === undefined) {
      this.audioPause()
      html = <Button className="start-task-btn" onClick={this.startGTD}>开始🍉</Button>
    } else {
      this.audioPlay()
      const startedAtTime = Date.parse(GTD.started_at)
      const currentTime = new Date().getTime()
      const deltaTime = currentTime - startedAtTime
      const {duration} = GTD

      // 倒计时已到
      if (deltaTime >= duration) {
        this.audioPause()
        // 显示 input 框
        html = <div className="input-wrapper">
          <Input
            placeholder="你刚刚完成了什么工作?"
            value={this.state.description}
            onChange={e => this.setState({description: e.target.value})}
            onKeyUp={e => this.onKeyUp(e)}
          />
          {closeIcon}
        </div>
      } else if (deltaTime < duration) {
        // 显示倒计时组件
        const time = duration - deltaTime
        html = <div className="count-down-wrapper">
          <CountDown notification={this.setNotification} time={time} onEnd={this.onEnd} duration={duration}/>
          {closeIcon}
        </div>
      }
    }

    return (
      <div className="GTD-action">
        <audio src={this.state.audioUrl} controls loop ref={this.audio}/>
        {html}
        {modal}
      </div>
    )
  }

  componentDidMount() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // this.setNotification()
        console.log('用户允许通知');
      } else if (permission === 'denied') {
        console.log('用户拒绝通知');
      }
    });
  }

  setNotification() {
    this.setState({
      audioUrl: timeup
    }, () => {
      this.audioPlay()
      const id = setTimeout(() => {
        this.setState({audioUrl: timeStart}, () => clearTimeout(id))
      }, 1300)
    })
    new Notification('时间到', {body: "休息下吧"})
  }

  componentWillUnmount() {
    this.audioPause()
  }
}

export default GTDAction
