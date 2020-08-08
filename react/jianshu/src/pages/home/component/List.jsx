import React, {PureComponent} from "react";
import {ListInfo, ListItem, LoadMore} from "../style";
import {connect} from "react-redux";
import {actionCreators} from "../store";
import {Link} from "react-router-dom";

class List extends PureComponent {
  render() {
    return (
      <div>
        {
          this.props.articleList.map((item, index) => (
            <Link key={index} to={`/detail/${item.get('id')}`}>
              <ListItem>
                <img className='pic'
                     src={item.get('uri')} alt=""/>
                <ListInfo>
                  <h3 className='title'>{item.get('title')}</h3>
                  <p className='desc'>{item.get('desc')}</p>
                </ListInfo>
              </ListItem>
            </Link>
          ))
        }
        <LoadMore onClick={()=>this.props.getMoreList(this.props.page)}>更多文字</LoadMore>
      </div>
    )
  }
}

const mapState = (state) => ({
  articleList: state.get('home').get('articleList'),
  page: state.getIn(['home', 'articlePage'])
})

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    const action = actionCreators.getMoreList(page)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(List);
