import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import tether from '../../../src/index';

const style = {
  background: 'blue',
  padding: '10px',
  minHeight: '20px',
  overflow: 'scroll',
  boxSizing: 'border-box'
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
          attachment: 'none'
        }
      ]
    }
  },
  function (state) {
    return { outOfBoundsBottom: state.outOfBoundsBottom ? true : false };
  }
)
class Source extends Component {
  constructor() {
    super();
    this.state = { outOfBoundsBottom : false, height: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outOfBoundsBottom) {
      const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      if (rect.top + rect.height > document.documentElement.clientHeight) {
        const height = document.documentElement.clientHeight - rect.top;
        this.setState({ height });
      }
    } else {
      this.setState({ height: null });
    }
  }


  render() {
    const componentStyle = { ...style };

    if (this.state.height) {
      componentStyle.height = this.state.height + 'px';
    }

    return (
      <div style={componentStyle}>
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
