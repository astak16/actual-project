import {
  Change_List,
  Change_Page,
  Mouse_Enter,
  Mouse_Leave,
  Search_Blur,
  Search_Focus
} from "./constants";
import axios from "axios";
import {fromJS} from "immutable";

const searchFocus = () => ({
  type: Search_Focus
})

const searchBlur = () => ({
  type: Search_Blur
})

const changeList = (data) => ({
  type: Change_List,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
})

const mouseEnter = () => ({
  type: Mouse_Enter
})

const mouseLeave = () => ({
  type: Mouse_Leave
})

const changePage = (page) => ({
  type: Change_Page,
  page
})

const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then(res => {
      dispatch(changeList(res.data.data))
    }).catch(() => {
      console.log('error')
    })
  }
}


export const actionCreators = {
  searchBlur,
  searchFocus,
  getList,
  mouseEnter,
  mouseLeave,
  changePage
}
