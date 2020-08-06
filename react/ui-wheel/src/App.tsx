import React, {useState} from 'react';
import Button from "./components/Button/Button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Icon from "./components/Icon/Icon";
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons";
import Transition from "./components/Transition/Transition";

library.add(fas)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <div>
        <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link</MenuItem>
          <MenuItem>cool link</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown</MenuItem>
            <MenuItem>dropdown</MenuItem>
          </SubMenu>
        </Menu>
        <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)} mode='vertical' defaultOpenSubMenus={['3']}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link</MenuItem>
          <MenuItem>cool link</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown</MenuItem>
            <MenuItem>dropdown</MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div>
        <Icon icon="coffee" theme="danger" size="10x"/>
      </div>
      <div>
        <Button disabled>Disabled Hello</Button>
        <Button btnType='primary' size='large'>Large Hello</Button>
        <Button btnType='danger' size='small'>Small Hello</Button>
        <Button btnType='link' href='http://www.baidu.com' disabled>Disabled Baidu</Button>
        <Button btnType='link' href='http://www.baidu.com'>Baidu</Button>
      </div>
      <Button size='large' onClick={() => setShow(!show)}>按钮</Button>
      <Transition in={show} timeout={300} animation='zoom-in-bottom'>
        <div>
          <p>edit <code>src/app.tsx</code> and save to reload</p>
          <p>edit <code>src/app.tsx</code> and save to reload</p>
          <p>edit <code>src/app.tsx</code> and save to reload</p>
          <p>edit <code>src/app.tsx</code> and save to reload</p>
          <Button btnType='primary' size='large'>A Large Button</Button>
        </div>
      </Transition>
    </div>
  );
}

export default App;
