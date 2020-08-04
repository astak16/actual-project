import { combineReducers } from 'redux'
import todosReducer from './todosReducer'
import GTDReducer from './GTDReducer'
import userReducer from './userReducer'

export default combineReducers({
  todosReducer,
  GTDReducer,
  userReducer
})
