import {fromJS} from 'immutable'
import {Change_Detail} from "./constants";

const defaultState = fromJS({
  title: '',
  content: ''
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case Change_Detail:
      return state.merge({
        title: action.title,
        content: action.content
      })
    default:
      return state
  }
}
