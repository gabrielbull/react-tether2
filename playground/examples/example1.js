import React, { Component, PropTypes } from 'react';
import Target from './example1/target';
import Source from './example1/source';

class Example1 extends Component {
  getTarget = () => this.refs.target;

  render() {
    return (
      <div style={{ background: 'red', position: 'relative', padding: '20px' }}>
        <Target ref="target"/>
        <Source target={this.getTarget}/>
        <div style={{ background: 'purple', height: '200px' }}/>
      </div>
    );
  }
}

export default Example1;
