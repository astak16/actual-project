import React, { Component } from 'react'
import { format, getDaysInMonth } from 'date-fns'
import DotLine from './dotLine'
import classNames from 'classnames'
import { DatePicker } from 'antd'
import moment from 'moment'

import './monthlyHistoryCore.styl'

interface IMonthlyHistoryCoreProps {
  finishedData: any
  width: number
}

interface IMonthlyHistoryCoreState {
  currentMonth: string
  currentYear: string
}

const timeFormat = ['YYYY', 'MM']

export class monthlyHistoryCore extends Component
<IMonthlyHistoryCoreProps, IMonthlyHistoryCoreState> {
  constructor(props: IMonthlyHistoryCoreProps) {
    super(props)
    this.state = {
      currentMonth: format(new Date(), 'MM'),
      currentYear: format(new Date(), 'yyyy')
    }
  }

  get totalDays() {
    const { currentMonth, currentYear } = this.state
    return getDaysInMonth(new Date(`${currentYear}-${currentMonth}-1`))
  }

  get totalNumber() {
    return this.monthData.length
  }

  get daliyAverageNumber() {
    return (this.totalNumber/this.totalDays).toFixed(2)
  }

  get monthlyIncreaseNumber() {
    // 月增长量是通过对比上个月计算出来的
    const { currentMonth, currentYear } = this.state
    const prevYear = currentMonth === '01'
      ? `${Number(currentYear) - 1}`
      : currentYear
    let prevMonth = currentMonth === '01'
      ? `${12}`
      : `${Number(currentMonth) - 1}`
    Number(prevMonth) < 10 && (prevMonth = `0${prevMonth}`)

    const prevTotalNumber = this.props.finishedData
      .filter(
        (data: any) =>
        format(new Date(data.calTime), 'MM') === prevMonth
       )
      .filter(
        (data: any) =>
        format(new Date(data.calTime), 'yyyy') === prevYear
      ).length

    let increase = ((this.totalNumber - prevTotalNumber) / prevTotalNumber).toFixed(2)
    if (Number(increase) === Infinity) increase = '1.00'
    else if (!Number(increase)) increase = '0'
    return increase
  }

  get monthData(){
    const { finishedData } = this.props
    const { currentMonth, currentYear } = this.state
    return finishedData
      .filter(
        (data: any) =>
        format(new Date(data.calTime), 'MM') === currentMonth
       )
      .filter(
        (data: any) =>
        format(new Date(data.calTime), 'yyyy') === currentYear
      )
  }

  get dotLineData() {
    const { currentMonth, currentYear } = this.state
    const totalDays = this.totalDays

    // 初始化 map
    let arr = [...Array(totalDays)]
    const map = new Map()
    arr.forEach((item, index) => {
      const currentDay = index + 1
      const date = `${currentYear}-${currentMonth}-${
        currentDay < 10
          ? `0${currentDay}`
          : currentDay
      }`
      map.set(date, [])
    })

    // 将相同日期的数据组合进一个 list 中
    this.monthData.forEach((item: any) => {
      const date = format(new Date(item.calTime), 'yyyy-MM-dd')
      const list = map.get(date)
      list.push(item)
      map.set(date, list)
    })

    const data: any = {}
    for (const [key, value] of map) {
      data[key] = value
    }

    return { data, xRange: totalDays}
  }

  onChangeYear = (date: any, dateString: string) => {
    if (!date || !dateString || this.state.currentYear === `${dateString}`) return
    this.setState({ currentYear: dateString })
  }

  onChangeMonth = (date: any, dateString: string) => {
    if (!date || !dateString || this.state.currentMonth === `${dateString}`) return
    this.setState({ currentMonth: dateString })
  }

  render() {

    const { width } = this.props
    const {data, xRange} = this.dotLineData
    const monthlyIncreaseNumber = this.monthlyIncreaseNumber

    const monthlyIncreaseClasses = classNames({
      monthlyIncrease: true,
      number: true,
      growable: Number(monthlyIncreaseNumber) > 0
    })

    return (
      <div className="monthly-history-core">
        <div className="monthly-action">
          <span className="monthly-action-title">当前年月: </span>
          <div className="monthly-action-year">
            <DatePicker
              defaultValue={moment(this.state.currentYear, timeFormat[0])}
              format={timeFormat[0]}
              onChange={this.onChangeYear} picker="year" placeholder="请选择年份" />
            <span className="monthly-action-text">年</span>
          </div>
          <div className="monthly-action-month">
            <DatePicker
              defaultValue={moment(this.state.currentMonth, timeFormat[1])}
              format={timeFormat[1]}
              mode="month"
              onChange={this.onChangeMonth} picker="month" placeholder="请选择月份"/>
            <span className="monthly-action-text">月</span>
          </div>
        </div>
        <div className="monthly-history-statistics-wrapper">
          <ul>
            <li>
              <strong className="number">{this.totalNumber}</strong>
              <span className="unit">总数</span>
            </li>
            <li>
              <strong className="number">{this.daliyAverageNumber}</strong>
              <span className="unit">日平均数</span>
            </li>
            <li>
              <strong className={monthlyIncreaseClasses}>
                {
                  Number(monthlyIncreaseNumber) > 0
                    ? `+${monthlyIncreaseNumber}`
                    : `-${monthlyIncreaseNumber}`
                }
              </strong>
              <span className="unit">月增长量</span>
            </li>
          </ul>
          <DotLine data={data} xRange={xRange} width={width} />
        </div>
      </div>
    )
  }
}

export default monthlyHistoryCore
