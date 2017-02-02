import React, { Component, PropTypes } from 'react';
import tether from 'react-tether2';

const style = {
  background: '#0861A7',
  padding: '10px',
  color: 'white',
  fontFamily: 'arial',
  width: 'calc(100vw - 40px)',
  boxSizing: 'border-box'
};

@tether(
  function (ownProps) {
    return {
      target: ownProps.target(),
      attachment: 'bottom center',
      targetAttachment: 'top center',
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together'
        }
      ]
    }
  }
)
class Source extends Component {
  render() {
    return (
      <div style={style}>
        Tether Source
      </div>
    );
  }
}

export default Source;
