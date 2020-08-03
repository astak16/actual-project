import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateTodo } from '../../../redux/actions/todosActions'
import http from '../../../config/http'
import { timeTransfer, formatTimeToClock } from '../../../helper/util'

import './todosHistoryItem.styl'

interface ITodosHistoryItemProps {
  todo: any
  itemType: string
  updateTodo: (payload: any) => void
}

interface ITodosHistoryItemState {
  restoreText: string
  deleteText: string
}

export class todosHistoryItem extends Component
<ITodosHistoryItemProps, ITodosHistoryItemState> {

  constructor(props: ITodosHistoryItemProps) {
    super(props);
    this.state = {
      restoreText: '恢复',
      deleteText: '删除'
    }
  }

  update = async (e: any, params: any) => {
    const {id} = this.props.todo
    // const {className} = e.currentTarget
    // this.changeActionText({submit: true, className})
    try {
      const response = await http.put(`/todos/${id}`, params)
      this.props.updateTodo(response.data.resource)
      // this.changeActionText({submit: false, className})
    } catch (e) {
      throw new Error(e)
    }
  }

  changeActionText = (params: any) => {
    const { submit, className } = params
    if (className === 'restore') {
      submit ? this.changeRestoreText('提交中...') : this.changeRestoreText('恢复')
    }
  }

  changeRestoreText = (restoreText: string) => {
    this.setState({ restoreText })
  }

  changeDeleteText = (deleteText: string) => {
    this.setState({ deleteText })
  }

  render() {
    const { updated_at, created_at, description } = this.props.todo
    const { itemType } = this.props
    // 已完成的任务中有 恢复和删除按钮
    const restoreAndDeleteAction = <div className="action">
      <span className="restore" onClick={e => this.update(e, {completed: false})}>
        {this.state.restoreText}
      </span>
      <span className="delete" onClick={e => this.update(e, {deleted: true})}>
        {this.state.deleteText}
      </span>
    </div>
    // 已删除的任务中有 恢复按钮
    const restoreAction = <div className="action">
      <span className="restore" onClick={e => this.update(e, {deleted: false})}>
        {this.state.restoreText}
      </span>
    </div>

    const mapItemTypeToAction: any = {
      finished: {
        formatText: 'HH:mm',
        time: updated_at,
        action: restoreAndDeleteAction
      },
      deleted: {
        formatText: 'yyyy-MM-dd',
        time: created_at,
        action: restoreAction
      }
    }

    const {
      formatText,
      time,
      action
    } = mapItemTypeToAction[itemType]

    const clock = <span className="clock">{formatTimeToClock(time)}</span>

    return (
      <div className="todos-history-item">
        <div className="text">
          <span className="time">{timeTransfer(time, formatText, itemType)}</span>
          {
            itemType === 'deleted' ? clock : null
          }
          <span className="description">{description}</span>
        </div>
        { action }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todosHistoryItem)
