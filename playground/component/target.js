import React, { Component, PropTypes } from 'react';

const style = {
  background: 'green',
  padding: '20px',
  height: '200px'
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
