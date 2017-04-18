import React, { Component } from 'react';
import Target from './target';
import Source from './source';

class DynamicallySizedSource extends Component {
  getTarget = () => this.refs.target;

  render() {
    return (
      <div>
        <Target ref="target"/>
        <Source target={this.getTarget}/>
      </div>
    );
  }
}

export default DynamicallySizedSource;
