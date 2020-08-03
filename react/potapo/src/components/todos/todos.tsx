import React, { Component } from 'react'
import TodoInput from './todoInput'
import TodoItem from './todoItem'

import { connect } from 'react-redux'
import { updateTodo } from '../../redux/actions/todosActions'
import { Collapse } from 'antd'

import { MehOutlined } from '@ant-design/icons'

import './todos.styl'

const { Panel } = Collapse

export class todos extends Component<any> {

  get unDeletedTodos () { return this.props.todos.filter((todo: any) => !todo.deleted) }
  get unCompletedTodos () { return this.props.todos.filter((todo: any) => !todo.completed && !todo.deleted) }
  // 只显示 10 个已经完成的任务
  get completedTodos () { return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted).splice(0, 10) }

  render() {
    return (
      <div className="todos">
        <TodoInput />
        <main>
          <ul className="todo-list">
            {
              this.unCompletedTodos.length <= 0 &&
                <div className="no-data"><MehOutlined
                  style={{ fontSize: '15em', color: '#eee' }}
                /></div>
            }
            {
              this.unCompletedTodos.map((todo: any) =>
                <TodoItem key={todo.id} {...todo}/>
              )
            }
            {
              this.completedTodos.length > 0 &&
                <Collapse bordered={false} defaultActiveKey={['1']}>
                  <Panel header="最近完成的任务✔" key="1">
                    {
                      this.completedTodos.map((todo: any) =>
                        <TodoItem key={todo.id} {...todo}
                        />
                      )
                    }
                  </Panel>
                </Collapse>
            }
          </ul>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    todos: state.todosReducer,
    ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(todos)
