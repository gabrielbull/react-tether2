# React Tether 2

[![Join the chat at https://gitter.im/gabrielbull/react-tether2](https://badges.gitter.im/gabrielbull/react-tether2.svg)](https://gitter.im/gabrielbull/react-tether2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/gabrielbull/react-tether2.svg?branch=master)](https://travis-ci.org/gabrielbull/react-tether2)
[![Code Climate](https://codeclimate.com/github/gabrielbull/react-tether2/badges/gpa.svg)](https://codeclimate.com/github/gabrielbull/react-tether2)
[![Dependency Status](https://david-dm.org/gabrielbull/react-tether2.svg)](https://david-dm.org/gabrielbull/react-tether2)
[![devDependency Status](https://david-dm.org/gabrielbull/react-tether2/dev-status.svg)](https://david-dm.org/gabrielbull/react-tether2#info=devDependencies)
[![npm downloads](http://img.shields.io/npm/dt/react-tether2.svg)](https://www.npmjs.org/package/react-tether2)
[![npm version](https://img.shields.io/npm/v/react-tether2.svg)](https://www.npmjs.org/package/react-tether2)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gabrielbull/react-tether2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Simple react wrapper around [Tether from Hub Spot](http://github.hubspot.com/tether/).

## Installation

> npm install react-tether2 --save

## Usage

```jsx
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import tether from 'react-tether2';

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

class App extends Component {
  getTarget = () => this.refs.target;

  render() {
    return (
      <div>
        <div ref="target">Tether Target</div>
        <Source target={this.getTarget}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.body);
```
