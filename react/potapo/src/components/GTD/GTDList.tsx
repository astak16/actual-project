import React, { Component } from 'react'
import { format } from 'date-fns'

import './GTDList.styl'

interface IGTDListProps {
  finishedGTDs: any
}

const GTDItem = (props: any) =>
<li className="GTD-item">
  <span className="time-range">
    {format(new Date(props.started_at), 'H:mm')} - {format(new Date(props.ended_at), 'H:mm')}
  </span>
  <span className="description">{props.description}</span>
</li>

export class GTDList extends Component<IGTDListProps, any> {

  get datesKeys() {
    const datesKeys = Object.keys(this.props.finishedGTDs)
    return datesKeys
      .sort((a, b) => Date.parse(b) - Date.parse(a))
      .splice(0, 3) // 只需要最近三天的数据
  }

  render() {
    const list = this.datesKeys.map(datesKey => {
      const GTDs = this.props.finishedGTDs[datesKey]
      return (
        <li className="daily-GTDs" key={datesKey}>
          <div className="title">
            <span className="date-time">{format(new Date(datesKey), 'M月d日')}</span>
            <span className="finished-GTD-number">完成了 {GTDs.length} 个番茄土豆</span>
          </div>
          <ul className="GTD-list-detail">
            {
              GTDs.map((wm: any) => <GTDItem key={wm.id} {...wm}/>)
            }
          </ul>
        </li>
      )
    })

    return (
      <ul className="GTD-list">
        {list}
      </ul>
    )
  }
}

export default GTDList
