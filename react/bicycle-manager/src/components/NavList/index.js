import React from "react";
import {Menu} from "antd";
import MenuConfig from '../../config/menuConfig'
import './index.less'
import {NavLink} from "react-router-dom";

const {SubMenu, Item} = Menu

export default class NavList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuTreeNode: null
    }
  }

  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)

    this.setState({menuTreeNode})
  }

  renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return <SubMenu key={item.key} title={item.title}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Item key={item.key}>
        <NavLink to={`/admin${item.key}`}>{item.title}</NavLink>
      </Item>
    })
  }

  render() {
    return <>
      <div className="logo">
        <img src="/assets/logo-ant.svg" alt="imooc"/>
        <h1>Imooc MS</h1>
      </div>
      <Menu theme='dark' mode='inline'>
        {this.state.menuTreeNode}
      </Menu>
    </>
  }
}
