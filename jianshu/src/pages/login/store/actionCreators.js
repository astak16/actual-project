import axios from "axios";
import {Change_Login, Change_Logout} from "./constants";

const changeLogin = () => ({
  type: Change_Login,
  value: true
})

export const logout = () => ({
  type: Change_Logout,
  value: false
})

export const login = (account, password) => {
  return (dispatch) => {
    axios.get(`/api/login.json?account=${account}&password=${password}`).then(res => {
      const result = res.data.data
      if (result) {
        dispatch(changeLogin())
      }
    })

  }
}
