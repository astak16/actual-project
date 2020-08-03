import {
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  HAS_READ_USER_ERROR
} from '../actionTypes'

export default (state: any = {userInfo: null}, action: any): any => {
  switch(action.type) {
    case VERIFY_USER_SUCCESS:
      return { userInfo: action.payload }
    case VERIFY_USER_FAILURE:
      return { ...state, error: action.error }
    case HAS_READ_USER_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}
