import axios from "axios";
import {Add_Article_List, Change_Home_Data, Toggle_Scroll_top} from "./constants";

const changeHomeData = (result) => {
  const {topicList, articleList, recommendList} = result.data.data
  return {
    type: Change_Home_Data,
    topicList,
    articleList,
    recommendList
  }
}

const addHomeList = (result, nexPage) => ({
  type: Add_Article_List,
  articleList: result.data.data,
  page: nexPage
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then(res => {
      const action = changeHomeData(res)
      dispatch(action)
    })
  }
}

export const getMoreList = (page) => {
  return (dispatch) => {
    axios.get(`/api/homeList.json?page=${page}`).then(res => {
      const action = addHomeList(res, page + 1)
      dispatch(action)
    })
  }
}

export const toggleTopShow = (show) => ({
  type: Toggle_Scroll_top,
  show,
})
