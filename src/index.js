import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tether from 'tether';

export default function (optionsFunction, wrapperProps = {}) {
  return function (WrappedComponent) {
    return class extends Component {
      constructor() {
        super();
        this.state = { transform: null };
      }

      componentDidMount() {
        let options = optionsFunction(this.props);
        if (options) {
          const element = ReactDOM.findDOMNode(this);
          const elementRect = element.getBoundingClientRect();

          this.domNode = document.createElement('div');
          this.domNode.style.position = 'absolute';
          this.domNode.style.width = elementRect.width + 'px';
          this.domNode.style.height = elementRect.height + 'px';
          document.body.appendChild(this.domNode);

          options.element = this.domNode;
          if (!(options.target instanceof HTMLElement) && typeof options.target === 'object') {
            options.target = ReactDOM.findDOMNode(options.target);
          }
          this.initTether(options);
        }
      }

      initTether(options) {
        this.tether = new Tether(options);
        const nextPosition = this.tether.position;
        const self = this;
        this.tether.position = function () {
          const retVal = nextPosition.call(this);
          self.move(this.element.style.transform);
          return retVal;
        };
        this.tether.position();
      }

      move(transform) {
        const element = ReactDOM.findDOMNode(this);
        const offset = element.offsetParent.getBoundingClientRect();
        const matches = transform.match(/translateX\((\d*)p?x?\) translateY\((\d*)p?x?\) translateZ\((\d*)p?x?\)/);
        let translateX = Math.round(matches[1] - offset.left);
        let translateY = Math.round(matches[2] - offset.top);
        let translateZ = matches[3];

        this.setState({
          transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`
        });

        this.tether.element.style.display = 'none';
      }

      componentWillUnmount() {
        this.domNode.parentNode.removeChild(this.domNode);
        this.tether.destroy();
      }

      render() {
        const { style, ...props } = wrapperProps;

        const componentStyle = {
          ...style,
          position: 'absolute',
          top: 0,
          left: 0
        };

        if (this.state.transform) {
          componentStyle.transform = this.state.transform;
        }

        return <div style={componentStyle} {...props}><WrappedComponent {...this.props}/></div>;
      }
    };
  }
}
