import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/Button";

function App() {
  return (
    <div className="App">
      <div>
        {/*<Button> Hello </Button>*/}
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
