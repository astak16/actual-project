import React, {Component} from 'react'
import {connect} from 'react-redux'
import {format} from 'date-fns'
import _ from 'lodash'
import Polyline from './polyline'
import BarChart from './barChart'
import TodosHistory from './todosHistory/todosHistory'
import GTDsHistory from './GTDsHistory/GTDsHistory'
import MonthlyHistory from './monthlyHistory/monthlyHistory'
import {delegate} from '../../helper/util'
import classNames from 'classnames'
import http from '../../config/http'
import {addGTD} from '../../redux/actions/GTDActions'

import './statistics.styl'

interface IStatisticsProps {
  todos: any[]
  GTDs: any[]
  addGTD: (payload: any) => void
}

interface IStatisticsState {
  mapTitleVisible: any
  liWidth: number
  ulWidth: number
}

export class statistics extends Component
  <IStatisticsProps, IStatisticsState> {

  constructor(props: IStatisticsProps) {
    super(props)
    this.state = {
      mapTitleVisible: {
        monthlyTitle: {visible: false},
        GTDTitle: {visible: false},
        todosTitle: {visible: false}
      },
      liWidth: this.liRef.current?.offsetWidth || 0,
      ulWidth: this.ulRef.current?.offsetWidth || 0
    }
  }

  ulRef = React.createRef<HTMLUListElement>()
  liRef = React.createRef<HTMLLIElement>()

  updateSize = () => {
    const liWidth = this.liRef.current?.offsetWidth || 0
    let ulWidth = this.ulRef.current?.offsetWidth || 0
    ulWidth < 0 && (ulWidth = 0)
    this.state.liWidth !== liWidth && (
      this.setState({liWidth})
    )
    this.state.ulWidth !== ulWidth && (
      this.setState({ulWidth})
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  componentDidMount() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)

    delegate(this.ulRef.current, 'click', 'li', (e: any, el: any) => {
      const {className} = el
      this.setState({
        mapTitleVisible: {...this.initMapVisible(className)}
      })
    })
  }

  initMapVisible = (className: string) => {
    const newClassName = className.split(' ')[0]
    const {mapTitleVisible} = this.state
    const {visible} = mapTitleVisible[newClassName]
    mapTitleVisible[newClassName].visible = !visible
    Object.keys(mapTitleVisible).map(key => {
      return !newClassName.includes(key) && (mapTitleVisible[key].visible = false)
    })
    return mapTitleVisible
  }

  get finishedTodos() {
    return this.props.todos.filter((todo: any) => todo.completed && !todo.deleted)
  }

  get finishedGTDs() {
    return this.props.GTDs.filter(
      (wm: any) =>
        wm.description && wm.ended_at && !wm.aborted && !wm.extra?.deleted
    )
  }

  get dailyTodos() {
    // 这里获取到的是当天更新的 todos
    return _.groupBy(this.finishedTodos, (todo: any) => {
      return format(new Date(todo.updated_at), 'yyyy-MM-d')
    })
  }

  get dailyGTDs() {
    return _.groupBy(this.finishedGTDs, (wm: any) => {
      return format(new Date(wm.updated_at), 'yyyy-MM-d')
    })
  }

  get monthlyGTDs() {
    const weekData: any = {}
    this.finishedGTDs.forEach((wm: any) => {
      const day = new Date(wm.created_at).getDate()
      if (!(day in weekData))
        weekData[day] = []
      weekData[day].push(wm)
    })
    return Object.keys(weekData).map((key) => [...weekData[key]])
  }

  get monthlyGTDsLength() {
    return this.finishedGTDs.filter(
      wm =>
        new Date(wm.started_at).getMonth()
        ===
        new Date().getMonth()
    ).length
  }

  addNewGTD = async (params: any) => {
    try {
      const response = await http.post(`/tomatoes`, params)
      this.props.addGTD(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    const monthlyTitleClasses = classNames({
      monthlyTitle: true,
      visible: this.state.mapTitleVisible.monthlyTitle.visible
    })

    const GTDTitleClasses = classNames({
      GTDTitle: true,
      visible: this.state.mapTitleVisible.GTDTitle.visible
    })

    const todosTitleClasses = classNames({
      todosTitle: true,
      visible: this.state.mapTitleVisible.todosTitle.visible
    })

    return (
      <>
        <ul className="statistics" ref={this.ulRef}>
          <li className={monthlyTitleClasses} ref={this.liRef}>
            <h3 className="title">周统计</h3>
            <div className="description-wrapper">
            <span className="description">
              {new Date().getMonth() + 1}月累计
            </span>
              <span className="number">
              {this.monthlyGTDsLength}
            </span>
            </div>
            <BarChart
              data={this.monthlyGTDs}
              finishedCount={this.state.liWidth}
            />
          </li>
          <li className={GTDTitleClasses}>
            <h3 className="title">历史</h3>
            <div className="description-wrapper">
              <span className="description">累计完成</span>
              <span className="number">{this.finishedGTDs.length}</span>
            </div>
            <Polyline
              data={this.dailyGTDs}
              finishedCount={this.finishedGTDs.length}
              width={this.state.liWidth}
            />
          </li>
          <li className={todosTitleClasses}>
            <h3 className="title">任务历史</h3>
            <div className="description-wrapper">
              <span className="description">累计完成任务</span>
              <span className="number">{this.finishedTodos.length}</span>
            </div>
            <Polyline
              data={this.dailyTodos}
              finishedCount={this.finishedTodos.length}
              width={this.state.liWidth}
            />
          </li>
        </ul>
        <div className="history-wrapper">
          <div className={monthlyTitleClasses}>
            <MonthlyHistory
              finishedTodos={this.finishedTodos}
              finishedGTDs={this.finishedGTDs}
              width={this.state.ulWidth}/>
          </div>
          <div className={GTDTitleClasses}>
            <GTDsHistory
              addNewGTD={this.addNewGTD}
            />
          </div>
          <div className={todosTitleClasses}>
            <TodosHistory/>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  todos: state.todosReducer,
  GTDs: state.GTDReducer,
  ownProps
})

const mapDispatchToProps = {
  addGTD
}

export default connect(mapStateToProps, mapDispatchToProps)(statistics)
