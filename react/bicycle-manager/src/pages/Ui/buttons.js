import React from "react";
import {Button, Card, Radio} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import './ui.less'

export default class Buttons extends React.Component {
  state = {size: 'default'}
  onHandleCloseLoading = () => {
    alert('button click')
  }
  handleChange = (e) => {
    this.setState({size: e.target.value})
  }

  render() {
    return <div>
      <Card title='基础按钮' className='card-wrap'>
        <Button type='primary'>Imooc</Button>
        <Button>Imooc</Button>
        <Button type='dashed'>Imooc</Button>
        <Button type='danger'>Imooc</Button>
        <Button disabled>Imooc</Button>
      </Card>
      <Card title='图形按钮' className='card-wrap'>
        <Button icon={<PlusOutlined/>}>创建</Button>
        <Button icon={<EditOutlined/>}>编辑</Button>
        <Button icon={<DeleteOutlined/>}>删除</Button>
        <Button shape='circle' icon={<SearchOutlined/>}/>
        <Button type='primary' icon={<SearchOutlined/>}>搜索</Button>
        <Button type='primary' icon={<DownloadOutlined/>}>下载</Button>
      </Card>
      <Card title='loading按钮' className='card-wrap'>
        <Button type='primary' loading={true}>确定</Button>
        <Button type='primary' shape='circle' loading={true}/>
        <Button loading={true}>点击加载</Button>
        <Button shape='circle' loading={true}/>
        <Button type='primary' onClick={this.onHandleCloseLoading}>关闭</Button>
      </Card>
      <Card title='按钮组' className='card-wrap'>
        <Button.Group>
          <Button type='primary' icon={<LeftOutlined/>}>返回</Button>
          <Button type='primary' icon={<RightOutlined/>}>前进</Button>
        </Button.Group>
      </Card>
      <Card title='按钮尺寸' className='card-wrap'>
        <Radio.Group onChange={this.handleChange} value={this.state.size}>
          <Radio value='small'>小</Radio>
          <Radio value='default'>中</Radio>
          <Radio value='large'>大</Radio>
        </Radio.Group>
        <Button type='primary' size={this.state.size}>Immoc</Button>
        <Button size={this.state.size}>Immoc</Button>
        <Button type='dashed' size={this.state.size}>Immoc</Button>
        <Button type='danger' size={this.state.size}>Immoc</Button>
      </Card>
    </div>
  }
}
