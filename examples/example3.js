import React, { Component, PropTypes } from 'react';
import Target from './example3/target';
import Source from './example3/source';

class Example3 extends Component {
  getTarget = () => this.refs.target;

  render() {
    return (
      <div style={{ background: 'red', position: 'relative', padding: '20px' }}>
        <Target ref="target"/>
        <Source target={this.getTarget}/>
      </div>
    );
  }
}

export default Example3;
