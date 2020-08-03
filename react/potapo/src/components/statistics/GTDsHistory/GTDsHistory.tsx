import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import _ from 'lodash'
import { Tabs, Pagination, Button, Tooltip } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import {
  dayOfWeekTransfer,
  yearMonthDayTransfer
} from '../../../helper/util'
import GTDHistoryItem from './GTDsHistoryItem'
import AddNewGTD from './newGTD'

import './GTDsHistory.styl'

const TabPane = Tabs.TabPane

interface IGTDsHistoryProps {
  GTDs: any[]
  addNewGTD: (params: any) => any
}
interface IGTDsHistoryState {
  currentPage: number
  abortedCurrentPage: number
  tabKey: string
  isShowSupplyPane: boolean
}

const List = (Props: any, Slot?: any) => {
  const { datesKey, GTDs, itemType } = Props
  return (
    <div className="daily-GTDs" key={datesKey}>

      <div className="summary">
        <div className="date-wrapper">
          <p className="date">
            <span className="year-month-day">{yearMonthDayTransfer(datesKey)}</span>
            <span className="day">{dayOfWeekTransfer(datesKey)}</span>
          </p>
          {Slot || ''}
        </div>
      </div>

      <div className="GTDs-list">
        {
          GTDs.map(
            (wm: any) =>
              <GTDHistoryItem
                key={wm.id}
                GTD={wm}
                itemType={itemType}
              />
          )
        }
      </div>
    </div>
  )
}

export class GTDsHistory extends Component
<IGTDsHistoryProps, IGTDsHistoryState> {
  constructor(props: IGTDsHistoryProps) {
    super(props)
    this.state = {
      currentPage: 1,
      abortedCurrentPage: 1,
      tabKey: '1',
      isShowSupplyPane: false
    }
  }

  get finishedGTDs() {
     return this.props.GTDs.filter(
       (wm: any) =>
        wm.description && wm.ended_at && !wm.aborted && !wm?.extra?.deleted
     )
  }

  get abortedGTDs() {
    return this.props.GTDs.filter((wm: any) => wm.aborted && !wm?.extra?.deleted)
  }

  get dailyFinishedGTDs() {
    return _.groupBy(this.finishedGTDs, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  get dailyAbortedGTDs() {
    return _.groupBy(this.abortedGTDs, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  get finishedDatesKeys() {
    const {currentPage} = this.state
    return Object.keys(this.dailyFinishedGTDs)
    .sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    )
    .slice((currentPage-1)*3, currentPage*3) // 分页逻辑
  }

  get abortedDatesKeys() {
    const {abortedCurrentPage} = this.state
    return Object.keys(this.dailyAbortedGTDs)
    .sort(
      (a, b) => Date.parse(b) - Date.parse(a)
    )
    .slice((abortedCurrentPage-1)*3, abortedCurrentPage*3) // 分页逻辑
  }

  get finishedTodosLength() {
    let length = 0
    Object.keys(this.dailyFinishedGTDs).forEach(key => {
      length += this.dailyFinishedGTDs[key].length
    })
    return length
  }
  get abortedTodosLength() {
    let length = 0
    Object.keys(this.dailyAbortedGTDs).forEach(key => {
      length += this.dailyAbortedGTDs[key].length
    })
    return length
  }

  togglePagination = (currentPage: number) => {
    this.setState({currentPage})
  }
  toggleAbortedPagination = (abortedCurrentPage: number) => {
    this.setState({abortedCurrentPage})
  }

  onChangeTab = (tabKey: string) => {
    tabKey !== this.state.tabKey && this.setState({tabKey})
  }

  cancelAddPane = () => {
    this.setState({isShowSupplyPane: false})
  }

  addNewGTD = (params: any) => {
    this.setState({isShowSupplyPane: true})
    this.props.addNewGTD(params)
  }

  onSupplyGTDBtnClick = () => {
    this.setState({isShowSupplyPane: !this.state.isShowSupplyPane})
  }

  render() {
    const finishedGTDsList = this.finishedDatesKeys.map(
      (datesKey: any) => {
        const GTDs = this.dailyFinishedGTDs[datesKey]
        const Props = { datesKey, GTDs, itemType: 'finished' }
        const Slot = <p className="finished-GTDs-count">完成了 {GTDs.length} 个番茄土豆</p>
        return List(Props, Slot)
      }
    )

    const abortedGTDsList = this.abortedDatesKeys.map(
      (datesKey: any) => {
        const GTDs = this.dailyAbortedGTDs[datesKey]
        const Props = { datesKey, GTDs, itemType: 'aborted' }
        return List(Props)
      }
    )
    const icon = this.state.isShowSupplyPane
      ? <MinusOutlined />
      : <PlusOutlined />
    const operations = this.state.tabKey === '1'
      ? (
        <Tooltip title="补记">
          <Button className="supply-GTD"
            icon={icon}
            onClick={this.onSupplyGTDBtnClick}
          />
        </Tooltip>
      )
      : null

    return (
      <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}
        onChange={this.onChangeTab}
      >
				<TabPane tab="完成的" key="1">
          {
            this.state.isShowSupplyPane ?
              <AddNewGTD
                cancelAddPane={this.cancelAddPane}
                addNewGTD={this.addNewGTD}
              /> :
              null
          }
					<div className="GTDs-history">
						{finishedGTDsList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={3} // 每页显示3条数据，可以与上面的 currentPage*3 对应上
              hideOnSinglePage={true}
              total={Object.keys(this.dailyFinishedGTDs).length}
              current={this.state.currentPage}
              onChange={this.togglePagination}
            />
            <p className="total-num-of-todos">总计 {this.finishedTodosLength} 个已完成的任务</p>
          </div>
				</TabPane>
				<TabPane tab="打断记录" key="2">
					<div className="GTDs-history">
						{abortedGTDsList}
					</div>
          <div className="tab-pane-page-footer">
            <Pagination defaultCurrent={1}
              pageSize={3}
              hideOnSinglePage={true}
              total={Object.keys(this.abortedGTDs).length}
              current={this.state.abortedCurrentPage}
              onChange={this.toggleAbortedPagination}
            />
            <p className="total-num-of-todos">总计 {this.abortedTodosLength} 个打断的任务</p>
          </div>
				</TabPane>
			</Tabs>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  GTDs: state.GTDReducer,
  ...ownProps
})

export default connect(mapStateToProps)(GTDsHistory)
