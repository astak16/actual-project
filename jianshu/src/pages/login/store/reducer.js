import {fromJS} from 'immutable'
import {Change_Login, Change_Logout} from "./constants";

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case Change_Login:
      return state.set('login', action.value)
    case Change_Logout:
      return state.set('login', action.value)
    default:
      return state
  }
}
