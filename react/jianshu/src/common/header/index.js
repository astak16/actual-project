import React, {Component} from "react";
import {CSSTransition} from "react-transition-group";
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  SearchWrapper,
  Addition,
  Button,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchInfoList
} from "./style";
import {connect} from "react-redux";
import {actionCreators} from "./store/actionCreators";
import {actionCreators as loginActionCreators} from "../../pages/login/store";
import {Link} from "react-router-dom";

class Header extends Component {
  render() {
    const {focused, list, handleInputFocus, handleInputBlur, login, logout} = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ?
              <NavItem className='right' onClick={logout}>退出</NavItem> :
              <Link to='/login'>
                <NavItem className='right'>登录</NavItem>
              </Link>
          }
          <NavItem className='right'>
            <i className='iconfont'>&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition timeout={200}
                           in={focused}
                           classNames='slide'
            >
              <NavSearch className={focused ? 'focused' : ''}
                         onFocus={() => handleInputFocus(list)}
                         onBlur={handleInputBlur}
              />
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writing'>
              <i className='iconfont'>&#xe708;</i>
              写文章
            </Button>
          </Link>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }

  getListArea = () => {
    const {
      focused, mouseIn, list, page, totalPage,
      handleMouseEnter, handleMouseLeave, handleChangePage
    } = this.props
    const newList = list.toJS()
    const pageList = []

    if (newList.length) {
      for (let i = ((page - 1) * 10); i < page * 10; i++) {
        pageList.push(<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>)
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
              <i className='iconfont spin'
                 ref={icon => this.spinIcon = icon}
              >&#xe852;</i>
              换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.get('header').get('focused'),  // state.getIn(['header', 'focused'])
    list: state.getIn(['header', 'list']),
    totalPage: state.getIn(['header', 'totalPage']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if (list.size === 0) {
        dispatch(actionCreators.getList())
      }
      dispatch(actionCreators.searchFocus())
    },

    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },

    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },

    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },

    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
      if (originAngle)
        originAngle = parseInt(originAngle, 10)
      else
        originAngle = 0

      spin.style.transform = `rotate(${originAngle + 360}deg)`
      if (page < totalPage)
        dispatch(actionCreators.changePage(page + 1))
      else
        dispatch(actionCreators.changePage(1))
    },

    logout() {
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
