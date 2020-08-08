import React, {PureComponent} from "react";
import {TopicItem, TopicWrapper} from "../style";
import {connect} from "react-redux";

class Topic extends PureComponent {
  render() {
    return (
      <TopicWrapper>
        {
          this.props.list.map((item) => (
            <TopicItem key={item.get('id')}>
              <img className='topic-pic'
                   src={item.get('uri')}
                   alt=""/>
              {item.get('title')}
            </TopicItem>
          ))
        }
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.get('home').get('topicList')
})

export default connect(mapState, null)(Topic);
