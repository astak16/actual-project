import React, { Component } from 'react'
import {Button, DatePicker, Form, Input, message} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import './newGTD.styl'

const FormItem = Form.Item

interface INewGTDProps {
  cancelAddPane: () => void
  addNewGTD: (params: any) => void
}

interface INewGTDState {
  startedAt: any
  endedAt: any
  description: string
}

class newGTD extends Component
<INewGTDProps, INewGTDState> {
  constructor(props: INewGTDProps) {
    super(props)
    this.state = {
      startedAt: '',
      endedAt: '',
      description: ''
    }
  }

  // 提交时需要进行表单验证
  submitNewGTD = (values: any) => {
    const { startedAt, endedAt, description } = this.state

    if (!description) return message.error('请检查是否已经填写好[番茄土豆描述]')
    if (!endedAt || !startedAt) return message.error('请检查是否已经填写好[开始/结束]时间')
    if (startedAt.valueOf() > endedAt.valueOf()) return message.error('不合理的时间设置')

    this.props.addNewGTD({
      started_at: startedAt,
      ended_at: endedAt,
      description,
      manually_created: true
    })

    // 提交完成时应该关闭 pane
    this.props.cancelAddPane()
  }

  // 保存开始时间
  saveStartedAtTime = (e: any) => {
    if (!e) return this.setState({startedAt: ''})

    const startedAt =  new Date(e.toDate())
    if(startedAt !== this.state.startedAt) {
      const { endedAt } = this.state
      if(!endedAt) return this.setState({ startedAt })
      if(startedAt.valueOf() > endedAt.valueOf()) return message.error('不合理的时间设置')

      this.setState({ startedAt })
    }
  }

  // 保存结束时间
  saveEndedAtTime = (e: any) => {
    if (!e) return this.setState({endedAt: ''})

    const endedAt = new Date(e.toDate())
    if(endedAt !== this.state.endedAt) {
      const { startedAt } = this.state
      if(!startedAt) return this.setState({ endedAt })
      if(startedAt.valueOf() > endedAt.valueOf()) return message.error('不合理的时间设置')

      this.setState({ endedAt })
    }
  }

  // 保存番茄土豆描述
  saveDescription = (e: any) => {
    if(e.target.value === this.state.description) return
    this.setState({ description: e.target.value })
  }

  // 不可选择的日期
  disabledDate = (current: any) => {
    return current && current.toDate() > new Date()
  }

  render() {
    return (
      <div className="new-GTD-pane">
        <Form onFinish={this.submitNewGTD}>
          <div>
            <FormItem label="开始日期">
              <DatePicker showTime={true} onChange={this.saveStartedAtTime}
                locale={locale}
                disabledDate={this.disabledDate} format='YYYY-MM-DD HH:mm'/>
            </FormItem>
          </div>
          <div>
            <FormItem label="结束日期">
              <DatePicker showTime={true} onChange={this.saveEndedAtTime}
                locale={locale}
                disabledDate={this.disabledDate}  format='YYYY-MM-DD HH:mm'/>
            </FormItem>
          </div>
          <div>
            <FormItem label="描述">
              <Input value={this.state.description} onChange={this.saveDescription}/>
            </FormItem>
          </div>
          <div>
            <FormItem>
              <Button className="submit-btn" type="primary" htmlType="submit">提交</Button>
              <Button type="default" onClick={this.props.cancelAddPane} htmlType="button">取消</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    )
  }
}

export default newGTD
