import React, {Component} from 'react'

import './barChart.styl'

interface IBarChartProps {
  data: any[]
  finishedCount: number
}

const height = 60
const gap = 3 // x 坐标之间的间隔

export class barChart extends Component<IBarChartProps> {
  points = () => {
    const {data, finishedCount} = this.props
    const xRange = 10
    // 利用 reduce 找出数据中7天中完成数最多的那天
    const yRange = data.reduce((acc, cur) => {
      return acc > cur.length ? acc : cur.length
    }, 0)
    // console.log(data)
    return data.map((item, index) => {
      const x = (index + gap) / xRange * finishedCount - 8
      let y = (1 - item.length / (yRange || 1)) * height
      y >= height && (y = height - 1)
      return [x, y]
    })
  }

  render() {
    return (
      <svg className="bar-chart" width='100%' height={height}>
        {
          this.points().map((point, index) => (
            <rect key={index} fill="rgba(215,78,78,0.5)"
                  x={point[0]} y={point[1]}
                  width={16} height={height - point[1] || 0}
            />
          ))
        }
      </svg>
    )
  }
}

export default barChart
