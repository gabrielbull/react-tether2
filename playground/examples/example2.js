import React, { Component, PropTypes } from 'react';
import Target from './example2/target';

class Example2 extends Component {
  render() {
    return (
      <div style={{ background: 'red', position: 'fixed', top: '0px', left: '0px', width: '100%', height: '50px' }}>
        <Target/>
      </div>
    );
  }
}

export default Example2;
