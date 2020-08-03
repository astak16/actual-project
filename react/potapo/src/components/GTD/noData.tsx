import React, { Component } from 'react'
import { DropboxOutlined } from '@ant-design/icons';

import './noData.styl'

export class noData extends Component {
  render() {
    return (
      <div className="no-data">
        <DropboxOutlined
          style={{
            fontSize: '15em',
            color: '#eee'
          }} />
        <p className="no-record">没有记录</p>
      </div>
    );
  }
}

export default noData
