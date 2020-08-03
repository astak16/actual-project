import {
  ADD_GTD,
  INIT_GTD,
  UPDATE_GTD
} from '../actionTypes'

export const addGTD = (payload: any) => {
  return {
    type: ADD_GTD,
    payload
  }
}

export const initGTD = (payload: any[]) => {
  return {
    type: INIT_GTD,
    payload
  }
}

export const updateGTD = (payload: any) => {
  return {
    type: UPDATE_GTD,
    payload
  }
}
