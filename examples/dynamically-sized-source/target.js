import React, { Component, PropTypes } from 'react';

const style = {
  background: '#fb8c00',
  padding: '20px',
  width: '100px',
  height: '100px',
  textAlign: 'center',
  lineHeight: '100px',
  color: 'white',
  fontFamily: 'arial'
};

class Target extends Component {
  render() {
    return (
      <div style={style}>
        Tether Target
      </div>
    );
  }
}

export default Target;
