import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tether from 'tether';
import shallowEqual from './utils/shallowEqual';

export Overflow from './overflow';
export Dropdown from './dropdown';

export default function (...args) {
  let optionsFunction, mapStateToProps, wrapperProps;
  if (args[0] && typeof args[0] === 'object') {
    wrapperProps = args[0];
  } else if (args[1] && typeof args[1] === 'object') {
    optionsFunction = args[0];
    wrapperProps = args[1];
  } else if (args[2] && typeof args[2] === 'object') {
    optionsFunction = args[0];
    mapStateToProps = args[1];
    wrapperProps = args[2];
  } else {
    if (args[0]) optionsFunction = args[0];
    if (args[1]) mapStateToProps = args[1];
    wrapperProps = {};
  }

  return function (WrappedComponent) {
    return class extends Component {
      options;
      mappedProps;
      unmappedProps;
      prevUnmappedProps;

      constructor() {
        super();
        this.state = { transform: null, props: null };
      }

      componentDidMount() {
        if (typeof optionsFunction === 'function') {
          let options = optionsFunction({ ...this.props, ...this.refs.wrappedComponent.props });
          if (options) {
            const element = ReactDOM.findDOMNode(this);
            const elementRect = element.getBoundingClientRect();

            this.domNode = document.createElement('div');
            this.domNode.style.position = 'absolute';
            this.domNode.style.width = Math.floor(elementRect.width) + 'px';
            this.domNode.style.height = Math.floor(elementRect.height) + 'px';
            document.body.appendChild(this.domNode);

            options.element = this.domNode;
            if (!(options.target instanceof HTMLElement) && typeof options.target === 'object') {
              options.target = ReactDOM.findDOMNode(options.target);
            }
            this.initTether(options);
          }
        }
      }

      initTether(options) {
        this.options = options;
        this.tether = new Tether(options);
        const self = this;

        const nextPosition = this.tether.position;
        this.tether.position = function () {
          const retVal = nextPosition.call(this);
          self.move(this.element);
          return retVal;
        };

        this.tether.position();
      }

      move(tetherElement) {
        const element = ReactDOM.findDOMNode(this);
        const elementOffset = element.offsetParent.getBoundingClientRect();
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        this.tether.element.style.display = 'block';
        const tetherOffset = tetherElement.getBoundingClientRect();
        this.tether.element.style.display = 'none';

        this.unmappedProps = this.getProps(tetherElement.className);
        if (typeof mapStateToProps === 'function' && this.unmappedProps && (!this.prevUnmappedProps || !shallowEqual(this.unmappedProps, this.prevUnmappedProps))) {
          this.prevUnmappedProps = { ...this.unmappedProps };
          this.mappedProps = mapStateToProps(this.unmappedProps, { ...this.props, ...this.refs.wrappedComponent.props }, this.tether);
        }

        let translateX, translateY, translateZ;
        translateX = Math.round(tetherOffset.left - Math.round(elementOffset.left));
        translateY = Math.round(tetherOffset.top - Math.round(elementOffset.top + top));
        translateZ = 0;

        const transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;

        this.setState({
          props: this.mappedProps,
          transform
        });
      }

      getProps(className) {
        const exempt = ['element', 'enabled', 'target'];
        let classes = className.split(' ');
        let props = {};
        for (let i = 0, len = classes.length; i < len; ++i) {
          let name = classes[i].replace('tether-', '');
          name = name.replace(/(\-.)/g, function (match, content) {
            return content.toUpperCase().replace('-', '');
          });
          if (exempt.indexOf(name) === -1) props[name] = true;
        }
        return props;
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

        return (
          <div style={componentStyle} {...props}>
            <WrappedComponent ref="wrappedComponent" { ...{ ...this.props, ...this.state.props } }/>
          </div>
        );
      }
    };
  }
}
