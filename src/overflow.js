import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import tether from './index';

@tether(
  function (ownProps) {
    return {
      target: typeof ownProps.target === 'function' ? ownProps.target() : ownProps.target,
      attachment: ownProps.attachment,
      targetAttachment: ownProps.targetAttachment,
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
class Overflow extends Component {
  static propTypes = {
    target: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string
  };

  static defaultProps = {
    attachment: 'top left',
    targetAttachment: 'bottom left'
  };

  originalHeight;

  constructor() {
    super();
    this.state = { outOfBoundsBottom : false, height: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.outOfBoundsBottom) {
      const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      if (!this.originalHeight) this.originalHeight = rect.height;
      if (rect.top + this.originalHeight > document.documentElement.clientHeight) {
        const height = document.documentElement.clientHeight - rect.top;
        this.setState({ height });
      }
    } else {
      this.setState({ height: null });
    }
  }

  render() {
    const { style, children, ...props } = this.props;
    const componentStyle = {
      ...style,
      overflow: 'scroll'
    };

    if (this.state.height) {
      componentStyle.height = this.state.height + 'px';
    }

    return (
      <div style={componentStyle} {...props}>
        {children}
      </div>
    );
  }
}

export default Overflow;
