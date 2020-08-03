import rootReducer from './reducers/indexReducer'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const ENV = process.env.NODE_ENV
let enhance = applyMiddleware(thunk)

enhance = ENV === 'production'
  ? enhance
  : composeWithDevTools(enhance)

const store = createStore(rootReducer, enhance)
export default store
