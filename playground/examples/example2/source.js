import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import tether from '../../../src/index';

const style = {
  background: 'blue',
  padding: '10px',
  width: '300px'
};

@tether(
  function (ownProps) {
    return {
      target: ownProps.target,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [
        {
          to: 'window',
          attachment: 'element'
        }
      ]
    }
  },
  function (state) {
    return { reversed: state.elementAttachedRight ? true : false };
  }
)
class Source extends Component {
  constructor() {
    super();
    this.state = { offset: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reversed && !prevProps.reversed) {
      const width = ReactDOM.findDOMNode(this.props.target).getBoundingClientRect().width;
      this.setState({
        offset: width
      });
    } else if (!this.props.reversed && prevProps.reversed) {
      this.setState({
        offset: 0
      });
    }
  }

  render() {
    let componentStyle = { ...style };
    if (this.state.offset) {
      componentStyle.transform = 'translateX(' + this.state.offset + 'px)';
    }

    return (
      <div style={componentStyle}>
        Tether Source
      </div>
    );
  }
}

export default Source;
