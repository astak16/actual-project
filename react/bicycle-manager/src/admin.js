import React from 'react'
import {Col, Row} from "antd";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavLeft from "./components/NavLeft";
import "./style/common.less"
import Home from "./pages/home";

export default class Admin extends React.Component {
  render() {
    return (
      <Row className='container'>
        <Col span={3} className="nav-left">
          <NavLeft/>
        </Col>
        <Col span={21} className="main">
          <Header/>
          <Row className="content">
            <Home/>
          </Row>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
