import React, { Component } from 'react'
import { DeleteFilled, EnterOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import classNames from 'classnames'

import { connect } from 'react-redux'
import {editingTodo, syncUpdateTodo} from '../../redux/actions/todosActions'

import './todoItem.styl'

interface ITodoItemProps {
  key: number
  id: number
  user_id: number
  completed: boolean
  completed_at: any
  deleted: boolean
  description: string
  extra: any
  created_at: string
  updated_at: string
  syncUpdateTodo: (id: number, params: any) => (dispatch: any) => Promise<any>
  editingTodo: (payload: number) => any
  editing: boolean
}

interface ITodoItemState {
  editingText: string
}

export class todoItem extends Component<ITodoItemProps, ITodoItemState> {
  constructor(props: ITodoItemProps) {
    super(props)
    this.state = {
      editingText: this.props.description
    }
  }

  update = async (params: any) => {
    const {id} = this.props

    if (params.completed) {
      params.completed_at = new Date()
    }
    this.props.syncUpdateTodo(id, params)
  }

  getIntoEditingState = () => {
    this.props.editingTodo(this.props.id)
  }

  onKeyUp = (e: any) => {
    if (e.keyCode === 13 && this.state.editingText !== '') {
      this.update({
        description: this.state.editingText,
        editing: false
      })
    }
  }

  onBlur = (e: any) => {
    this.update({
      description: this.state.editingText,
      editing: false
    })
  }


  render() {

    const EditingUI = <div className="editing-input-wrapper">
      <textarea className="editing-input" value={this.state.editingText}
        onChange={e => this.setState({editingText: e.target.value.trim()})}
        onKeyUp={this.onKeyUp}
        onBlur={this.onBlur}
      />
      <div className="icon-wrapper">
        <EnterOutlined
          className="icon-enter"
          style={{
              cursor: 'pointer', fontSize: '16px'
            }}
          onClick={e => this.update({description: this.state.editingText})} />
        <DeleteFilled
          className="icon-delete"
          style={{
              cursor: 'pointer', fontSize: '16px'
            }}
          onClick={e => this.update({ deleted: true })} />
      </div>
    </div>

    const TextUI = <span className="text" onDoubleClick={this.getIntoEditingState}>{this.props.description}</span>

    const todoItemClasses = classNames({
      todoItem: true,
      editing: this.props.editing,
      completed: this.props.completed
    })

    return (
      <li className={todoItemClasses}>
        <Checkbox className="checkbox" checked={ this.props.completed }
          onChange={e => this.update({ completed: e.target.checked })}
        />
        {
          this.props.editing ? EditingUI : TextUI
        }
      </li>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...ownProps
})

const mapDispatchToProps = {
	editingTodo,
  syncUpdateTodo
}


export default connect(mapStateToProps,mapDispatchToProps)(todoItem)
