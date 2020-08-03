import {
  ADD_GTD,
  INIT_GTD,
  UPDATE_GTD,
  FETCH_GTD_SUCCESS,
} from '../actionTypes'

export default (state: any[] = [], action: any) => {
  switch(action.type) {
    case ADD_GTD:
      return [action.payload, ...state]
    case FETCH_GTD_SUCCESS:
    case INIT_GTD:
      return [...(action.payload).map((wm: any) => {
        if (!wm.extra) {
          wm.extra = {}
          Object.assign(wm.extra, { deleted: false })
        }
        return wm
      })]
    case UPDATE_GTD:
      return state.map(wm => {
        return wm.id === action.payload.id
          ? action.payload
          : wm
      })
    default:
      return state
  }
}
