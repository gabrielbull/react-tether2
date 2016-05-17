import React, { Component, PropTypes } from 'react';
import tether from '../../../src/index';

const style = {
  background: 'blue',
  padding: '10px'
};

@tether(
  function (ownProps) {
    return {
      target: ownProps.target(),
      attachment: 'bottom left',
      targetAttachment: 'top left',
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
