import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Write extends PureComponent {
  render() {
    const {loginStatus} = this.props
    if(!loginStatus){
      return <Redirect to='/login'/>
    }else{
      return (
        <div>写文章</div>
      )
    }
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login']),
})

export default connect(mapState, null)(Write);
