import React, { Component } from 'react'
import { EnterOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions/todosActions'

import http from '../../config/http'

interface ITodoInputState {
  description: string
  focus: boolean
  mouseFocus: boolean
}

interface ITodoInputProps {
  addTodo: (payload: any) => any
}

export class todoInput extends Component<ITodoInputProps, ITodoInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      description: '',
      focus: false,
      mouseFocus: false
    }
  }

  // 获得焦点
  onFocus = (e: any) => {
    this.setState({ focus: true })
  }

  // 失去焦点
  onBlur = (e: any) => {
    this.setState({ focus: false })
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.description !== '') {
      this.addTodo()
    }
  }

  onChange = (e: any) => {
    this.setState({
      description: e.target.value
    })
  }

  addTodo = async () => {
    const { description } = this.state
    try {
      const response = await http.post('/todos', { description })
      this.props.addTodo(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
    this.setState({description: ''})
  }

  onMouseEnter = (e: any) => {
    this.setState({mouseFocus: true})
  }
  onMouseLeave = (e: any) => {
    this.setState({mouseFocus: false})
  }

  render() {
    const { mouseFocus, description } = this.state
    const suffix = description || mouseFocus
      ? <EnterOutlined
      style={{
            fontSize: '18px', cursor: 'pointer'
          }}
      onClick={this.addTodo} />
      : <span/>
    return (
      <div className="todo-input">
        <Input placeholder="添加新任务"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={this.state.description}
          suffix={suffix}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todoInput)
