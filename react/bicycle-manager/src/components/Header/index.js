import React from "react";
import {Col, Row} from "antd";
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      sysTime: ''
    }
  }

  componentDidMount() {
    this.getWeatherApiData()
    setInterval(() => {
      const sysTime = Util.formatDate(new Date().getTime())
      this.setState({sysTime})
    }, 1000)
    this.setState({
      userName: '天天天天天'
    })
  }

  getWeatherApiData() {
    const city = '上海'
    axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then(res => {
      if (res.status === 'success') {
        const data = res.results[0].weather_data[0]
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }

  render() {
    return <div className='header'>
      <Row className='header-top'>
        <Col span='24'>
          <span>欢迎，{this.state.userName}</span>
          <a href="https://www.baidu.com">退出</a>
        </Col>
      </Row>
      <Row className='breadcrumb'>
        <Col span='4' className='breadcrumb-title'>
          首页
        </Col>
        <Col span='20' className='weather'>
          <span className='date'>{this.state.sysTime}</span>
          <span className='weather-img'>
            <img src={this.state.dayPictureUrl } alt=""/>
          </span>
          <span className='weather-detail'>
            {this.state.weather}
          </span>
        </Col>
      </Row>
    </div>
  }
}
