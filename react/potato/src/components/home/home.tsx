import React, { Component } from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import Todos from '../todos/todos'
import GTD from '../GTD/GTD'
import Statistics from '../statistics/statistics'

import { connect } from 'react-redux'
import { getUserInfo, initTodos, initGTD } from '../../redux/actions/userActions'

import './home.styl'

interface IIndexState {
  userInfo: any
}

interface IIndexProps {
  userInfo: any
  getUserInfo: () => (dispatch: any) => Promise<any>
  initTodos: () => (dispatch: any) => Promise<any>
  initGTD: () => (dispatch: any) => Promise<any>
}

export class home extends Component<IIndexProps, IIndexState> {

  async componentWillMount() {
    this.props.getUserInfo()
    this.props.initGTD()
    this.props.initTodos()
  }

  render() {
    return (
      <div id="Home">
        <Header userInfo={this.props.userInfo} />
        <main className="content">
          <GTD/>
          <Todos/>
        </main>
        <main className="statistics-content">
          <Statistics/>
        </main>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...state,
  userInfo: state.userReducer.userInfo,
})

const mapDispatchToProps = {
  initTodos,
  initGTD,
  getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(home)
