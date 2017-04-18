import React, { Component } from 'react';
import Target from './example2/target';

const style = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'center'
};

class Example2 extends Component {
  render() {
    return (
      <div style={style}>
        <Target/>
      </div>
    );
  }
}

export default Example2;
