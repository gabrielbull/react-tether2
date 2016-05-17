'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (optionsFunction) {
  var wrapperProps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (WrappedComponent) {
    return function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this));

        _this.state = { transform: null };
        return _this;
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var options = optionsFunction(this.props);
          if (options) {
            var element = _reactDom2.default.findDOMNode(this);
            var elementRect = element.getBoundingClientRect();

            this.domNode = document.createElement('div');
            this.domNode.style.position = 'absolute';
            this.domNode.style.width = elementRect.width + 'px';
            this.domNode.style.height = elementRect.height + 'px';
            document.body.appendChild(this.domNode);

            options.element = this.domNode;
            if (!(options.target instanceof HTMLElement) && _typeof(options.target) === 'object') {
              options.target = _reactDom2.default.findDOMNode(options.target);
            }
            this.initTether(options);
          }
        }
      }, {
        key: 'initTether',
        value: function initTether(options) {
          this.tether = new _tether2.default(options);
          var nextPosition = this.tether.position;
          var self = this;
          this.tether.position = function () {
            var retVal = nextPosition.call(this);
            self.move(this.element.style.transform);
            return retVal;
          };
          this.tether.position();
        }
      }, {
        key: 'move',
        value: function move(transform) {
          var element = _reactDom2.default.findDOMNode(this);
          var offset = element.offsetParent.getBoundingClientRect();
          var matches = transform.match(/translateX\((\d*)p?x?\) translateY\((\d*)p?x?\) translateZ\((\d*)p?x?\)/);
          var translateX = Math.round(matches[1] - offset.left);
          var translateY = Math.round(matches[2] - offset.top);
          var translateZ = matches[3];

          this.setState({
            transform: 'translateX(' + translateX + 'px) translateY(' + translateY + 'px) translateZ(' + translateZ + 'px)'
          });

          this.tether.element.style.display = 'none';
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.domNode.parentNode.removeChild(this.domNode);
          this.tether.destroy();
        }
      }, {
        key: 'render',
        value: function render() {
          var style = wrapperProps.style;

          var props = _objectWithoutProperties(wrapperProps, ['style']);

          var componentStyle = _extends({}, style, {
            position: 'absolute',
            top: 0,
            left: 0
          });

          if (this.state.transform) {
            componentStyle.transform = this.state.transform;
          }

          return _react2.default.createElement(
            'div',
            _extends({ style: componentStyle }, props),
            _react2.default.createElement(WrappedComponent, this.props)
          );
        }
      }]);

      return _class;
    }(_react.Component);
  };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tether = require('tether');

var _tether2 = _interopRequireDefault(_tether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }