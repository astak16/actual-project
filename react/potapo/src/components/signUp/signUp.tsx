import React, { Component } from 'react'
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Alert, Form } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo, register, hasReadErrorInfo } from '../../redux/actions/userActions'

import './signUp.styl'

interface ISignUpState {
  account: string
  password: string
  passwordConfirmed: string
}

interface ISignUpProps {
  history: any
  errorInfo: any
  getUserInfo: () => (dispatch: any) => Promise<any>
  register: (params: any) => (dispatch: any) => Promise<any>
  hasReadErrorInfo: () => (dispatch: any) => Promise<any>
}

export class signUp extends Component<ISignUpProps, ISignUpState> {

  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmed: ''
    }
  }

  componentDidMount() {
    this.props.getUserInfo()
  }

  onChange = (key: keyof ISignUpState, e: any) => {
    const newState = {} as ISignUpState
    newState[key] = e.target.value
    this.setState(newState)
  }

  submit = async () => {
    const { account, password, passwordConfirmed } = this.state
    if (!account) message.error('账号为空')
    if (!password) message.error('密码为空')
    if (!passwordConfirmed) message.error('确认密码为空')
    if (!account || !password || !passwordConfirmed) return
    if (password !== passwordConfirmed) {
      message.error('输入密码跟确认密码不一致')
      return
    }
    this.props.register({ account, password, password_confirmation: passwordConfirmed })
  }

  render() {
    const { errorInfo } = this.props
    return (
      <div className="page-sign-up">
        <h1 className="sign-up-header">注册</h1>
        {
          errorInfo ? (
            <Alert
              message={
                typeof errorInfo === 'string'
                  ? errorInfo // 网络问题
                  : 'username' + errorInfo.reduce((acc: any, cur: any) => acc.concat(` ${cur}`),'') // 其他问题拼凑成字符串
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
          />
          <Input.Password
            className="password-input"
            placeholder="密码" allowClear
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {this.onChange('password', e)}}
            style={{marginBottom: '1em'}}
          />
          <Input.Password
            className="password-confirmed-input"
            placeholder="确认密码" allowClear
            prefix={<SafetyCertificateOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => {this.onChange('passwordConfirmed', e)}}
            style={{marginBottom: '1em'}}
          />
          <Button
            className="sign-up-btn"
            htmlType="submit"
            type="primary">
              注册
          </Button>
        </Form>
        <p className="login-link">
          已经有账号？<Link to="/login">立即登录</Link>
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
  register,
  hasReadErrorInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(signUp)
