# react 仿简书项目

### 项目结构

```js
src/common;   // 公共组件
src/pages;    // 页面
src/static;   // 静态资源
src/store;    // 主 store
```

每个组件都有自身`store`，最外面的`store`负责将各个组件的`store`组合在一起

```js
// src/sotre/reducer.js
import {combineReducers} from "redux-immutable";

export default combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer
})
```

### 此项目使用的技术栈：

- `react-router`
- `react-redux`
- `react-loadable`
- `react-transition-group`
- `redux-immutable`
- `redux-thunk`
- `styled-components`