import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs, Pagination } from 'antd'
import TodosHistoryItem from './todosHistoryItem'
import {
  dayOfWeekTransfer,
  yearMonthDayTransfer
} from '../../../helper/util'

import './todosHistory.styl'

const TabPane = Tabs.TabPane

interface ITodosHistoryProps {
  todos: any[]
}
interface ITodosHistoryState {
  currentPage: number
  deletedCurrentPage: number
}

export class todosHistory extends Component
<ITodosHistoryProps, ITodosHistoryState> {
  constructor(props: ITodosHistoryProps) {
    super(props)
    this.state = {
      currentPage: 1,
      deletedCurrentPage: 1
    }
  }

  get finishedTodos() {
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted)
  }
  get deletedTodos() {
    return this.props.todos.filter((todo: any) => todo.deleted)
  }
  get dailyFinishedTodos() {
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-dd')
    })
  }
  get finishedDatesKeys() {
    const {currentPage} = this.state
    return Object.keys(this.dailyFinishedTodos)
    .sort(
      // 倒序排列
      (a, b) => Date.parse(b) - Date.parse(a)
    )
    .slice((currentPage-1)*3, currentPage*3) // 分页逻辑
  }

  get finishedTodosLength() {
    return this.finishedTodos.length
  }

  get deletedTodosLength() {
    return this.deletedTodos.length
  }

  togglePagination = (currentPage: number) => {
    this.setState({currentPage})
  }

  toggleDeletedPagination = (deletedCurrentPage: number) => {
    this.setState({deletedCurrentPage})
  }

  render() {
    const finishedTodosList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const todos = this.dailyFinishedTodos[datesKey]
        return (
          <div className="daily-todos" key={datesKey}>

            <div className="summary">
              <div className="date-wrapper">
                <p className="date">
                  <span className="year-month-day">{yearMonthDayTransfer(datesKey)}</span>
                  <span className="day">{dayOfWeekTransfer(datesKey)}</span>
                </p>
                <p className="finished-todos-count">完成了 {todos.length} 个任务</p>
              </div>
            </div>

            <div className="todos-list">
              {
                todos.map(
                  (todo: any) =>
                    <TodosHistoryItem
                      key={todo.id}
                      todo={todo}
                      itemType="finished"
                    />
                )
              }
            </div>
          </div>
        )
      }
    )

    const {deletedCurrentPage} = this.state
    const deletedTodosList = this.deletedTodos
    .slice((deletedCurrentPage - 1)*12, deletedCurrentPage*12)
    .map(
      (todo: any) =>
        <TodosHistoryItem
          key={todo.id}
          todo={todo}
          itemType="deleted"
        />
    )
    return (
      <Tabs defaultActiveKey="1" type="card">
				<TabPane tab="已完成的任务" key="1">
					<div className="todos-history">
						{finishedTodosList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={3} // 每页显示3条数据，可以与上面的 currentPage*3 对应上
              hideOnSinglePage={true}
              total={Object.keys(this.dailyFinishedTodos).length}
              current={this.state.currentPage}
              onChange={this.togglePagination}
            />
            <div></div>
            <p className="total-num-of-todos">总计 {this.finishedTodosLength} 个已完成的任务</p>
          </div>
				</TabPane>
				<TabPane tab="已删除的任务" key="2">
					<div className="todos-history">
						{deletedTodosList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={12}
              hideOnSinglePage={true}
              total={this.deletedTodos.length}
              current={this.state.deletedCurrentPage}
              onChange={this.toggleDeletedPagination}
            />
            <div></div>
            <p className="total-num-of-todos">总计 {this.deletedTodosLength} 个已删除的任务</p>
          </div>
				</TabPane>
			</Tabs>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todosReducer,
  ...ownProps
})

export default connect(mapStateToProps)(todosHistory)
