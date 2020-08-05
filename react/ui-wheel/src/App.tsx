import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/Button";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";

function App() {
  return (
    <div className="App">
      <div>
        <Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
          <MenuItem index={1}>cool link</MenuItem>
          <MenuItem index={2} disabled>cool link</MenuItem>
          <MenuItem index={3}>cool link</MenuItem>
        </Menu>
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
