import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Alert, message, Form } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo, signIn, hasReadErrorInfo } from '../../redux/actions/userActions'

import './login.styl'

interface ILoginState {
  account: string
  password: string
}

interface ILoginProps {
  history: any
  errorInfo: any
  getUserInfo: () => (dispatch: any) => Promise<any>
  signIn: (params: any) => (dispatch: any) => Promise<any>
  hasReadErrorInfo: () => (dispatch: any) => Promise<any>
}

export class login extends Component<ILoginProps, ILoginState> {

  constructor(props: any) {
    super(props);
    this.state = {
      account: 'uccsuccs',
      password: 'zxc123456789',
    }
  }

  onChange = (key: keyof ILoginState, e: any) => {
    const newState = {} as ILoginState
    newState[key] = e.target.value
    this.setState(newState)
  }

  submit = async () => {
    const { account, password } = this.state
    if (!account) message.error('账号为空')
    if (!password) message.error('密码为空')

    if (!account || !password) return
    this.props.signIn({ account, password })
  }

  render() {
    const { errorInfo } = this.props
    return (
      <div className="page-login">
        <h1 className="login-header">登录</h1>
        {
          errorInfo ? (
            <Alert
              message={
                typeof errorInfo === 'string'
                  ? errorInfo // 网络问题
                  : errorInfo.reduce((acc: any, cur: any) => acc.concat(`+ ${cur}`),'') // 其他问题拼凑成字符串
              }
              type="error"
              showIcon={true}
              closable={true}
              onClose={()=>this.props.hasReadErrorInfo()}
              style={{marginBottom: '15px'}}
            />
          ) : null
        }
        <Form onFinish={this.submit}>
          <Input
            className="account-input"
            placeholder="账号" allowClear
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {this.onChange('account', e)}}
            style={{marginBottom: '1em'}}
            defaultValue={this.state.account}
          />
          <Input.Password
            className="password-input"
            placeholder="密码" allowClear
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {this.onChange('password', e)}}
            defaultValue={this.state.password}
          />
          <Button
            className="login-btn"
            htmlType="submit"
            type="primary">
              登录
          </Button>
        </Form>
        <p className="register-link">
          还没有账号？<Link to="/signUp">立即注册</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...state,
  errorInfo: state.userReducer.error,
})

const mapDispatchToProps = {
  getUserInfo,
  signIn,
  hasReadErrorInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
