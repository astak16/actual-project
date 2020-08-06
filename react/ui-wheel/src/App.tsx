import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/Button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Icon from "./components/Icon/Icon";
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons";
library.add(fas)

function App() {
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
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Hello</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>Disabled Baidu</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' >Baidu</Button>
      </div>

    </div>
  );
}

export default App;
