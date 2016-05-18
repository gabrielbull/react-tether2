import React, { Component, PropTypes } from 'react';
import Dropdown from '../../../src/dropdown';

const style = {
  background: 'blue',
  padding: '10px',
  width: '300px'
};

class Source extends Component {
  render() {
    return (
      <Dropdown target={this.props.target}>
        <div style={style}>
          Tether Source
        </div>
      </Dropdown>
    );
  }
}

export default Source;
