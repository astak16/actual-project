import http from '../../config/http'
import history from '../../config/history'

import {
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  FETCH_TODOS_SUCCESS,
  FETCH_GTD_SUCCESS,
  HAS_READ_USER_ERROR
} from '../actionTypes'

export const getUserInfo = () => async (dispatch: any) => {
  try {
    const response = await http.get('/me')
    const userInfo = response.data
    if (history.location.pathname !== '/') history.push('/')
    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: userInfo
    })
  } catch (e) {
    if (history.location.pathname === '/') history.push('/login')
  }
}

export const signIn = (params: any) => {
  return signInOrSignUpAction('/sign_in/user', params)
}

export const register = (params: any) => {
  return signInOrSignUpAction('/sign_up/user', params)
}

export const initTodos = () => {
  return initDataAction('/todos', FETCH_TODOS_SUCCESS)
}

export const initGTD = () => {
  return initDataAction('/tomatoes', FETCH_GTD_SUCCESS)
}

export const hasReadErrorInfo =()=>({
  type: HAS_READ_USER_ERROR
})



var initDataAction = (url: string, type: string) => async (dispatch: any) => {
  try {
    const response = await http.get(url)
    const { resources } = response.data
    dispatch({ type, payload: resources })
  } catch(e) {
    console.log(e)
  }
}

var signInOrSignUpAction = (url: string, params: any) => async (dispatch: any) => {
  try {
    await http.post(url, params)
    const response = await http.get('/me')
    const userInfo = response.data
    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: userInfo
    })
    history.push('/')
  } catch(e) {
    console.log(e.response)
    let errorInfo
    if(!e.response){
      errorInfo = '请检查网络是否正常'
    } else {
      const { errors } = e.response.data
      errorInfo = errors.account
      ? errors.account
      : errors
    }
    dispatch({
      type: VERIFY_USER_FAILURE,
      error: errorInfo
    })
  }
}
