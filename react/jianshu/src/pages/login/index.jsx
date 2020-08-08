import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Input, LoginBox, Button, LoginWrapper} from "./style";
import {actionCreators} from "./store";
import {Redirect} from "react-router-dom";

class Login extends PureComponent {
  render() {
    const {loginStatus} = this.props
    if(loginStatus){
      return <Redirect to='/'/>
    }else{
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder='账号' innerRef={(input) => this.account = input}/>
            <Input placeholder='密码' type='password' innerRef={(input) => this.password = input}/>
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login']),
})

const mapDispatch = (dispatch) => ({
  login(accountEle, passwordEle) {
    dispatch(actionCreators.login(accountEle, passwordEle))
  }
})

export default connect(mapState, mapDispatch)(Login);
