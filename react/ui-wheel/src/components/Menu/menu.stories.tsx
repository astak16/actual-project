import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Menu from './Menu'
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";


// const defaultButton = () => (
//   <Button onClick={action('clicked')}>default button</Button>
// )
//
// const buttonWithSize = () => (
//   <>
//     <Button size='large'>large button</Button>
//     <Button size='small'>small button</Button>
//   </>
// )
//
// const buttonWithType = () => (
//   <>
//     <Button btnType='primary'>primary button</Button>
//     <Button btnType='danger'>danger button</Button>
//     <Button btnType='link' href='http://www.baidu.com'>large button</Button>
//   </>
// )

const defaultMenu = () =>(
  <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>cool link</MenuItem>
    <MenuItem>cool link</MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>dropdown</MenuItem>
      <MenuItem>dropdown</MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('defaultMenu', defaultMenu)
