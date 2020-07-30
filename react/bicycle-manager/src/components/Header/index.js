import React from 'react'
import {Col, Row} from "antd";
import "./index.less"
import {formatDate} from "../../utils/utils";
import {Axios} from "../../axios";
import {option} from "../../config/key";

class Header extends React.Component {
  state = {}

  componentWillMount() {
    this.setState({userName: 'uccs'})
    setInterval(() => {
      const sysTime = formatDate(new Date().getTime())
      this.setState({sysTime})
    }, 1000)
    // this.getWeatherAPIData('北京')
  }

  getWeatherAPIData(city) {
    Axios.jsonP({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=${option.ak}`
    })
  }

  render() {
    return (
      <div className='header'>
        <Row className='header-top'>
          <Col span={24} className='header-top'>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='breadcrumb-title'>
            首页
          </Col>
          <Col span={20} className='weather'>
            <span className='date'>{this.state.sysTime}</span>
            <span className='weather-img'><img src="" alt=""/></span>
            <span className='weather-detail'>晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header
