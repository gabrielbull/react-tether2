import React, { Component, PropTypes } from 'react';
import Target from './example4/target';
import Source from './example4/source';

class Example4 extends Component {
  getTarget = () => this.refs.target;

  render() {
    return (
      <div style={{ background: 'red', position: 'relative', padding: '20px' }}>
        <div style={{ height: '600px', background: 'purple' }}>
        </div>
        <Target ref="target"/>
        <Source target={this.getTarget}/>
      </div>
    );
  }
}

export default Example4;
