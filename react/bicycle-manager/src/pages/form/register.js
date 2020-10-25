import React from "react";
import {
  Card, Form, Button, Checkbox, Input,
  Radio, Select, TimePicker, DatePicker, Upload, Switch, InputNumber
} from "antd";
import moment from "moment";
import {UploadOutlined} from "@ant-design/icons"

const {Option} = Select;

export default class FormRegister extends React.Component {
  render() {
    const forItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        ws: 24,
        sm: 12
      }
    }
    return <div style={{width: '100%'}}>
      <Card title='注册表单'>
        <Form layout='horizontal'
              initialValues={{
                ['sex']: '1',
                ['age']: 3,
                ['birthday']: moment("2020-10-25"),
                ['address']: '上海市'
                // ['switch']: true
              }}>
          <Form.Item  {...forItemLayout}
                      label="用户名"
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
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      label="密码"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码',
                        },
                      ]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      label="性别"
                      name="sex"
                      rules={[
                        {
                          required: true,
                          message: '请选择性别',
                        },
                      ]}>
            <Radio.Group>
              <Radio value='1'>男</Radio>
              <Radio value='2'>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      label="年龄"
                      name="age"
                      rules={[
                        {
                          required: true,
                          message: '请输入年龄',
                        },
                      ]}>
            <InputNumber/>
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      name="select"
                      label="状态"
            // hasFeedback
                      rules={[{required: true, message: '请选择国家'}]}
          >
            <Select placeholder="请选择国家">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      name="hobby"
                      label="爱好"
            // hasFeedback
                      rules={[{required: true, message: '请选择爱好'}]}
          >
            <Select placeholder="请选择爱好" mode='multiple'>
              <Option value="swim">游泳</Option>
              <Option value="football">足球</Option>
              <Option value="basketball">篮球</Option>
              <Option value="bicycle">自行车</Option>
            </Select>
          </Form.Item>
          <Form.Item {...forItemLayout}
                     name="switch" label="Switch" valuePropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item  {...forItemLayout}
                      name='birthday'
                      label='生日'>
            <DatePicker showTime
                        format="YYYY-MM-DD HH:mm:ss"/>
          </Form.Item>
          <Form.Item {...forItemLayout} label='地址' name='address'>
            <Input.TextArea autoSize={
              {minRows: 4, maxRows: 6}
            }/>
          </Form.Item>
          <Form.Item {...forItemLayout}
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Card>
    </div>
  }
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
}

