import {Change_List, Change_Page, Mouse_Enter, Mouse_Leave, Search_Blur, Search_Focus} from "./constants";
import {fromJS} from 'immutable'

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case Search_Focus:
      // immutable 对象的 set 方法，会结合之前 immutable 对象的值
      // 和设置的值，返回一个全新的对象
      return state.set('focused', true)
    case  Search_Blur:
      return state.set('focused', false)
    case Change_List:
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      })      // state.set('list', action.data).set('totalPage', action.totalPage)
    case Mouse_Enter:
      return state.set('mouseIn', true)
    case Mouse_Leave:
      return state.set('mouseIn', false)
    case Change_Page:
      return state.set('page', action.page)
    default:
      return state
  }
}
