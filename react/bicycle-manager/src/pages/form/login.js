import React from "react";
import {Button, Card, Checkbox, Form, Input, message} from 'antd'

const {Item} = Form

class FormLogin extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    console.log('Success:', values);
    message.success(`${values.username}恭喜你通过表单组件的学习，当前密码为：${values.password}`)
  }


  render() {
    return <div>
      <Card title='登录行内表单'>
        <Form>
          <Item>
            <Input placeholder='请输入用户名'/>
          </Item>
          <Item>
            <Input placeholder='请输入密码'/>
          </Item>
          <Item>
            <Button type='primary'>登录</Button>
          </Item>
        </Form>
      </Card>
      <Card title='登录水平表单' style={{marginTop: '10px'}}>
        <Form
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Item label="用户名"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                  {
                    min: 5, max: 10,
                    message: '长度不在范围内'
                  },
                  {
                    pattern: /^\w+$/g,
                    message: '用户名必须是英文字母或者数字'
                  }
                ]}>
            <Input/>
          </Item>
          <Item label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}>
            <Input.Password/>
          </Item>
          <Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Item>
          <Item>
            <Button type='primary' htmlType="submit">登录</Button>
          </Item>
        </Form>
      </Card>
    </div>
  }
}

export default FormLogin
