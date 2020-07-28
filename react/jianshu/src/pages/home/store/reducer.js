import {fromJS} from 'immutable'
import {Add_Article_List, Change_Home_Data, Toggle_Scroll_top} from "./constants";

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
  showScroll: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case Change_Home_Data:
      return state.merge({
        'topList': fromJS(action.topicList),
        'articleList': fromJS(action.articleList),
        'recommendList': fromJS(action.recommendList)
      })
    case Add_Article_List:
      return state.merge({
        'articleList': state.get('articleList').concat(fromJS(action.articleList)),
        'articlePage': action.page
      })
    case Toggle_Scroll_top:
      return state.set('showScroll', action.show)
    default:
      return state
  }
}
