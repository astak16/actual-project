import React, {PureComponent} from "react";
import {RecommendItem, RecommendWrapper} from "../style";
import {connect} from "react-redux";

class Recommend extends PureComponent {
  render() {
    return (
      <RecommendWrapper>
        {
          this.props.recommendList.map(item => (
            <RecommendItem key={item.get('id')} imgURL={item.get('uri')}>1</RecommendItem>
          ))
        }
      </RecommendWrapper>
    )
  }
}

const mapState = (state) => ({
  recommendList: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recommend);
