import React, {Component} from 'react'
import {Tooltip} from 'antd'

import './dotLine.styl'

interface IDotLineProps {
  data: any
  xRange: number
  width: number
}

// 调整 x, y 点之间的坐标差，使得图形能够完全显示
const xBias = 70
const yBias = 10

// 调整点线图中圆圈大小用的
const MAX_WIDTH = 707
const MAX_RADIUS = 5
const times = MAX_RADIUS / MAX_WIDTH

export class dotLine extends Component
  <IDotLineProps> {

  points = () => {
    const {data, xRange, width} = this.props
    let yRange = Object.keys(data).reduce((acc, cur) => {
      return acc > data[cur].length ? acc : data[cur].length
    }, 0)
    yRange === 0 && (yRange = 5)
    return Object.keys(data).map(date => {
        const x = (new Date(date).getDate() - 0.5) / xRange * (width - xBias)
        const y = (1 - data[date].length / yRange) * 160 + yBias
        return [x, y, data[date].length]
      }
    )
  }

  get circleRadius() {
    const {width} = this.props
    let radius = width > MAX_WIDTH ? MAX_RADIUS : times * width
    return '' + radius
  }

  render() {
    return (
      <div className="dot-line">
        <svg width='100%' height='200'>
          <rect x={0} y={0} width='100%' height={170}/>
          <path
            d={
              // M,x,y,x1,y1 的形式画直线
              this.points().reduce((acc, cur) => (
                  acc.concat(`${cur.slice(0, 2).join(',')},`)
                ), 'M'
              )}
          />
          {
            // x 坐标轴上的值显示 1 2 3 4...
            this.points().map((point, index) => (
              index % 2 === 0 ?
                <text key={index} x={point[0] - 5} y="200">{index + 1}</text> :
                null
            ))
          }
          {
            this.points().map((point, index) => (
              <Tooltip
                key={index} placement="top"
                title={`${point[2]}`} overlayClassName='daily_tips'>
                <circle r={this.circleRadius} cx={point[0]} cy={point[1]}/>
              </Tooltip>
            ))
          }
        </svg>
      </div>
    )
  }
}

export default dotLine
