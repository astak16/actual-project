import React, { Component } from 'react'

import './countDown.styl'

interface ICountDownProps {
  time: number // 传入的倒计时，单位是 ms
  onEnd: () => void
  duration: number
}

interface ICountDownState {
  countDown: number // 倒计时，单位是 ms
}

let timerId:NodeJS.Timeout

export class countDown extends Component<ICountDownProps, ICountDownState> {

  constructor(props: ICountDownProps) {
    super(props)
    this.state = {
      countDown: this.props.time,
    }
  }

  get countDown() {
    const { countDown } = this.state
    const time = countDown
    const min = Math.floor(time/1000/60)
    const sec = Math.floor(time/1000%60)
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  }

  get progressWidth() {
    const { countDown } = this.state
    const { duration } = this.props
    return (Math.floor(100 - countDown * 100 / duration))
  }

  componentDidMount() {
    timerId = setInterval(()=> {
      const time = this.state.countDown
      this.setState({
        countDown: time - 1000
      })
      document.title = `${this.countDown} - GTD时间管理`

      if (time < 0) {
        document.title = 'GTD时间管理'
        this.props.onEnd()
        window.clearInterval(timerId)
      }
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(timerId)
    document.title = 'GTD时间管理'
  }

  render() {
    return (
      <div className="count-down">
        <div className="progress"
          style={{
            width: `${this.progressWidth}%`
          }}
        />
        <p className="time">{this.countDown}</p>
      </div>
    )
  }
}
