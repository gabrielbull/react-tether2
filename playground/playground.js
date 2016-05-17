import React, { Component, PropTypes } from 'react';
import Target from './component/target';
import Source from './component/source';

class Playground extends Component {
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

export default Playground;
