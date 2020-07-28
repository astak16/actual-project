import axios from "axios";
import {Change_Detail} from "./constants";

const changeDetail = (title, content) => ({
  type: Change_Detail,
  title,
  content
})

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get(`/api/detail.json?id=${id}`).then(res => {
      const result = res.data.data
      dispatch(changeDetail(result.title, result.content))
    })
  }
}
