import React from "react";
import {Row, Col} from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavList from "./components/NavList";
import './style/common.less'
import Home from "./pages/home";

export default class Admin extends React.Component {
  render() {
    return (
      <Row className='container'>
        <Col className='nav-left' span='3'>
          <NavList/>
        </Col>
        <Col className='main' span='21'>
          <Header/>
          <Row className='content'>
            <Home/>
          </Row>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
