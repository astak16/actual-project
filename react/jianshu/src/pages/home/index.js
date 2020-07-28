import React, {PureComponent} from "react";
import {BackTop, HomeLeft, HomeRight, HomeWrapper} from "./style";
import Topic from "./component/Topic";
import List from "./component/List";
import Recommend from "./component/Recommend";
import Writer from "./component/Writer";
import {connect} from "react-redux";
import {actionCreators} from "./store";

class Home extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className='banner-img'
               src="//static.xiedaimala.com/xdml/image/fb0a9923-5abf-4856-95c7-eff07b5bcd51/2020-7-22-11-45-45.png"
               alt=""/>
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
        </HomeRight>
        {
          this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : ''
        }
      </HomeWrapper>
    )
  }

  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvents()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  handleScrollTop = () => {
    window.scrollTo(0, 0)
  }
}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    const action = actionCreators.getHomeInfo()
    dispatch(action)
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 400) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})
export default connect(mapState, mapDispatch)(Home);
