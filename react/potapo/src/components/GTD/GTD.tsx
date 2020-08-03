import React, {Component} from 'react'
import GTDAction from './GTDAction'
import GTDList from './GTDList'

import {connect} from 'react-redux'
import {
  addGTD,
  updateGTD
} from '../../redux/actions/GTDActions'

import http from '../../config/http'

import _ from 'lodash'
import {format} from 'date-fns'
import NoData from './noData'

import './GTD.styl'

interface IGTDProps {
  initGTD: (payload: any[]) => any
  addGTD: (payload: any) => any
  updateGTD: (payload: any) => void
  GTDs: any[]
}

export class GTD extends Component<IGTDProps, any> {

  get unFinishedGTD() {
    // description 以及 ended_at 为 null 的就是刚刚开始的番茄土豆任务
    // 点击了开始番茄土豆之后，会出现倒计时，此时该番茄土豆的 description 和 ended_at 为 null
    // 当 input 出现时，提交信息后会修改该番茄土豆的 description 以及 ended_at
    return this.props.GTDs.filter(
      wm => !wm.description && !wm.ended_at && !wm.aborted && !wm?.extra?.deleted
    )[0]
  }

  get finishedGTDs() {
    const finishedGTDs = this.props.GTDs.filter(
      wm => wm.description && wm.ended_at && !wm.aborted && !wm?.extra?.deleted
    )
    // // 这里按照 x年x月x日 的形式排列数据
    return _.groupBy(finishedGTDs, (wm: any) => {
      return format(new Date(wm.started_at), 'yyyy-M-d')
    })
  }

  startGTD = async () => {
    try {
      const response = await http.post('/tomatoes', {
        duration: 1500000 // 25min = 25 * 60 * 1000ms
        // duration: 20000 // test 20s
      })
      this.props.addGTD(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  render() {
    const HasGTDs = <GTDList finishedGTDs={this.finishedGTDs}/>
    const NoGTDs = <NoData/>
    return (
      <div className="GTD">
        <GTDAction
          startGTD={this.startGTD}
          unFinishedGTD={this.unFinishedGTD}
          updateGTD={this.props.updateGTD}
        />
        {Object.keys(this.finishedGTDs).length > 0 ? HasGTDs : NoGTDs}
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    GTDs: state.GTDReducer,
    ...ownProps
  }
}

const mapDispatchToProps = {
  addGTD,
  updateGTD
}

export default connect(mapStateToProps, mapDispatchToProps)(GTD)
