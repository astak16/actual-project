import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import Button from './Button'


const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size='large'>large button</Button>
    <Button size='small'>small button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href='http://www.baidu.com'>large button</Button>
  </>
)

storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸 Button', buttonWithSize)
  .add('不同类型 Button', buttonWithType)
