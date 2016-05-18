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
class Dropdown extends Component {
  static propTypes = {
    target: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string
  };

  static defaultProps = {
    attachment: 'top left',
    targetAttachment: 'bottom left'
  };

  constructor() {
    super();
    this.state = { offset: 0 };
  }

  componentDidUpdate(prevProps) {
    if (this.props.reversed && !prevProps.reversed) {
      let target = typeof this.props.target === 'function' ? this.props.target() : this.props.target;
      if (!(target instanceof HTMLElement)) target = ReactDOM.findDOMNode(this.props.target)
      const width = target.getBoundingClientRect().width;
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
    const { style, children, ...props } = this.props;
    const componentStyle = {
      ...style
    };

    if (this.state.offset) {
      componentStyle.transform = 'translateX(' + this.state.offset + 'px)';
    }

    return (
      <div style={componentStyle} {...props}>
        {children}
      </div>
    );
  }
}

export default Dropdown;
