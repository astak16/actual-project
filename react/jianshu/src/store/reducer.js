import {headerReducer} from '../common/header/store'
import {homeReducer} from '../pages/home/store'
import {combineReducers} from "redux-immutable";
import {detailReducer} from "../pages/detail/store";
import {loginReducer} from '../pages/login/store'

export default combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer
})
