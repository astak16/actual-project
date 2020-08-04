import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDITING_TODO,
  SYNC_UPDATE_TODO_SUCCESS,
  SYNC_UPDATE_TODO_ERROR,
} from '../actionTypes'

import http from '../../config/http'

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  }
}

export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload
  }
}

export const syncUpdateTodo = (id: number, params: any) => async (dispatch: any) => {
  try {
    const response = await http.put(`/todos/${id}`, params)
    const payload = response.data.resource
    dispatch({
      type: SYNC_UPDATE_TODO_SUCCESS,
      payload
    })
  } catch (error) {
    dispatch({
      type: SYNC_UPDATE_TODO_ERROR,
      error
    })
  }
}

export const editingTodo = (payload: number) => {
  return {
    type: EDITING_TODO,
    payload
  }
}
