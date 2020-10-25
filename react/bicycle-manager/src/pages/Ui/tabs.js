import React from "react";
import {Card, message, Tabs} from "antd";
import './ui.less'
import {PlusOutlined} from '@ant-design/icons'

const {TabPane} = Tabs

export default class Tab extends React.Component {
  newTabIndex = 0;
  state = {
    activeKey: '1',
    panes: []
  }
  callback = (key) => {
    message.info('Hi，你选择了标签: ' + key)
  }

  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    console.log(targetKey,action)
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({title: activeKey, content: 'New Tab Pane', key: activeKey});
    this.setState({panes, activeKey});
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({panes, activeKey});
  }

  componentDidMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3'
      }
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  }

  render() {
    return <div>
      <Card title='Tab标签' className='card-wrap'>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <TabPane tab='tab1' key='1'>欢迎学习 react课程1</TabPane>
          <TabPane tab='tab2' key='2' disabled>欢迎学习 react课程2</TabPane>
          <TabPane tab='tab3' key='3'>欢迎学习 react课程3</TabPane>
        </Tabs>
      </Card>
      <Card title='Tab带图的标签' className='card-wrap'>
        <Tabs defaultActiveKey='1' onChange={this.callback}>
          <TabPane tab={<span><PlusOutlined/>tab 1</span>} key='1'>欢迎学习 react课程1</TabPane>
          <TabPane tab={<span><PlusOutlined/>tab 2</span>} key='2'>欢迎学习 react课程2</TabPane>
          <TabPane tab={<span><PlusOutlined/>tab 3</span>} key='3'>欢迎学习 react课程3</TabPane>
        </Tabs>
      </Card>
      <Card title='Tab带图的标签' className='card-wrap'>
        <Tabs
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {
            this.state.panes.map((panel) => {
              return <TabPane
                tab={panel.title}
                key={panel.key}

              />
            })
          }
        </Tabs>
      </Card>
    </div>
  }

}
