import React, { Component, PropTypes } from 'react';
import tether from 'react-tether2';

const style = {
  background: 'blue',
  padding: '10px'
};

@tether(
  function (ownProps) {
    return {
      target: ownProps.target(),
      attachment: 'top left',
      targetAttachment: 'bottom left',
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
        Tether Source<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
        Line<br/>
      </div>
    );
  }
}

export default Source;
