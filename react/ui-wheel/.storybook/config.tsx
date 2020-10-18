import {addDecorator, configure, addParameters} from "@storybook/react";
import * as React from "react";
import "../src/styles/index.scss"
import {withInfo} from '@storybook/addon-info'

configure(require.context('../src', true, /\.stories.tsx$/), module)

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }
// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
//
// addDecorator(CenterDecorator)


const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: {inline: true, header: false}})
