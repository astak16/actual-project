import React from "react";
import {Col, Row} from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavList from "./components/NavList";
import './style/common.less'

export default class Admin extends React.Component {
  render() {
    console.log(this.props.children)
    return (
      <Row className='container'>
        <Col className='nav-left' span='3'>
          <NavList/>
        </Col>
        <Col className='main' span='21'>
          <Header/>
          <Row className='content'>
            {this.props.children}
          </Row>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
